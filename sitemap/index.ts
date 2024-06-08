import { assert, exportPages, importPages, is } from "./deps.ts";
import { Feed } from 'npm:feed'

const sid = Deno.env.get("SID");
const projectName = Deno.env.get("PROJECT_NAME");
const urlPrefix = `https://minami.me/scrapbox/${projectName}/p/`
assert(sid, is.String);
assert(projectName, is.String);

const sitemapFeed = new Feed({
  title: 'minami-public | Scrapbox',
  description: 'Sitemap for minami-public Scrapbox/Cosense',
  link: 'https://minami.me/scrapbox/minami-public',
  updated: new Date()
});


console.log(`Exporting a json file from "/${projectName}"...`);
const result = await exportPages(projectName, {
  sid,
  metadata: true,
});
if (!result.ok) {
  const error = new Error();
  error.name = `${result.value.name} when exporting a json file`;
  error.message = result.value.message;
  throw error;
}
const { pages } = result.value;
console.log(`Total pages: ${pages.length}`);

for (const page of pages) {
  sitemapFeed.addItem({
    title: page.title,
    link: `${urlPrefix}${page.title}`,
  })
}

const feedRss = sitemapFeed.rss2()
console.log(feedRss)

const exportFilePath = "./sitemap.xml"
const write = Deno.writeTextFile(exportFilePath, feedRss);
write.then(() => console.log(`File written to ${exportFilePath}`));
