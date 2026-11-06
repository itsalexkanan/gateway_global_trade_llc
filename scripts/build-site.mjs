import { cpSync, existsSync, lstatSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.resolve(root, "build");
const relative = path.relative(root, output);

if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
  throw new Error("Build output must stay inside the repository.");
}
if (existsSync(output) && lstatSync(output).isSymbolicLink()) {
  throw new Error("Build output cannot be a symbolic link.");
}

const pages = [
  "about.html",
  "contact.html",
  "faq.html",
  "favicon.svg",
  "gateway-global-trade-logo-light.svg",
  "gateway-global-trade-logo.svg",
  "hotels.html",
  "index.html",
  "privacy.html",
  "products.html",
  "shipping.html",
  "sitemap.xml",
  "robots.txt",
  "site.css",
  "site.js",
];

for (const page of pages) {
  const source = path.join(root, page);
  if (!lstatSync(source, { throwIfNoEntry: false })?.isFile()) {
    throw new Error(`Missing website file: ${page}`);
  }
}

const images = path.join(root, "images");
if (!lstatSync(images, { throwIfNoEntry: false })?.isDirectory()) {
  throw new Error("Missing website images folder.");
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const page of pages) cpSync(path.join(root, page), path.join(output, page));
cpSync(images, path.join(output, "images"), { recursive: true });

process.stdout.write(`Prepared ${pages.length} site files and images in build/.\n`);
