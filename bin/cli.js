#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');

program
  .name('cottage')
  .description('Cottage.js Node.js Framework CLI Tool')
  .version('1.0.0');

program
  .command('dev')
  .description('Start development server')
  .action(() => {
    try {
      require(path.join(__dirname, '../server.js'));
    } catch (err) {
      console.error('[dev] Failed to start server:', err.message);
      process.exit(1);
    }
  });

program
  .command('build')
  .description('Build all pages as static site')
  .action(() => {
    try {
      const path = require('path');
      const fs = require('fs-extra');
      const config = require('../cottage.config.js');
      const { scanPages } = require('../src/router/generateRoutes');
      const { renderAstroPage } = require('../src/pages/renderPage');
      const outDir = path.join(process.cwd(), config.build.outDir || 'dist');
      fs.ensureDirSync(outDir);
      const routes = scanPages(path.join(process.cwd(), config.pages.dir));
      routes.forEach(route => {
        let html = '';
        if (route.type === 'js') {
          delete require.cache[require.resolve(route.file)];
          const page = require(route.file);
          if (typeof page.render === 'function') {
            html = page.render();
          }
        } else if (route.type === 'astro') {
          const result = renderAstroPage(route.file);
          html = result.html;
        }
        if (html) {
          let outPath = path.join(outDir, route.route);
          if (!outPath.endsWith('/')) outPath += '/';
          fs.ensureDirSync(outPath);
          fs.writeFileSync(path.join(outPath, 'index.html'), html, 'utf-8');
          console.log(`[build] ${route.route} -> ${path.join(outPath, 'index.html')}`);
        }
      });
      // Bundle client components
      const { bundleClientComponents } = require('../src/components/clientBundle');
      const componentsDir = path.join(process.cwd(), config.components.dir);
      const clientOutDir = path.join(outDir, 'components');
      bundleClientComponents(componentsDir, clientOutDir);
      // Copy static assets
      const staticDir = path.join(process.cwd(), config.build.staticDir || 'public');
      if (fs.existsSync(staticDir)) {
        fs.copySync(staticDir, outDir);
        console.log(`[build] Static assets copied to ${outDir}`);
      }
      console.log('Static site build complete!');
    } catch (err) {
      console.error('[build] Build failed:', err.message);
      process.exit(1);
    }
  });

// Clean output directory
program
  .command('clean')
  .description('Remove build output directory')
  .action(() => {
    try {
      const fs = require('fs-extra');
      const config = require('../cottage.config.js');
      const outDir = require('path').join(process.cwd(), config.build.outDir || 'dist');
      if (fs.existsSync(outDir)) {
        fs.removeSync(outDir);
        console.log(`[clean] Removed ${outDir}`);
      } else {
        console.log('[clean] No output directory found.');
      }
    } catch (err) {
      console.error('[clean] Failed to clean:', err.message);
      process.exit(1);
    }
  });

// Preview static site
program
  .command('preview')
  .description('Preview static site from build output')
  .option('-p, --port <port>', 'Port to use', '5000')
  .action((opts) => {
    try {
      const express = require('express');
      const config = require('../cottage.config.js');
      const outDir = require('path').join(process.cwd(), config.build.outDir || 'dist');
      const app = express();
      app.use(express.static(outDir));
      const port = parseInt(opts.port, 10) || 5000;
      app.listen(port, () => {
        console.log(`[preview] Static site running at http://localhost:${port}`);
      });
    } catch (err) {
      console.error('[preview] Failed to start preview:', err.message);
      process.exit(1);
    }
  });

// Show project info
program
  .command('info')
  .description('Show project configuration and environment info')
  .action(() => {
    try {
      const config = require('../cottage.config.js');
      console.log('Cottage.js Project Info:');
      console.log(JSON.stringify(config, null, 2));
      console.log('Node.js version:', process.version);
      console.log('Platform:', process.platform);
    } catch (err) {
      console.error('[info] Failed to show info:', err.message);
      process.exit(1);
    }
  });

// List all pages
program
  .command('list-pages')
  .description('List all available pages')
  .action(() => {
    try {
      const { scanPages } = require('../src/router/generateRoutes');
      const config = require('../cottage.config.js');
      const pages = scanPages(require('path').join(process.cwd(), config.pages.dir));
      console.log('Available pages:');
      pages.forEach(p => {
        console.log(`- ${p.route} (${p.file})`);
      });
    } catch (err) {
      console.error('[list-pages] Failed to list pages:', err.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
