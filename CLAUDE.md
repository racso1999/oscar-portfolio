# CLAUDE.md — Oscar's Portfolio

Personal portfolio site for Oscar Jones (`racso1999`). Read this first in a new session;
it covers the two jobs that come up most — **adding a blog post** and **adding a project** —
plus how the site is laid out and deployed.

## Stack & commands

- **Vite 7 + React 19 + TypeScript**, Tailwind 3, shadcn/ui (Radix) components, Prism for
  code highlighting, `lucide-react` for icons.
- Package manager: npm. Installs need `--legacy-peer-deps` (CI uses `npm ci --legacy-peer-deps`).

```bash
npm run dev            # local dev server
npm run build          # prebuild (LeetCode fetch) + tsc -b + vite build
npm run lint           # eslint (non-blocking in CI)
npx tsc -b             # type-check only — fastest way to validate a data-file edit
npx vite build         # build without the network-dependent prebuild step
```

Verify any content change with `npx tsc -b && npx vite build`. The full `npm run build`
also runs `scripts/fetch-leetcode.mjs`, which hits the network; it exits 0 on failure and
keeps the existing data, so it's safe but unnecessary for a content-only edit.

## Repo layout

```
src/
  App.tsx                      Hand-rolled router + nav + loading screen (no react-router)
  main.tsx                     Entry point
  index.css                    @font-face (Charter), HSL design tokens, --term-* palette, Prism overrides
  App.css
  data/
    blog.ts                    SOURCE OF TRUTH for blog posts (edit this to publish)
    projects.ts                SOURCE OF TRUTH for the project list (edit this to publish)
    leetcode.ts                AUTO-GENERATED — never hand-edit
  lib/
    renderPostBody.tsx         Mini-markdown renderer for blog bodies
    utils.ts                   cn() class merger
  components/
    sections/   About, BlogBubble, Timeline, LeetCodeHeatmap, Contact   (rendered on home)
                Hero, Skills                                            (UNUSED — not imported)
    pages/      ProjectDetail  (live, route /projects/:slug)
                Blog           (exists but NOT wired up — see caveat below)
    cards/      ProjectCard (UNUSED), SkillTag (used only by the unused Skills)
    term/       Prompt.tsx     The shell-prompt eyebrow used above every section
    ui/         shadcn/ui primitives — generated, don't hand-edit
  assets/       Images, video, PDFs and raw code samples imported by the data files
public/fonts/   Self-hosted Bitstream Charter woff2 files
scripts/fetch-leetcode.mjs     prebuild step that regenerates src/data/leetcode.ts
```

### Routing (important)

`App.tsx` is a hand-rolled router over `window.location.pathname` + `pushState`.
It only special-cases `/projects/*`; **every other path renders the home page**.

- Home page order: `About` → `LeetCodeHeatmap` → `BlogBubble` → `Timeline` (projects) → `Contact`.
- Nav anchors: `#work`, `#blog`, `#leetcode`, `#about`.
- `/projects/:slug` renders `ProjectDetail`; nginx has an SPA fallback so deep links work.

**Caveat:** `BlogBubble` navigates to `/blog`, but `App.tsx` never imports
`components/pages/Blog.tsx`, so `/blog` just re-renders the home page. All blog content is
actually read in the `BlogBubble` scroll box on the home page. If Oscar asks for a real
blog page, wire `Blog` into `App.tsx` the same way `ProjectDetail` is (`currentPath === '/blog'`).

### Design language

Terminal-flavoured dark theme: black background, Charter serif for prose, system mono for
the "machine voice". Colours come from HSL CSS vars in `src/index.css` (`--background`,
`--foreground`, `--muted-foreground`, `--border`, `--card`) and the terminal accents
`--term-green` (actually mauve `#b48ead`), `--term-pink`, `--term-amber`, `--term-cyan`,
`--term-comment`. Each section opens with a `<Prompt>` eyebrow, e.g.
`<Prompt path="~/projects" command="ls -la" />`. Sections fade in via `IntersectionObserver`
+ inline `opacity`/`transform` styles — follow that pattern for new sections.

## Adding a blog post

Edit `src/data/blog.ts` only. Insert the new object at the **top** of `blogPosts`
(the array is kept newest-first; both the bubble and the `/blog` page rely on that order).

```ts
{
  title: 'Graduated with Distinction',
  slug: 'graduated-with-distinction',       // kebab-case, unique (used as React key)
  date: '2026-11-02',                       // ISO 'YYYY-MM-DD'
  excerpt:
    'One-sentence summary.',                // single-quoted string
  body: `First paragraph.

Second paragraph.`,                          // template literal, blank line between paragraphs
},
```

Title conventions in use: `Weekly Review - DD-MM-YY` for the weekly cadence, `Research Log`
for research updates (repeated title, unique slug), or a bespoke title for a one-off.

### Body formatting

`src/lib/renderPostBody.tsx` supports a deliberately small subset of markdown:

- Blank line (`\n\n`) → new `<p>`.
- `## Heading` at the start of a block → `<h3>`.
- A block where *every* line starts with `- ` → `<ul>`.
- ```` ``` ```` fences → `<pre><code>`; the language tag on the opening fence is stripped.
- **No inline markdown** — `**bold**`, `_italic_` and `[links](...)` render as literal text.

Because `body` is a template literal, escape any backtick or `${` in the prose
(`\``, `\${`). Oscar writes with curly apostrophes (`’`) — match that. Keep the text
verbatim when he supplies it; don't rewrite his voice.

Blog posts have no image support. Adding one means extending the `BlogPost` interface
and both `BlogBubble` and `renderPostBody`.

## Adding a project

Two files, one of them optional.

**1. `src/data/projects.ts`** — add to the `projects` array, newest-first by `uploadedAt`
(a commented-out template sits at the top of the array). This drives the `~/projects`
table on the home page and the project detail page.

```ts
{
  title: 'Project Title',
  slug: 'project-slug',                      // becomes /projects/project-slug
  description: 'Main body text…',             // \n\n for paragraphs (rendered whitespace-pre-line)
  uploadedAt: '2026-11-02',
  technologies: ['Python', 'FastAPI'],        // joined with ' · ' in the table
  githubUrl: 'https://github.com/racso1999/repo',  // optional → "git clone" link, else "no repo yet"
  imageUrl: myImage,                          // optional — imported asset or absolute URL
  videoUrl: myVideo,                          // optional
  pdfUrl: myPdf,                              // optional — rendered in a 720px iframe
},
```

**Images and other media:** drop the file in `src/assets/`, name it after the slug
(`dartmoor-camping.png`, `applio-uml.svg`), `import` it at the top of `projects.ts`, and
pass the import — never a raw `/src/...` path, since Vite needs the import to hash and
emit the asset. Prefer SVG for diagrams and keep raster images reasonable; the drone `.mov`
is already a 30 MB bundle entry. On the detail page `imageUrl` renders in a dark panel and
links to the full-size file, `pdfUrl` becomes an iframe, and `videoUrl` becomes a muted,
looping `<video>` with controls.

**2. `src/components/pages/ProjectDetail.tsx` (optional)** — for anything richer than a
description, add an entry to the `PROJECT_EXTRA_CONTENT` map keyed by slug:

- `intro` — replaces `description` on the detail page (the table still shows `description`).
- `sections[]` — `{ title, text, imageUrl?, imageAlt?, codeSamples? }` for a multi-part write-up.
- `codeSamples[]` — `{ language: 'sql' | 'python', content }`. Import the real file with
  Vite's `?raw` suffix (see `crop-data-sql-database.sql?raw`) rather than inlining a string;
  for a new language, also import its Prism grammar at the top of the file.
- `devLog[]` — `{ uploadedAt: ISO datetime, summary }`, rendered as a "Devlog" list.

Note the hardcoded `project.slug === 'agentic-application-system'` CSS `invert` filter —
it exists because that UML is a light-on-dark mismatch. New dark-friendly images don't need it.

## Publishing

`main` is the deploy branch. Pushing to `main` triggers `.github/workflows/cd.yml`, which
builds the Docker image, pushes it to `ghcr.io/racso1999/oscar-portfolio:latest`, and SSHes
into the VPS to `docker compose pull && up -d`. There's also a nightly 05:17 UTC rebuild so
the LeetCode heatmap stays current. `ci.yml` runs lint (non-blocking) and a production build
on PRs and pushes.

So: **a content commit pushed to `main` is a live deploy.** Run the build locally first.
Past content commits go straight to `main` with a message like
`Add Weekly Review post for 12 Sep 2026` — follow that style.

`dist/` is gitignored; don't commit build output.
