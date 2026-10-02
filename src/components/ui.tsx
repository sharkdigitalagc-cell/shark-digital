import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
  tone?: "base" | "raised";
};

export function Section({
  id,
  children,
  className,
  labelledBy,
  tone = "base",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative border-t border-line py-24 md:py-32",
        tone === "raised" ? "bg-bg-2" : "bg-bg",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

type SectionHeaderProps = {
  id: string;
  eyebrow?: string;
  lines: React.ReactNode[];
  text?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Eyebrow + headline (one line per entry) + supporting text. */
export function SectionHeader({
  id,
  eyebrow,
  lines,
  text,
  align = "left",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn(
          "text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-fg sm:text-5xl md:text-[3.4rem]",
          eyebrow && "mt-5",
        )}
      >
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>
      {text ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg",
            centered && "mx-auto",
          )}
        >
          {text}
        </p>
      ) : null}
    </Reveal>
  );
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  arrow = false,
  onClick,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-colors duration-200",
        variant === "primary"
          ? "bg-accent text-bg hover:bg-[#62f48b]"
          : "border border-line-strong text-fg hover:border-white/30 hover:bg-white/[0.04]",
        className,
      )}
    >
      {children}
      {arrow ? (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </a>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-card p-6 md:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}
