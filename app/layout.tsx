import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Saarah Adnan | Junior Accountant in Toronto";
const description =
  "Junior Accountant and Honours BCom Accounting graduate with experience in financial reporting, reconciliations, tax preparation, SAP, Excel, Power BI, and month-end close.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title,
    description,
    applicationName: "Saarah Adnan Portfolio",
    authors: [{ name: "Saarah Adnan" }],
    creator: "Saarah Adnan",
    keywords: [
      "Junior Accountant Toronto",
      "Staff Accountant",
      "Accounting Assistant",
      "Accounts Payable",
      "Financial Analyst",
      "SAP",
      "Financial Reporting",
      "Account Reconciliations",
      "Humber Polytechnic",
    ],
    icons: {
      icon: "/images/saarah-portrait.png",
      apple: "/images/saarah-portrait.png",
    },
    openGraph: {
      type: "profile",
      locale: "en_CA",
      url: metadataBase,
      title,
      description,
      siteName: "Saarah Adnan Portfolio",
      images: [
        {
          url: "/og.png",
          width: 1536,
          height: 1024,
          alt: "Saarah Adnan \u2014 Junior Accountant portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
