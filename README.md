# scrapbox-sitemap

Generate and serve a Scrapbox sitemap (RSS feed).

## Overview
- **[sitemap/](sitemap/)** — Generates a sitemap RSS feed from a Scrapbox project export (runs on GitHub Actions)
- **[serve/](serve/)** — Serves the sitemap at a custom domain via Cloudflare Workers (Hono)

## How it works
1. GitHub Actions exports the Scrapbox project as JSON and generates a sitemap RSS feed
2. The feed is deployed to [GitHub Pages](https://mu373.github.io/scrapbox-sitemap/sitemap.xml)
3. A Cloudflare Worker proxies the feed at a custom domain route (`minami.me/scrapbox/minami-public/sitemap/*`)
