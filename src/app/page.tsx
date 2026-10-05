import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ClientStrip } from "@/components/sections/client-strip";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Indicators } from "@/components/sections/indicators";
import { Method } from "@/components/sections/method";
import { Onboarding } from "@/components/sections/onboarding";
import { Problem } from "@/components/sections/problem";
import { Projects } from "@/components/sections/projects";
import { Solutions } from "@/components/sections/solutions";
import { HOME_DESCRIPTION, HOME_TITLE, jsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationJsonLd(),
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#site"),
      name: SITE_NAME,
      url: absoluteUrl("/"),
      inLanguage: "pt-BR",
      publisher: { "@id": absoluteUrl("/#organizacao") },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <ClientStrip />
        <Problem />
        <Solutions />
        <Projects />
        <Method />
        <Indicators />
        <Onboarding />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
