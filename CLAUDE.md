# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run develop       # Start Gatsby dev server at localhost:8000 (daily use, hot reload)
npm run preview       # Full production build + serve at localhost:9000 (pre-deploy check)
npm run build         # Production build only
npm run clean         # Clear Gatsby cache and public dir

# Code quality
npm run format        # Run Prettier on src/**/*.{js,jsx,css,md,json}

# Testing
npm run test          # Run tests with Node's built-in test runner
```

PRs are verified with `npx prettier -c` — run `npm run format` before committing.

## Architecture

**Gatsby 5 static site** (Jamstack) deployed to Netlify (site ID: `ed2f968d-f2c4-48b1-a35a-bffa34b75e32`). Content is Markdown files; data is queried via Gatsby's GraphQL layer at build time.

### Content pipeline

- Blog posts live in `src/media/posts/` as Markdown files with YAML frontmatter (`title`, `date`, `path`, `tags`, `excerpt`, `featured`, `language`)
- `gatsby-node.js` reads all posts via GraphQL, creates individual post pages (template: `src/templates/post-page.js`) and one page per unique tag (template: `src/templates/tag-page.js`)
- Posts tagged `drafts` are filtered out of production builds
- External podcast RSS feeds (Safareig, FocATerra, Bugada, RadioLanza) are aggregated at build time via `gatsby-source-rss-feed` and surfaced on the podcast page

### Key source files

- `gatsby-config.js` — all plugin configuration, site metadata, RSS feed definitions
- `gatsby-node.js` — dynamic page generation (posts + tag pages, with next/prev navigation context)
- `gatsby-ssr.js` — injects localStorage dark-mode check before render
- `src/utils/helpers.js` — title casing (language-aware, with a hardcoded proper-noun list), blog/podcast feed generators, tag renderer
- `src/utils/feedSanitizer.js` — strips unsafe HTML from external RSS content before it enters feeds
- `src/components/seo.js` — schema.org JSON-LD (Person + BlogPosting), Open Graph, Twitter cards

### Styling

Plain CSS with CSS variables — no preprocessor. Dark mode is toggled via a class on `<body>` persisted in `localStorage`. Styles live in `src/styles/style.css`.

### Testing

Only `src/utils/__tests__/feedSanitizer.test.js` exists, using Node's built-in `node:test` runner. New utilities should follow the same pattern.
