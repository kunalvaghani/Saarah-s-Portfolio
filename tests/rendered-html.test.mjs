import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://saarah-adnan.example/", {
      headers: { accept: "text/html", host: "saarah-adnan.example" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the recruiter portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Saarah Adnan \| Junior Accountant in Toronto<\/title>/i);
  assert.match(html, /Saarah Adnan/);
  assert.match(html, /Bringing accuracy, clarity, and thoughtful analysis/);
  assert.match(html, /Kinectrics Inc\. \/ BWXT/);
  assert.match(html, /IGNITE Student Union/);
  assert.match(html, /Eataly Sherway Gardens/);
  assert.match(html, /aria-label="75\+"/);
  assert.match(html, /aria-label="8"/);
  assert.match(html, /aria-label="10%"/);
  assert.match(html, /aria-label="3\u00d7"/);
  assert.match(html, /mailto:saarahadnan35146@gmail\.com/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/saarah-adnan/);
  assert.match(html, /\/documents\/Saarah-Adnan-Resume\.pdf/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Skip to main content/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /437[^<]{0,20}326[^<]{0,20}8717/);
});

test("includes recruiter assets and accessibility behavior", async () => {
  const root = new URL("../", import.meta.url);
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);

  await Promise.all([
    access(new URL("public/images/saarah-portrait.png", root)),
    access(new URL("public/images/saarah-graduation.png", root)),
    access(new URL("public/documents/Saarah-Adnan-Resume.pdf", root)),
    access(new URL("public/og.png", root)),
  ]);

  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noreferrer"/);
  assert.match(page, /<main id="main-content">/);
  assert.match(page, /<nav className="site-nav" aria-label="Primary navigation">/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(max-width: 540px\)/);
  assert.match(layout, /await headers\(\)/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
