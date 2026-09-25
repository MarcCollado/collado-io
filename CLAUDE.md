# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Strategic context (why this site exists, the personal-SEO goal) lives in the
**marcOS hub**, not here:

- `~/Documents/Claude/Code/marcOS/work/collado-io.md` — purpose, stack, scripts
- `~/Documents/Claude/Code/marcOS/work/wikidata-brief.md` — Wikidata Q-item / sameAs work

## Commands

```bash
# Development
npm run develop       # Start Gatsby dev server at localhost:8000 (daily use, hot reload)
npm run preview       # Full production build + serve at localhost:9000 (pre-deploy check)
npm run serve         # Serve the existing build at localhost:9000
npm run build         # Production build only
npm run clean         # Clear Gatsby cache and public dir

# Code quality
npm run format        # Run Prettier on the whole repo

# Testing
npm run test          # Run tests with Node's built-in test runner
```

CI (`.github/workflows/checks.yml`) runs `prettier --check .` and `npm test` on
every push to `master` and on PRs — run `npm run format` before committing.

Node is pinned in `.nvmrc` (24, LTS). Gatsby 5.16 supports Node `>=18 <26`.

## Architecture

**Gatsby 5 static site** (Jamstack) deployed to Netlify (site ID: `ed2f968d-f2c4-48b1-a35a-bffa34b75e32`). Content is Markdown files; data is queried via Gatsby's GraphQL layer at build time.

### Content pipeline

- Blog posts live in `src/media/posts/` as Markdown files with YAML frontmatter (`title`, `date`, `path`, `tags`, `excerpt`, `language`). The frontmatter types are declared in `gatsby-node.js`
- `gatsby-node.js` reads all posts via GraphQL, creates individual post pages (template: `src/templates/post-page.js`) and one page per unique tag (template: `src/templates/tag-page.js`)
- Drafts live in `src/media/drafts/`, which isn't sourced, so they never build. Move a file into `posts/` to publish it
- Internal links in Markdown use the trailing slash (`/blog/2021/learning-framework/`); without it every link is a 301
- English titles are title-cased at render time (`src/utils/titleCase.js`); set `language: 'ca'` on Catalan posts so their titles keep sentence case
- External RSS feeds are aggregated at build time via `gatsby-source-rss-feed`: Bugada on the blog page; Safareig, FocATerra and RadioLanza on the podcast page
- The outgoing feed (`/rss.xml`) carries the latest 20 posts with full content

### Key source files

- `gatsby-config.js` — all plugin configuration, site metadata, RSS feed definitions
- `gatsby-node.js` — frontmatter schema, dynamic page generation (posts + tag pages); each post gets its older/newer neighbours for the links at its end
- `gatsby-ssr.js` — dev-only: restores the dark-mode toggle's choice from `localStorage` before render
- `src/utils/titleCase.js` — title casing for English titles (keeps words with inner capitals like eBay; skips other languages)
- `src/utils/helpers.js` — blog and podcast lists (grouped by year), tag renderer
- `src/utils/feedSanitizer.js` — normalizes the site's own post HTML for the outgoing RSS feed (drops anchor icons, scripts, styles and responsive image sources; turns iframes into links; makes URLs absolute). It works on trusted input and isn't a security boundary
- `src/components/seo.js` — schema.org JSON-LD (Person on every page; WebSite on the home page; ProfilePage on `/about/`; BlogPosting on posts), Open Graph, Twitter cards

### Styling

Plain CSS with CSS variables — no preprocessor. In production, dark mode is CSS-only via `@media (prefers-color-scheme: dark)`. The checkbox toggle (a `dark` class on `<body>`, persisted in `localStorage`) only exists in `gatsby develop`. Styles live in `src/styles/style.css`.

### Testing

Tests live in `src/utils/__tests__/` and use Node's built-in `node:test` runner. Keep testable logic in plain CommonJS modules without JSX (like `titleCase.js` and `feedSanitizer.js`) so the runner can load them.
