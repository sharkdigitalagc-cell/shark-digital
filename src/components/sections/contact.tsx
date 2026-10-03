import { MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/ui";
import { WHATSAPP_NUMBER, formatWhatsapp } from "@/lib/whatsapp";

export function Contact() {
  return (
    <Section id="contato" labelledBy="contato-title" tone="raised">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeader
            id="contato-title"
            eyebrow="Contato"
            lines={["Conte sobre", "a sua empresa."]}
            text="Nome, empresa e como prefere ser contatado. O resto conversamos."
          />
          <Reveal delay={0.08}>
            <p className="mt-10 border-l border-accent/60 pl-4 text-[0.95rem] leading-relaxed text-muted">
              Retornamos pelo canal que você escolher.
            </p>
            {WHATSAPP_NUMBER ? (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-fg transition-colors duration-200 hover:text-accent"
              >
                <MessageCircle aria-hidden className="size-4 text-accent" />
                Prefere falar agora? WhatsApp {formatWhatsapp(WHATSAPP_NUMBER)}
              </a>
            ) : null}
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
