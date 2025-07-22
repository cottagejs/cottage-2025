/**
 * Cottage.js 配置文件
 * 支持 SSG（静态站点生成）和 SSR（服务端渲染）模式
 * mode: 'ssg' | 'ssr' | 'spa'，默认为 'ssg'
 */
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
    // 插件包名示例: '@cottage/plugin-markdown'
  ],
  /**
   * 构建相关配置
   * outDir: 构建输出目录
   * staticDir: 静态资源目录
   * ssr: 是否启用 SSR 构建（true/false）
   * bundler: 构建工具，默认 'webpack'，后续可支持 'turbopack' 等
   */
  build: {
    outDir: 'dist',
    staticDir: 'public',
    ssr: false,
    bundler: 'webpack',
  },
  /**
   * 运行模式
   * 'ssg' - 静态站点生成（默认）
   * 'ssr' - 服务端渲染
   * 'spa' - 纯前端单页应用
   */
  mode: 'ssg',
  /**
   * SSG（静态站点生成）相关配置
   * outDir: 生成的静态文件输出目录
   */
  ssg: {
    outDir: 'public',
  },
  /**
   * SSR（服务端渲染）相关配置
   * enabled: 是否启用 SSR
   * entry: SSR 入口文件（可选，默认 server.js）
   * outDir: SSR 构建输出目录（可选）
   */
  ssr: {
    enabled: false,
    entry: 'server.js',
    outDir: 'dist',
  },
  // 其他配置项可扩展
}
