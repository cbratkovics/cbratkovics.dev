# Portfolio application

Next.js App Router application for [cbratkovics.dev](https://cbratkovics.dev). It is a single canonical page with professional case studies, independent projects, and links-only contact through GitHub and LinkedIn.

## Requirements

- Node.js 22 (see `.nvmrc`)
- npm and the committed `package-lock.json`

## Setup and development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Production behavior can be checked with:

```bash
npm run build
npm start
```

## Quality checks

```bash
npm run lint
npm run type-check
npm test
npm run build
npm run test:e2e
```

`test:e2e` launches the previously built production server and checks initial HTML, fragment navigation contracts, contact policy, canonical metadata, discovery routes, and the generated social image. The GitHub Actions workflow runs the same sequence from a clean install.

## Structure

- `app/`: page, metadata, discovery endpoints, and global styles
- `components/`: portfolio sections and navigation
- `data/`: experience, education, project, and skill content
- `config/`: canonical identity and profile-link configuration
- `tests/`: content contracts and production-server checks
