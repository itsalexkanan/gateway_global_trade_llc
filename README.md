# Gateway Global Trade LLC

Edit the website pages, styles, scripts, and images in this folder. This is the Git repository root.

The GitHub Actions workflow builds these files into the ignored `build/` folder before publishing.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`. It builds the static site and deploys the `gateway-global-trade` Cloudflare Worker, attached to `gatewayglobaltrade.net` as its custom domain.

Before the first deployment, add these GitHub Actions repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`, with permission to deploy Workers and manage Worker custom domains for the `gatewayglobaltrade.net` zone

After those secrets are configured, later pushes to `main` deploy automatically.
