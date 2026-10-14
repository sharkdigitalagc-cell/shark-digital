// Kept apart from portfolio.ts so client components can use the labels
// without pulling every project and image into the browser bundle.

export type Category = "sites" | "identidade" | "social";

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "sites", label: "Sites e landing pages" },
  { id: "identidade", label: "Identidade visual" },
  { id: "social", label: "Social media e anúncios" },
];

/** Badge for clients whose marketing the Shark built from zero and still runs. */
export const FULL_SERVICE_LABEL = "Do zero à gestão";

export function categoryLabel(id: Category) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
