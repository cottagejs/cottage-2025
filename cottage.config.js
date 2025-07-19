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
    // Plugin package name, e.g. '@cottage/plugin-markdown'
  ],
  build: {
    outDir: 'dist',
    staticDir: 'public',
    ssr: false,
    bundler: 'webpack',
  }
};
