


# Cottage.js

Cottage.js is a content-driven, component-based, and plugin-extensible modern Node.js framework inspired by Astro.js. It is suitable for modern web applications and content sites, supporting multiple rendering modes: Static Site Generation (SSG), Server-Side Rendering (SSR), and Single Page Application (SPA).

---

## Features

- Supports SSG (Static Site Generation), SSR (Server-Side Rendering), and SPA (Single Page Application) modes
- Configuration-driven, zero frontend framework dependency, ideal for web artists and content creators
- Plugin ecosystem, extensible with AI capabilities (e.g., LangChain, IntelliNode)
- Clear directory structure, modular development for content, pages, components, and plugins
- Hot reload, automatic static asset copying, and client component bundling
- Modern build system: Webpack by default, Vite supported, Turbopack planned

---

## Quick Start

1. Install dependencies
   ```sh
   npm i
   ```
2. Start the development server
   ```sh
   npm start
   # or npm run s
   ```
3. Build static site
   ```sh
   npm run build
   ```
4. Preview static site
   ```sh
   node ./bin/cli.js preview
   ```

See more commands in [Development Commands](#development-commands).

---

## Directory Structure

```
├── cottage.config.js      # Main framework config
├── server.js             # Node.js server entry
├── vite.config.js        # Vite build config (optional)
├── webpack.config.js     # Webpack build config (if present)
├── bin/
│   └── cli.js            # CLI entry
├── public/               # Static assets
│   └── main.css
├── src/
│   ├── app.js            # App entry, loads content/pages/components
│   ├── components/       # Components
│   │   └── clientBundle.js
│   ├── content/          # Content (md/mdx)
│   ├── pages/            # Pages (js/astro)
│   │   ├── index.js      # Home page
│   │   ├── about.js      # About page
│   │   ├── 404.js        # Custom 404
│   │   ├── 500.js        # Custom 500
│   │   └── renderPage.js # Astro render core
│   ├── parser/           # Parsers (Astro, template, style, etc.)
│   ├── plugins/          # Plugins
│   │   ├── loggerPlugin.js
│   │   ├── langchainPlugin.js
│   │   ├── intellinodePlugin.js
│   │   └── pluginTemplate.js
│   └── router/           # Route generation
│       └── generateRoutes.js
└── package.json
```

---

## Configuration

All core configuration is in `cottage.config.js`, supporting the following structure:

```js
module.exports = {
  site: {
    title: 'Cottage.js Node.js Framework Core',
    description: 'Content-driven, component-based, plugin-extensible modern Node.js framework',
    baseUrl: '/',
  },
  content: {
    dir: 'src/content',
    formats: ['md', 'mdx'],
  },
  pages: {
    dir: 'src/pages',
    ext: ['js'],
  },
  components: {
    dir: 'src/components',
    ext: ['js'],
  },
  plugins: [
    './src/plugins/loggerPlugin',
    // Example: '@cottage/plugin-markdown'
  ],
  build: {
    outDir: 'dist',
    staticDir: 'public',
    ssr: false,
    bundler: 'webpack',
  },
  mode: 'ssg', // Options: 'ssg' | 'ssr' | 'spa'
  ssg: { outDir: 'public' },
  ssr: { enabled: false, entry: 'server.js', outDir: 'dist' },
  // ... other config ...
}
```

- `mode: 'ssg'`  Static Site Generation (default)
- `mode: 'ssr'`  Enable SSR, set `ssr.enabled: true`
- `mode: 'spa'`  Pure frontend SPA

See more options and comments in `cottage.config.js`.

---

## Development Commands

| Command                      | Description                      |
|------------------------------|----------------------------------|
| npm i                        | Install dependencies             |
| npm start / run s            | Start dev server (Node.js)       |
| npm run build                | Build static site                |
| node ./bin/cli.js dev        | Start dev server (CLI)           |
| node ./bin/cli.js build      | Build static site (CLI)          |
| node ./bin/cli.js preview    | Preview static site              |
| node ./bin/cli.js clean      | Clean build output               |
| node ./bin/cli.js info       | Show project info                |
| node ./bin/cli.js list-pages | List all pages                   |

---

## Plugins & AI Extensions

Cottage.js supports integration of mainstream AI capabilities via plugins:

- **LangChain**: Build intelligent chat/AI apps (`src/plugins/langchainPlugin.js`)
- **IntelliNode**: Modern Node.js API service, efficient routing & middleware (`src/plugins/intellinodePlugin.js`)
- **LoggerPlugin**: Logging hooks before/after render (`src/plugins/loggerPlugin.js`)
- **Plugin Template**: Reference for custom plugin development (`src/plugins/pluginTemplate.js`)

Configure plugins in the `plugins` field of `cottage.config.js`. Lifecycle hooks supported: `beforeRender`, `afterRender`, `notFound`, `buildStart`, `buildEnd`, `hotReload`, etc.

---

## Architecture & Development Patterns

- **Configuration-driven**: All core config in `cottage.config.js`
- **Content-driven**: Supports Markdown/MDX content loading
- **Separation of pages/components**: Clear `src/pages`, `src/components`, `src/content` structure
- **Plugin system**: Custom plugins & AI extension support
- **Hot reload**: Auto-reload on changes in dev mode
- **Multiple rendering modes**: SSG, SSR, SPA
- **Auto static asset copy & client component bundling**

---

## Contribution & Community

- Join discussions: [GitHub Discussions](https://github.com/Hastersun/cottage/discussions)
- Sponsor: GitHub Sponsors

---

Author: hastersun | License: MIT
