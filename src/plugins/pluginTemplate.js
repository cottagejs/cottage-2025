// pluginTemplate.js
// Standard Cottage.js plugin lifecycle and interface template
module.exports = {
  // Lifecycle hooks
  beforeRender(ctx) {
    // Before page render, ctx: { req, res, match, html }
    // You can modify ctx.html or run custom logic
  },
  afterRender(ctx) {
    // After page render, ctx: { req, res, match, html }
    // You can modify ctx.html or run custom logic
  },
  notFound(ctx) {
    // When route not matched, ctx: { req, res, match, html }
    // You can customize 404 response or log
  },
  // Extend more lifecycle hooks, e.g. buildStart, buildEnd, hotReload, etc.
  buildStart(ctx) {
    // When static build starts
  },
  buildEnd(ctx) {
    // When static build ends
  },
  hotReload(ctx) {
    // Hot reload event
  }
};
