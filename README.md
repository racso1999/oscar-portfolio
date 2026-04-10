## Oscar Portfolio

This repo is a Next.js portfolio app exported as static files and served from an Nginx container.

## Local Development

Install dependencies and start the dev server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CI

GitHub Actions runs:

- `npm ci`
- `npm run lint`
- `npm run build`

## CD

On pushes to `main`, GitHub Actions:

1. Builds the production container image
2. Pushes it to GitHub Container Registry
3. Connects to the VPS over SSH
4. Runs `docker compose pull` and `docker compose up -d` in the deploy directory

## Required Repository Secrets

- `DEPLOY_HOST`: VPS hostname or IP
- `DEPLOY_PORT`: SSH port, usually `22`
- `DEPLOY_USER`: deploy account, intended to be `deployer`
- `DEPLOY_PATH`: directory containing `docker-compose.yml`
- `DEPLOY_SSH_PRIVATE_KEY`: private key for the deploy account

Optional, only if the GHCR image remains private:

- `GHCR_READ_USERNAME`
- `GHCR_READ_TOKEN`

## Server Deploy Path

The deployer-safe compose project path is `/home/deployer/oscar-portfolio`.
