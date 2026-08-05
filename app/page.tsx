"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Metric = {
  value: number;
  suffix: string;
  label: string;
  detail: string;
};

type Experience = {
  role: string;
  organization: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

type ImpactStory = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
};

const metrics: Metric[] = [
  {
    value: 75,
    suffix: "+",
    label: "Tax returns prepared",
    detail: "UFile \u00b7 CRA compliant",
  },
  {
    value: 8,
    suffix: "",
    label: "International locations",
    detail: "Consolidated reporting",
  },
  {
    value: 10,
    suffix: "%",
    label: "Inventory reduction",
    detail: "Excess inventory impact",
  },
  {
    value: 3,
    suffix: "\u00d7",
    label: "Dean\u2019s Honour List",
    detail: "Academic excellence",
  },
];

const experiences: Experience[] = [
  {
    role: "Finance Analyst Intern",
    organization: "Kinectrics Inc. / BWXT",
    period: "May 2025 \u2014 Aug 2025",
    location: "Toronto, Ontario",
    summary:
      "Supported finance leaders across Transmission & Distribution Technologies, Isotopes, and Nuclear business units, including two months of high-priority coordination for the CFO.",
    highlights: [
      "Prepared board reports, executive presentations, treasury materials, financial schedules, and supporting documentation for CFO and board-level review.",
      "Reconciled invoice and purchase-order discrepancies, corrected historical Excel records, and reclassified misposted entries.",
      "Updated forecasting models, budget files, secured-sales reports, account reconciliations, and general-ledger schedules for month-end close.",
      "Managed CAPEX trackers, purchase requisitions, purchase orders, invoices, and SAP transactions with complete documentation.",
    ],
    tags: ["SAP", "Financial reporting", "Reconciliations", "Month-end close"],
  },
  {
    role: "Tax Clinic Support Staff",
    organization: "IGNITE Student Union \u2014 Humber Polytechnic",
    period: "Feb 2026 \u2014 Apr 2026",
    location: "Toronto, Ontario",
    summary:
      "Prepared personal income tax returns for students and families during a high-volume filing season while protecting accuracy, confidentiality, and client experience.",
    highlights: [
      "Prepared and filed 75+ returns using UFile and verified T4, T4A, T5, and supporting documents against CRA requirements.",
      "Served more than five clients per day and collaborated with a seven-member tax clinic team.",
      "Helped streamline client intake and document review to support shorter waits and more efficient preparation.",
    ],
    tags: ["UFile", "Personal tax", "CRA compliance", "Client service"],
  },
  {
    role: "Sales Associate",
    organization: "Eataly Sherway Gardens",
    period: "Nov 2023 \u2014 Present",
    location: "Toronto, Ontario",
    summary:
      "Blends customer service with practical inventory reporting and operational decision support across a fast-paced, multi-department environment.",
    highlights: [
      "Monitored inventory records and sales data across three departments and identified discrepancies.",
      "Contributed to a 10% reduction in excess inventory through reporting and replenishment support.",
    ],
    tags: ["Inventory reporting", "POS systems", "Operations", "Customer service"],
  },
];

const impactStories: ImpactStory[] = [
  {
    number: "01",
    eyebrow: "Management reporting",
    title: "One reliable view across eight locations",
    description:
      "Consolidated two years of global sales data into a centralized management-reporting file, improving consistency and accessibility for decision-makers.",
  },
  {
    number: "02",
    eyebrow: "Tax operations",
    title: "Accuracy at filing-season pace",
    description:
      "Balanced five-plus client appointments per day with careful document review, CRA compliance, and professional communication across varied tax situations.",
  },
  {
    number: "03",
    eyebrow: "Accounting capstone",
    title: "A practical view of AI in accounting",
    description:
      "Used a 50-respondent survey and industry literature to assess AI\u2019s implications for reporting, audit efficiency, decision-making, ethics, and governance.",
  },
];

const skillGroups = [
  {
    title: "Accounting & close",
    skills: [
      "Financial reporting",
      "Account reconciliations",
      "Month-end close",
      "General ledger support",
      "Invoice processing",
      "Variance analysis",
    ],
  },
  {
    title: "Planning & operations",
    skills: [
      "Budgeting",
      "Forecasting",
      "CAPEX tracking",
      "Purchase orders",
      "Purchase requisitions",
      "Treasury support",
    ],
  },
  {
    title: "Systems & reporting",
    skills: [
      "SAP",
      "Microsoft Excel",
      "PivotTables",
      "VLOOKUP",
      "Power BI",
      "QuickBooks",
    ],
  },
  {
    title: "Tax & standards",
    skills: [
      "UFile",
      "Personal tax",
      "CRA compliance",
      "GAAP",
      "IFRS",
      "ASPE",
    ],
  },
];

const supportingExperience = [
  ["Store Cashier", "Bulk Barn Foods Limited", "Oct 2023 \u2014 Jan 2024"],
  ["Hayya Card Operator", "FIFA World Cup Qatar 2022", "Oct 2022 \u2014 Dec 2022"],
  ["Customer Service Representative", "Nielsen Company", "May 2022 \u2014 Aug 2022"],
];

const linkedinUrl = "https://www.linkedin.com/in/saarah-adnan";
const emailUrl =
  "mailto:saarahadnan35146@gmail.com?subject=Opportunity%20for%20Saarah%20Adnan";

function Counter({ value, suffix }: Pick<Metric, "value" | "suffix">) {
  const [display, setDisplay] = useState(0);
  const node = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = node.current;
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      const frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.55 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={node} className="metric-value" aria-label={`${value}${suffix}`}>
      {display}
      {suffix}
    </span>
  );
}

export default function Home() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (reducedMotion) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7%" },
    );

    reveals.forEach((element) => revealObserver.observe(element));

    let ticking = false;
    const updateScrollEffects = () => {
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(progress),
      );
      document.documentElement.style.setProperty(
        "--hero-drift",
        `${Math.min(window.scrollY * 0.075, 46)}px`,
      );
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    updateScrollEffects();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Saarah Adnan",
    jobTitle: "Junior Accountant",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Humber Polytechnic",
    },
    sameAs: [linkedinUrl],
    knowsAbout: [
      "Financial Reporting",
      "Account Reconciliations",
      "Month-End Close",
      "SAP",
      "Microsoft Excel",
      "Personal Tax Preparation",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Saarah Adnan, home">
          SA
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#profile">Profile</a>
          <a href="#experience">Experience</a>
          <a href="#impact">Impact</a>
          <a href="#skills">Skills</a>
          <a href="#credentials">Credentials</a>
        </nav>
        <a
          className="header-action"
          href="/documents/Saarah-Adnan-Resume.pdf"
          download
        >
          Download r&eacute;sum&eacute;
        </a>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-ledger" aria-hidden="true">
            <span>01</span>
            <span>Accuracy</span>
            <span>Clarity</span>
            <span>Ownership</span>
          </div>

          <div className="hero-copy reveal is-visible">
            <p className="eyebrow">Junior accountant &middot; Toronto, Ontario</p>
            <h1 id="hero-title">
              Bringing accuracy, clarity, and thoughtful analysis to every close.
            </h1>
            <p className="hero-intro">
              I&apos;m Saarah, an Honours BCom Accounting graduate with hands-on
              experience in financial reporting, reconciliations, budgeting,
              tax preparation, SAP transactions, and executive finance support.
            </p>
            <div className="hero-actions" aria-label="Contact and resume actions">
              <a className="button button-primary" href={emailUrl}>
                Start a conversation <span aria-hidden="true">&#8599;</span>
              </a>
              <a
                className="button button-secondary"
                href="/documents/Saarah-Adnan-Resume.pdf"
                download
              >
                View r&eacute;sum&eacute; <span aria-hidden="true">&darr;</span>
              </a>
            </div>
            <div className="availability">
              <span className="availability-dot" aria-hidden="true" />
              Open to junior accounting and finance opportunities across the GTA
            </div>
          </div>

          <div className="hero-visual reveal is-visible">
            <div className="hero-photo-main">
              <Image
                src="/images/saarah-graduation.png"
                alt="Saarah Adnan celebrating her Humber Polytechnic graduation with flowers"
                fill
                priority
                unoptimized
                sizes="(max-width: 760px) 88vw, 42vw"
              />
            </div>
            <div className="hero-photo-inset">
              <Image
                src="/images/saarah-portrait.png"
                alt="Portrait of Saarah Adnan"
                fill
                unoptimized
                sizes="(max-width: 760px) 28vw, 10vw"
              />
            </div>
            <div className="hero-stamp" aria-hidden="true">
              <span>CPA</span>
              <small>Path</small>
            </div>
          </div>
        </section>

        <section className="metrics" aria-label="Career highlights">
          {metrics.map((metric) => (
            <article className="metric reveal" key={metric.label}>
              <Counter value={metric.value} suffix={metric.suffix} />
              <h2>{metric.label}</h2>
              <p>{metric.detail}</p>
            </article>
          ))}
        </section>

        <section className="profile section" id="profile" aria-labelledby="profile-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Profile / 01</p>
            <h2 id="profile-title">A careful eye for numbers. A collaborative way of working.</h2>
          </div>
          <div className="profile-body reveal">
            <p className="lead-copy">
              I translate detailed financial information into organized,
              dependable work that teams can act on.
            </p>
            <div className="profile-columns">
              <p>
                At Kinectrics, I worked across corporate reporting, forecasting,
                CAPEX, procurement, and month-end support&mdash;while handling
                confidential documentation and high-priority coordination for
                the CFO. That experience strengthened both my accounting
                judgement and my ability to keep complex work moving.
              </p>
              <p>
                I&apos;m now seeking a Junior Accountant, Staff Accountant,
                Accounting Assistant, Accounts Payable, or entry-level Financial
                Analyst role where I can contribute from day one and continue
                progressing toward the CPA designation.
              </p>
            </div>
            <div className="profile-signoff">
              <span>Saarah Adnan</span>
              <small>BCom, Accounting &middot; Humber Polytechnic</small>
            </div>
          </div>
        </section>

        <section className="experience section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Experience / 02</p>
            <h2 id="experience-title">Experience built around accuracy and service.</h2>
          </div>

          <div className="timeline">
            {experiences.map((experience, index) => (
              <article className="experience-item reveal" key={experience.role}>
                <div className="experience-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="experience-meta">
                  <p>{experience.period}</p>
                  <span>{experience.location}</span>
                </div>
                <div className="experience-content">
                  <p className="experience-organization">{experience.organization}</p>
                  <h3>{experience.role}</h3>
                  <p className="experience-summary">{experience.summary}</p>
                  <ul>
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="tags" aria-label={`${experience.role} skills`}>
                    {experience.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="supporting-experience reveal">
            <div>
              <p className="eyebrow">Additional experience</p>
              <h3>Operations and client service foundations</h3>
            </div>
            <div className="supporting-list">
              {supportingExperience.map(([role, organization, period]) => (
                <div className="supporting-row" key={role}>
                  <span>{role}</span>
                  <span>{organization}</span>
                  <span>{period}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="impact section" id="impact" aria-labelledby="impact-title">
          <div className="section-heading section-heading-light reveal">
            <p className="eyebrow">Selected impact / 03</p>
            <h2 id="impact-title">Work that made the numbers easier to trust.</h2>
          </div>
          <div className="impact-grid">
            {impactStories.map((story) => (
              <article className="impact-card reveal" key={story.number}>
                <div className="impact-number">{story.number}</div>
                <p className="eyebrow">{story.eyebrow}</p>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="skills section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Capabilities / 04</p>
            <h2 id="skills-title">The technical toolkit behind the work.</h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, groupIndex) => (
              <article className="skill-group reveal" key={group.title}>
                <div className="skill-group-heading">
                  <span aria-hidden="true">0{groupIndex + 1}</span>
                  <h3>{group.title}</h3>
                </div>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="credentials section" id="credentials" aria-labelledby="credentials-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Credentials / 05</p>
            <h2 id="credentials-title">A strong academic base, with momentum to keep learning.</h2>
          </div>

          <div className="credentials-layout">
            <article className="education-card reveal">
              <p className="card-kicker">Education</p>
              <h3>Honours Bachelor of Commerce in Accounting</h3>
              <p className="education-school">Humber Polytechnic &middot; Toronto, Ontario</p>
              <p className="education-period">Jan 2023 &mdash; Apr 2026</p>
              <div className="coursework">
                <span>Advanced Financial Accounting</span>
                <span>Auditing & Assurance</span>
                <span>Corporate Taxation</span>
                <span>Accounting Information Systems</span>
                <span>Advanced Management Accounting</span>
                <span>Ethics & Governance</span>
              </div>
            </article>

            <div className="recognition-stack">
              <article className="recognition-card reveal">
                <p className="card-kicker">Recognition</p>
                <h3>Dean&apos;s Honour List</h3>
                <p>Recognized three times by Humber Polytechnic for academic excellence.</p>
              </article>
              <article className="recognition-card reveal">
                <p className="card-kicker">LinkedIn certifications</p>
                <h3>Excel & generative AI</h3>
                <p>
                  Excel: Advanced Formatting Techniques &middot; Leveraging Generative
                  AI in Finance and Accounting
                </p>
              </article>
              <article className="recognition-card cpa-card reveal">
                <p className="card-kicker">Next chapter</p>
                <h3>Progressing toward CPA</h3>
                <p>Building practical experience while strengthening technical accounting depth.</p>
              </article>
            </div>
          </div>

          <figure className="recommendation reveal">
            <blockquote>
              &ldquo;Saarah is always eager to assist with any task and gives full
              dedication to her work, which leads to great results. She&apos;s a
              valuable contributor to any team she is a part of.&rdquo;
            </blockquote>
            <figcaption>
              <strong>Raj Parmar, CPA, CMA, MBA</strong>
              <span>Business Analyst at Kinectrics</span>
            </figcaption>
          </figure>
        </section>

        <section className="contact section" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy reveal">
            <p className="eyebrow">Let&apos;s connect / 06</p>
            <h2 id="contact-title">Looking for someone who cares about the details?</h2>
            <p>
              I&apos;d be glad to discuss junior accounting, finance, accounts
              payable, or accounting support opportunities in Toronto and the GTA.
            </p>
          </div>
          <div className="contact-actions reveal">
            <a className="contact-link" href={emailUrl}>
              <span>Email</span>
              <strong>saarahadnan35146@gmail.com</strong>
              <span aria-hidden="true">&#8599;</span>
            </a>
            <a
              className="contact-link"
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
              <strong>linkedin.com/in/saarah-adnan</strong>
              <span aria-hidden="true">&#8599;</span>
            </a>
            <a
              className="contact-link"
              href="/documents/Saarah-Adnan-Resume.pdf"
              download
            >
              <span>R&eacute;sum&eacute;</span>
              <strong>Download PDF</strong>
              <span aria-hidden="true">&darr;</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="monogram monogram-footer" href="#top" aria-label="Back to top">
          SA
        </a>
        <p>Junior Accountant &middot; Toronto, Ontario</p>
        <p>&copy; {new Date().getFullYear()} Saarah Adnan</p>
      </footer>
    </>
  );
}
