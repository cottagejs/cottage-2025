// Cottage.js application main entry
// Content-driven + component-based architecture (Astro.js style)

const fs = require('fs');
const path = require('path');

// Load content (Markdown/MDX)
function loadContent(contentDir = path.join(__dirname, '../content')) {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => ({
      filename: f,
      content: fs.readFileSync(path.join(contentDir, f), 'utf-8')
    }));
}

// Load pages
function loadPages(pagesDir = path.join(__dirname, '../pages')) {
  if (!fs.existsSync(pagesDir)) return [];
  return fs.readdirSync(pagesDir)
    .filter(f => f.endsWith('.js'))
    .map(f => require(path.join(pagesDir, f)));
}

// Load components
function loadComponents(componentsDir = path.join(__dirname, '../components')) {
  if (!fs.existsSync(componentsDir)) return {};
  const components = {};
  fs.readdirSync(componentsDir)
    .filter(f => f.endsWith('.js'))
    .forEach(f => {
      const name = path.basename(f, '.js');
      components[name] = require(path.join(componentsDir, f));
    });
  return components;
}

// Application initialization
function initApp() {
  const content = loadContent();
  const pages = loadPages();
  const components = loadComponents();
  return {
    content,
    pages,
    components
  };
}

module.exports = {
  initApp
};
