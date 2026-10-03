"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { Check, Megaphone, MessageCircle } from "lucide-react";
import { cn } from "@/components/ui";

const EVENTS = [
  {
    stage: "Atração",
    icon: Megaphone,
    title: "Anúncio no ar",
    text: "Instagram e Google, para quem procura o que você vende.",
  },
  {
    stage: "Engajamento",
    icon: MessageCircle,
    title: "Nova mensagem",
    text: "“Olá! Vi o anúncio e quero saber mais.”",
  },
  {
    stage: "Venda",
    icon: Check,
    title: "Cliente fechado",
    text: "Sua equipe atende e conclui a venda.",
  },
] as const;

const STEP_MS = 1900;
const HOLD_MS = 2600;
const TRAVEL_S = 0.7;

/**
 * "Quem somos" scene: the Shark connected to the client's company. A signal
 * leaves the Shark emblem and, on arrival, a new event pops up on the
 * company's phone: an ad goes live, a message comes in, a sale is closed.
 * The loop pauses while the visitor hovers the phone. Under
 * prefers-reduced-motion the three events are shown at once.
 */
export function SharkConnection({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [shown, setShown] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (reduceMotion || !inView || paused) return;
    const full = shown >= EVENTS.length;
    const id = window.setTimeout(
      () => {
        if (full) {
          setShown(0);
        } else {
          setSending(true);
        }
      },
      full ? HOLD_MS : shown === 0 ? 700 : STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [reduceMotion, inView, paused, shown]);

  const visible = reduceMotion ? EVENTS.length : shown;

  return (
    <figure
      ref={ref}
      className={cn(
        "grain relative overflow-hidden rounded-3xl border border-line bg-[radial-gradient(110%_90%_at_75%_40%,#0b1a10_0%,#0a0a0a_50%,#050505_100%)] p-5 sm:p-7",
        className,
      )}
    >
      <figcaption className="sr-only">
        A Shark conectada à sua empresa: anúncio no ar, nova mensagem e cliente
        fechado.
      </figcaption>

      <div aria-hidden className="relative flex items-center gap-0">
        {/* Shark emblem */}
        <div className="relative z-10 flex shrink-0 flex-col items-center gap-2">
          <div className="relative grid size-16 place-items-center rounded-full border border-line-strong bg-[#0d0d0d] shadow-[0_0_0_6px_rgba(5,5,5,0.9)] sm:size-20">
            {!reduceMotion && (
              <span className="absolute inset-0 animate-ping rounded-full border border-accent/30 [animation-duration:2.4s]" />
            )}
            <Image
              src="/logo-shark-digital.png"
              alt=""
              width={640}
              height={534}
              className="w-9 sm:w-11"
            />
          </div>
          <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-fg sm:text-xs">
            SHARK
          </span>
        </div>

        {/* Beam */}
        <div className="relative -mt-6 h-px min-w-6 flex-1 bg-gradient-to-r from-accent/70 via-accent/40 to-accent/70">
          <span className="absolute inset-x-0 -top-1 h-2 bg-accent/20 blur-sm" />
          {sending && (
            <m.span
              className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[#eafff0] shadow-[0_0_12px_3px_rgba(61,240,110,0.7)]"
              initial={{ left: "0%", opacity: 0 }}
              animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: TRAVEL_S, ease: "easeInOut" }}
              onAnimationComplete={() => {
                setSending(false);
                setShown((s) => Math.min(EVENTS.length, s + 1));
              }}
            />
          )}
        </div>

        {/* The client's phone */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative z-10 w-[62%] shrink-0 sm:w-[58%]"
        >
          <div className="rounded-[1.6rem] border border-line-strong bg-[#0b0b0b] p-2 shadow-[0_20px_60px_-20px_rgba(61,240,110,0.25)]">
            <div className="rounded-[1.2rem] border border-line bg-[#070707] px-3 pb-3 pt-2.5">
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/10" />
              <p className="mb-2.5 text-center text-[0.6rem] font-semibold tracking-[0.18em] text-muted sm:text-[0.65rem]">
                SUA EMPRESA
              </p>
              <ul className="flex min-h-[13.5rem] flex-col gap-2 sm:min-h-[15rem]">
                <AnimatePresence initial={false}>
                  {EVENTS.slice(0, visible).map(({ stage, icon: Icon, title, text }, i) => (
                    <m.li
                      key={stage}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.25 } }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "flex gap-2.5 rounded-xl border p-2.5 sm:p-3",
                        i === EVENTS.length - 1
                          ? "border-accent/40 bg-accent/[0.07]"
                          : "border-line bg-white/[0.03]",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-lg",
                          i === EVENTS.length - 1
                            ? "bg-accent text-black"
                            : "bg-white/[0.06] text-accent",
                        )}
                      >
                        <Icon className="size-3.5" strokeWidth={2} />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="text-[0.75rem] font-semibold text-fg sm:text-sm">
                            {title}
                          </span>
                          <span className="text-[0.55rem] uppercase tracking-[0.14em] text-accent sm:text-[0.6rem]">
                            {stage}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[0.68rem] leading-snug text-muted sm:text-xs">
                          {text}
                        </span>
                      </span>
                    </m.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
