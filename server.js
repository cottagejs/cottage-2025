
// Cottage.js server entry
const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const config = require('./cottage.config.js');
const { scanPages } = require('./src/router/generateRoutes');
const { renderAstroPage } = require('./src/pages/renderPage');

// Plugin loading and hooks
const loadedPlugins = [];
if (Array.isArray(config.plugins)) {
  config.plugins.forEach(pluginName => {
    try {
      const plugin = require(pluginName);
      loadedPlugins.push(plugin);
      console.log(`[plugin] Loaded: ${pluginName}`);
    } catch (err) {
      console.warn(`[plugin] Failed to load: ${pluginName}`, err.message);
    }
  });
}

function runHook(hook, ctx) {
  loadedPlugins.forEach(plugin => {
    if (typeof plugin[hook] === 'function') {
      try {
        plugin[hook](ctx);
      } catch (err) {
        console.error(`[plugin] ${hook} execution error`, err);
      }
    }
  });
}

// Static assets
app.use(express.static(path.join(__dirname, config.build.staticDir || 'public')));


// Route mapping table (supports .js and .astro)
let routes = scanPages(path.join(__dirname, config.pages.dir));
const pagesDir = path.join(__dirname, config.pages.dir);

// WebSocket hot reload service
const wss = new WebSocket.Server({ server });
function broadcastReload() {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('reload');
    }
  });
}

// Hot reload: watch page directory changes, update route table and broadcast reload
const chokidar = require('chokidar');
chokidar.watch(pagesDir, { ignoreInitial: true }).on('all', (event, filePath) => {
  routes = scanPages(pagesDir);
  console.log(`[Hot Reload] Page Changed：${event} -> ${filePath}`);
  broadcastReload();
});

// Example API route
app.get('/api/content', (req, res) => {
  res.json({ msg: 'API Example' });
});

// Inject client hot reload script
app.use((req, res, next) => {
  res.locals.injectReloadScript = () => {
    return `<script>
      const ws = new WebSocket('ws://' + location.host);
      ws.onmessage = (e) => { if (e.data === 'reload') location.reload(); };
    </script>`;
  };
  next();
});

// Page rendering
app.get('*', async (req, res) => {
  try {
    const match = routes.find(r => r.route === req.path || r.route === req.path + '/');
    let html = '';
    let ctx = { req, res, match, html };
    runHook('beforeRender', ctx);
    if (match) {
      if (match.type === 'js') {
        try {
          delete require.cache[require.resolve(match.file)];
          const page = require(match.file);
          // SSR: 支持 getServerSideProps
          let props = {};
          if (config.mode === 'ssr' && typeof page.getServerSideProps === 'function') {
            props = await page.getServerSideProps({ req, res });
          }
          // SSG: 支持 getStaticProps
          if (config.mode === 'ssg' && typeof page.getStaticProps === 'function') {
            props = await page.getStaticProps();
          }
          if (typeof page.render === 'function') {
            html = page.render(props);
          }
        } catch (err) {
          console.error(`[error] JS page render failed: ${match.file}`, err);
          html = `<h1>500 Page Render Error</h1><pre>${err.message}</pre>`;
        }
      }
      if (match.type === 'astro') {
        try {
          const { renderAstroPage } = require('./src/pages/renderPage');
          const result = renderAstroPage(match.file);
          html = result.html;
        } catch (err) {
          console.error(`[error] Astro page render failed: ${match.file}`, err);
          html = `<h1>500 Page Render Error</h1><pre>${err.message}</pre>`;
        }
      }
      ctx.html = html;
      runHook('afterRender', ctx);
      html = ctx.html;
      if (html) {
        html += res.locals.injectReloadScript();
        res.send(html);
        return;
      }
    }
    runHook('notFound', ctx);
    // Custom 404 page
    try {
      const custom404 = require('./src/pages/404');
      if (typeof custom404.render === 'function') {
        res.status(404).send(custom404.render() + res.locals.injectReloadScript());
        return;
      }
    } catch {}
    res.status(404).send('<h1>404 Not Found</h1>' + res.locals.injectReloadScript());
  } catch (err) {
    console.error('[error] Global render error', err);
    // Custom 500 page
    try {
      const custom500 = require('./src/pages/500');
      if (typeof custom500.render === 'function') {
        res.status(500).send(custom500.render(err) + res.locals.injectReloadScript());
        return;
      }
    } catch {}
    res.status(500).send(`<h1>500 Server Error</h1><pre>${err.message}</pre>` + res.locals.injectReloadScript());
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Cottage.js server running at http://localhost:${PORT}`);
});
