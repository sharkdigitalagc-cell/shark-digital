import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Cases } from "@/components/sections/cases";
import { Contact } from "@/components/sections/contact";
import { Differentials } from "@/components/sections/differentials";
import { FinalCta } from "@/components/sections/final-cta";
import { Framework } from "@/components/sections/framework";
import { Hero } from "@/components/sections/hero";
import { Indicators } from "@/components/sections/indicators";
import { Method } from "@/components/sections/method";
import { Onboarding } from "@/components/sections/onboarding";
import { Operation } from "@/components/sections/operation";
import { Problem } from "@/components/sections/problem";
import { Solutions } from "@/components/sections/solutions";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <Problem />
        <Operation />
        <Method />
        <Framework />
        <Solutions />
        <Differentials />
        <Indicators />
        <Cases />
        <Onboarding />
        <FinalCta />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
