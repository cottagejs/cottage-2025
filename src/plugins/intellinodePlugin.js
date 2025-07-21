// IntelliNode 插件集成示例
const { createApp, Router } = require('intellinode');

module.exports = function intellinodePlugin(options = {}) {
  const app = createApp();
  const router = new Router();
  const { routes = [] } = options;

  // 注册用户自定义路由
  routes.forEach(route => {
    const { method = 'get', path, handler } = route;
    router[method](path, handler);
  });
  app.use(router);

  return {
    name: 'intellinodePlugin',
    app,
    listen(port = 3000, callback) {
      app.listen(port, callback);
    }
  };
};
