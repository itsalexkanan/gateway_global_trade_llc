# Gateway Global Trade LLC

Edit the website pages, styles, scripts, and images in this folder. This is the Git repository root.

Cloudflare Workers Builds prepares these files in the ignored `build/` folder before deployment.

## Deployment

The `gateway-global-trade` Cloudflare Worker serves `gatewayglobaltrade.net`. Cloudflare is connected to the `itsalexkanan/gateway_global_trade_llc` GitHub repository and automatically deploys pushes to `main`.

The production build runs `node scripts/build-site.mjs`, then `npx wrangler deploy`. The Worker configuration in `wrangler.jsonc` attaches the custom domain.
