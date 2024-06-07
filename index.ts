import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { env } from "https://deno.land/x/hono@v4.3.11/helper/adapter/index.ts";

const app = new Hono();

function replaceScrapboxLinks(str: string, projectName: string) {
  const regex = new RegExp(
    `<link>https:\\/\\/scrapbox\\.io\\/${projectName}(?:\\/([^<]+))?<\\/link>`,
    "g",
  );
  return str.replace(regex, (match, page) => {
    return `<link>https://minami.me/scrapbox/${projectName}${
      page ? `/p/${page}` : ""
    }</link>`;
  });
}

app.get("/*", async (c) => {
  const ENV = env(c)
  const projectName:any= ENV.SCRAPBOX_PROJECT

  const apiurl = `https://scrapbox.io/api/feed/${projectName}`;
  const response = await fetch(apiurl);

  if (response.ok) {
    console.log("Fetched RSS");
    let rssbody = await response.text();
    const newRssBody = replaceScrapboxLinks(rssbody, projectName);
    return new Response(newRssBody, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } else {
    console.error("Failed to fetch RSS");
    console.error(`Status: ${response.status}`);
    console.error(`Response: ${await response.text()}`);
    return new Response("Failed to fetch RSS", { status: 500 });
  }
});

export default app;
