import { Hono } from "hono";

const app = new Hono();

app.get("/*", async (c) => {
  const sitemapUrl = "https://mu373.github.io/scrapbox-sitemap/sitemap.xml";
  const response = await fetch(sitemapUrl);

  if (response.ok) {
    const body = await response.text();
    return c.body(body, 200, { "Content-Type": "application/xml" });
  } else {
    return c.body("Failed to fetch sitemap", 500);
  }
});

export default app;
