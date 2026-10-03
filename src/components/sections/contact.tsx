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
            lines={["Conte sobre", "a sua empresa."]}
            text="Use o formulário para solicitar um diagnóstico de marketing. Conte como os clientes chegam hoje e qual é o principal desafio."
          />
          <Reveal delay={0.08}>
            <p className="mt-10 border-l border-accent/60 pl-4 text-[0.95rem] leading-relaxed text-muted">
              As informações enviadas servem de ponto de partida para a
              primeira conversa sobre oferta, público, campanhas e atendimento.
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
