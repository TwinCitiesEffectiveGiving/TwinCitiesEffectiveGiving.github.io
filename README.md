# Twin Cities Effective Giving

Website for the Twin Cities Effective Giving club. Built with [Angular](https://angular.dev/) 22 and deployed to GitHub Pages.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+ (LTS) and npm. Managed via nvm (`nvm install --lts`).

## Development server

```bash
npm start
```

Open `http://localhost:4200/`. The app hot-reloads on source changes.

## Code scaffolding

```bash
ng generate component component-name
```

Run `ng generate --help` for all available schematics.

## Building

```bash
npm run build
```

Builds to `dist/twin-cities-effective-giving`. To build with the GitHub Pages base URL (`/TwinCitiesEffectiveGiving/`), including the SPA `404.html` fallback:

```bash
npm run build:gh-pages
```

## Tests

```bash
npm test
```

## Deployment

Deployment is automatic via the `.github/workflows/deploy.yml` GitHub Actions workflow. Every push to `main` builds the site and publishes it to GitHub Pages.

**One-time setup (required before the first deploy):**

1. In the GitHub repo, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push the first commit to `main`. The workflow builds and deploys automatically.

The site is then live at <https://DanielTurnquist.github.io/TwinCitiesEffectiveGiving/>.

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [GitHub Pages](https://docs.github.com/pages)
