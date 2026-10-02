import Image from "next/image";
import { cn } from "@/components/ui";

const ALT = "Shark Digital — excelência & resultado";

/**
 * Official Shark Digital logo, from the brand file supplied by the client
 * (transparent PNG; faint background residue removed, artwork untouched).
 *
 * - `horizontal`: shark mark beside the wordmark, for the header.
 * - `stacked`: the original vertical composition, for the footer.
 */
export function Logo({
  variant = "horizontal",
  className,
  eager = false,
}: {
  variant?: "horizontal" | "stacked";
  className?: string;
  eager?: boolean;
}) {
  if (variant === "stacked") {
    return (
      <Image
        src="/logo-shark-digital.png"
        alt={ALT}
        width={640}
        height={534}
        sizes="160px"
        quality={90}
        className={cn("h-auto w-36 md:w-40", className)}
      />
    );
  }

  return (
    <Image
      src="/logo-shark-digital-horizontal.png"
      alt={ALT}
      width={1000}
      height={242}
      sizes="(min-width: 768px) 190px, 150px"
      loading={eager ? "eager" : "lazy"}
      quality={90}
      className={cn("h-9 w-auto md:h-11", className)}
    />
  );
}
