import "jsr:@std/dotenv@0.225.6/load";
import { exportPages } from "./scrapbox.ts";
import { Feed } from "npm:feed@5.2.0";

const sid = Deno.env.get("SID");
const exportJsonPath = Deno.env.get("EXPORT_JSON_PATH");
const projectName = Deno.env.get("PROJECT_NAME");
if (!projectName) {
  throw new Error("PROJECT_NAME is required");
}
if (!exportJsonPath && !sid) {
  throw new Error("SID is required when EXPORT_JSON_PATH is not set");
}
const urlPrefix = `https://minami.me/scrapbox/${projectName}/p/`;
const originalUrlPrefix = `https://scrapbox.io/${projectName}/`;

const sitemapFeed = new Feed({
  title: "minami-public | Scrapbox",
  description: "Sitemap for minami-public Scrapbox/Cosense",
  link: "https://minami.me/scrapbox/minami-public",
  updated: new Date(),
});

let pages: Array<{ title: string }>;
if (exportJsonPath) {
  console.log(`Reading pages from "${exportJsonPath}"...`);
  const raw = await Deno.readTextFile(exportJsonPath);
  const parsed = JSON.parse(raw);
  pages = parsed.pages;
} else {
  console.log(`Exporting a json file from "/${projectName}"...`);
  const result = await exportPages(projectName, {
    sid: sid!,
    metadata: true,
  });
  if (!result.ok) {
    const error = new Error();
    error.name = `${result.value.name} when exporting a json file`;
    error.message = result.value.message;
    throw error;
  }
  pages = result.value.pages;
}

console.log(`Total pages: ${pages.length}`);

for (const page of pages) {
  sitemapFeed.addItem({
    title: page.title,
    link: `${urlPrefix}${page.title}`,
    guid: `${originalUrlPrefix}${page.title}`,
    date: new Date(),
  });
}

const feedRss = sitemapFeed.rss2();
console.log(feedRss);

const exportFilePath = "./out/sitemap.xml";
const write = Deno.writeTextFile(exportFilePath, feedRss);
write.then(() => console.log(`File written to ${exportFilePath}`));
