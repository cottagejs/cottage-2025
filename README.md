# Cottage.js
Cottage.js is a content-driven, component-based enterprise JS framework inspired by Astro.js, designed for modern web apps and content sites. It supports static and dynamic hybrid rendering, high extensibility, and a plugin ecosystem.

## Features
- Content-driven, supports Markdown/MDX and more
- Component-based development, custom UI components
- Static & dynamic hybrid rendering for high-performance pages
- Plugin system for easy framework extension
- Configuration-driven, main config entry: `cottage.config.js`
- Supports multiple build tools (default Webpack, Turbopack planned)
- Lightweight, no forced frontend framework dependency, easy integration

## Quick Start
1. Install dependencies
   ```sh
   npm install
   ```
2. Start development server
   ```sh
   npm run dev
   # or npx cottage dev
   ```
3. Build static site
   ```sh
   npm run build
   # or npx cottage build
   ```

## Directory Structure
- `cottage.config.js`: Main configuration file
- `server.js`: Node.js server entry
- `webpack.config.js`: Build configuration
- `src/app.js`: Application main entry
- `src/components/`: Custom components directory
- `src/pages/`: Pages directory, supports content-driven rendering
- `src/content/`: Content resources (e.g. Markdown/MDX)

## Future Roadmap
- 支持 Turbopack 构建系统
- 丰富插件生态，支持内容源、渲染器、UI 组件等扩展
- 持续优化企业级开发体验

## 社区与支持
- 参与讨论：[GitHub Discussions](https://github.com/Hastersun/cottage/discussions)
- 赞助支持：GitHub Sponsors

