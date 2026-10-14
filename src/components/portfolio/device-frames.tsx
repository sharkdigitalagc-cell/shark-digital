import Image from "next/image";
import { cn } from "@/components/ui";
import type { Shot } from "@/lib/portfolio";

/**
 * The whole page of a site inside a browser window. The screenshot scrolls
 * inside the frame (mouse, touch or keyboard once focused).
 */
export function BrowserFrame({ shot, url, className }: { shot: Shot; url?: string; className?: string }) {
  const address = url ? new URL(url).host.replace(/^www\./, "") : "prévia";
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-line-strong bg-[#161618] shadow-2xl shadow-black/60", className)}>
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
        <span aria-hidden className="flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto min-w-0 max-w-xs flex-1 truncate rounded-full bg-white/[0.06] px-3 py-1 text-center font-mono text-[0.7rem] text-muted">
          {address}
        </span>
        <span aria-hidden className="w-[2.6rem] shrink-0" />
      </div>
      <div
        tabIndex={0}
        role="region"
        aria-label="Página inteira do site; role para ver"
        className="h-[min(68vh,38rem)] overflow-y-auto overscroll-contain [scrollbar-color:rgb(255_255_255/0.2)_transparent] [scrollbar-width:thin] focus-visible:outline-offset-[-3px]"
      >
        <Image src={shot.image} alt={shot.alt} sizes="(min-width: 1152px) 740px, (min-width: 1024px) 64vw, 100vw" className="h-auto w-full" />
      </div>
    </figure>
  );
}

export function PhoneFrame({ shot, className }: { shot: Shot; className?: string }) {
  return (
    <figure
      className={cn(
        "w-[15.5rem] rounded-[2.6rem] border border-line-strong bg-[#0a0a0a] p-2.5 shadow-2xl shadow-black/60",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[2.05rem]">
        <Image src={shot.image} alt={shot.alt} sizes="240px" className="h-auto w-full" />
      </div>
    </figure>
  );
}
