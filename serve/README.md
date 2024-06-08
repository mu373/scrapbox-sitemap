# serve-sitemap

Serve sitemap at custom domain.

## Configuration
- Cloudflare API token
    - Create from [here](https://dash.cloudflare.com/profile/api-tokens)
    - Use 'Edit Cloudflare Workers' template
```sh
# Setup config
cp .denoflare.sample .denoflare
vim .denoflare
```

## Denoflare
Make sure that [Denoflare](https://denoflare.dev/cli/) is installed.
```sh
deno install --unstable-worker-options --allow-read --allow-net --allow-env --allow-run --name denoflare --force \
https://raw.githubusercontent.com/skymethod/denoflare/v0.6.0/cli/cli.ts
```

## Testing
```sh
# Test it locally
denoflare serve scrapbox-sitemap
# Access http://localhost:8080/
```

## Deploy
```sh
# Deploy to Cloudflare Workers
denoflare push scrapbox-sitemap
```

