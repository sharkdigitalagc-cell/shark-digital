// Gera src/content/portfolio/images.ts a partir das imagens em
// src/content/portfolio/<projeto>/. Rode depois de adicionar, trocar ou
// remover imagens: `npm run portfolio:manifest`.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "src/content/portfolio");
const exts = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);

const files = fs
  .readdirSync(dir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    fs
      .readdirSync(path.join(dir, d.name))
      .filter((f) => exts.has(path.extname(f).toLowerCase()))
      .map((f) => `${d.name}/${f}`),
  )
  .sort();

const ident = (rel) => "i_" + rel.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/gi, "_");
const key = (rel) => rel.replace(/\.(webp|png|jpe?g|avif)$/i, (m) => (m.toLowerCase() === ".webp" ? "" : m.toLowerCase()));

const lines = [
  "// Gerado por scripts/portfolio-manifest.mjs. Não edite à mão.",
  "",
  ...files.map((f) => `import ${ident(f)} from "./${f}";`),
  "",
  "export const IMAGES = {",
  ...files.map((f) => `  "${key(f)}": ${ident(f)},`),
  "} as const;",
  "",
  "export type ImageKey = keyof typeof IMAGES;",
  "",
];
fs.writeFileSync(path.join(dir, "images.ts"), lines.join("\n"));
console.log(`${files.length} imagens em src/content/portfolio/images.ts`);
