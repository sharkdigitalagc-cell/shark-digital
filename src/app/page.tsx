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

export default function Home() {
  return (
    <>
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
