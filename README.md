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

Builds to `dist/twin-cities-effective-giving`. To build with the GitHub Pages base URL (`/`), including the SPA `404.html` fallback:

```bash
npm run build:gh-pages
```

## Tests

```bash
npm test
```

## Customizing the site

Everything a small group needs to edit lives in one file: `src/app/site-config.ts` (org name, tagline, contact email, social links, Google Calendar embed URL).

- **Photos**: drop `.jpg`/`.png` files into `public/images/`. They're served as-is and referenced in `src/app/app.html` as `images/<file>`.
- **Google Calendar**: publish your calendar (Settings → Make available to public) and paste the iframe embed URL from the calendar's settings into `calendarEmbedUrl` in `site-config.ts`.
- **Upcoming events (live sync)**: the event list on the homepage is pulled from your public Google Calendar at page load — no manual updates. Two things to set in `site-config.ts`: `calendarId` (the `...@group.calendar.google.com` id) and `googleCalendarApiKey`.
  To get an API key (one-time, free): go to [Google Cloud Console](https://console.cloud.google.com/) → create a project → APIs & Services → Library → enable **Google Calendar API** → Credentials → Create Credentials → **API key**. Restrict the key: **Application restrictions → HTTP referrers** → add `*.github.io/*` and `http://localhost:4200/*`, and **API restrictions → Restrict key → Google Calendar API**. Paste the key into `googleCalendarApiKey`. The calendar must be public and set to show event details for events to appear.
- **Email sign-up**: the form currently opens a `mailto:` to your contact email (zero backend needed). Swap `onSubscribe()` in `src/app/app.ts` to post to a service like Formspree if you want real list capture.

## Deployment

Deployment is automatic via the `.github/workflows/deploy.yml` GitHub Actions workflow. Every push to `main` builds the site and publishes it to GitHub Pages.

**One-time setup (required before the first deploy):**

1. In the GitHub repo, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push the first commit to `main`. The workflow builds and deploys automatically.

The site is then live at <https://twincitieseffectivegiving.github.io/>.

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [GitHub Pages](https://docs.github.com/pages)
