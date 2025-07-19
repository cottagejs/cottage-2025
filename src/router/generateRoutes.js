// Automatically scan src/pages directory and generate route mapping table
const fs = require('fs');
const path = require('path');

function scanPages(pagesDir) {
  const routes = [];
  function walk(dir, parentRoute = '') {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath, parentRoute + '/' + file);
      } else if (file.endsWith('.js') || file.endsWith('.astro')) {
        let routePath = parentRoute + '/' + file.replace(/\.(js|astro)$/, '');
        if (routePath.endsWith('/index')) routePath = routePath.replace(/\/index$/, '/');
        // Dynamic route support: [id].js or [id].astro => :id
        routePath = routePath.replace(/\[(.+?)\]/g, ':$1');
        routes.push({
          file: fullPath,
          route: routePath,
          type: file.endsWith('.js') ? 'js' : 'astro'
        });
      }
    });
  }
  walk(pagesDir);
  return routes;
}

module.exports = { scanPages };
