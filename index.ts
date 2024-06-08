import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";

const app = new Hono();

app.get("/*", async (c) => {
  const sitemapUrl = "https://mu373.github.io/scrapbox-sitemap/sitemap.xml";
  const response = await fetch(sitemapUrl);

  if (response.ok) {
    console.log("Fetched RSS");
    let rssBody = await response.text();
    return new Response(rssBody, {
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
