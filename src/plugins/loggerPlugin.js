// loggerPlugin.js
// Example plugin: log before and after render
module.exports = {
  beforeRender(ctx) {
    console.log(`[plugin:logger] Request: ${ctx.req.method} ${ctx.req.url}`);
  },
  afterRender(ctx) {
    console.log(`[plugin:logger] Rendered: ${ctx.match ? ctx.match.route : '404'}, length: ${ctx.html.length}`);
  },
  notFound(ctx) {
    console.log(`[plugin:logger] Route not matched: ${ctx.req.url}`);
  }
};
