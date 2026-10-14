"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/components/ui";
import type { GallerySection } from "@/lib/portfolio";

const LAYOUT: Record<GallerySection["layout"], string> = {
  posts: "columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 [&>li]:mb-3 sm:[&>li]:mb-4",
  wide: "grid gap-4 sm:grid-cols-2",
  logos: "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4",
};

const SIZES: Record<GallerySection["layout"], string> = {
  posts: "(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw",
  wide: "(min-width: 1152px) 540px, (min-width: 640px) 50vw, 100vw",
  logos: "(min-width: 768px) 25vw, 50vw",
};

/** A grid of pieces; each one opens full size in a lightbox. */
export function Gallery({ section, id }: { section: GallerySection; id: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const items = section.items;
  const current = index === null ? null : items[index];

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (index === null && dialog.open) {
      dialog.close();
    }
  }, [index]);

  return (
    <section aria-labelledby={`${id}-titulo`} className="mt-16 md:mt-20">
      <h2 id={`${id}-titulo`} className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted">
        {section.title}
        <span className="ml-2 text-fg/40">{items.length}</span>
      </h2>
      <ul className={cn("mt-6", LAYOUT[section.layout])}>
        {items.map((item, i) => (
          <li key={item.image.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ampliar: ${item.alt}`}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-card"
            >
              <Image
                src={item.image}
                alt={item.alt}
                sizes={SIZES[section.layout]}
                placeholder="blur"
                className="h-auto w-full transition-transform duration-500 ease-out-soft group-hover:scale-[1.025]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? current.alt : section.title}
        onClose={() => {
          document.documentElement.style.overflow = "";
          setIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-fg backdrop:bg-black/90 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <div
            className="flex h-full flex-col items-center justify-center gap-4 px-4 pb-6 pt-16 sm:px-20"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            {/* Width from the aspect ratio, so the box (and the blur) shows while the image loads. */}
            <div
              className="overflow-hidden rounded-lg"
              style={{
                width: `min(100%, calc((100dvh - 9rem) * ${current.image.width / current.image.height}))`,
              }}
            >
              <Image
                key={current.image.src}
                src={current.image}
                alt={current.alt}
                sizes="100vw"
                placeholder="blur"
                className="h-auto w-full"
              />
            </div>
            <p className="max-w-2xl text-center text-sm text-fg/75">
              {current.alt}
              {items.length > 1 ? (
                <span className="ml-2 font-mono text-xs text-muted">
                  {index! + 1}/{items.length}
                </span>
              ) : null}
            </p>
          </div>
        ) : null}
        <button
          type="button"
          onClick={close}
          aria-label="Fechar"
          className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-fg transition-colors hover:bg-white/10"
        >
          <X aria-hidden className="size-5" />
        </button>
        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Peça anterior"
              className="absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-fg transition-colors hover:bg-white/10"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Próxima peça"
              className="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-fg transition-colors hover:bg-white/10"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </>
        ) : null}
      </dialog>
    </section>
  );
}
