import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";

export function Contact() {
  return (
    <Section id="contato" labelledBy="contato-title" tone="raised">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeader
            id="contato-title"
            eyebrow="Contato"
            lines={["Comece pelo", "diagnóstico."]}
            text="Conte um pouco sobre sua empresa e o principal desafio de marketing hoje."
          />
          <Reveal delay={0.08}>
            <p className="mt-10 border-l border-accent/60 pl-4 text-[0.95rem] leading-relaxed text-muted">
              Este formulário é o início do diagnóstico: entender negócio,
              momento, operação e desafios.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
