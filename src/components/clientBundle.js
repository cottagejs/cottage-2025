// Client component bundler (Vite version, supports React/Vue/Preact)
const fs = require('fs');
const path = require('path');
const { build } = require('vite');

async function bundleClientComponents(componentsDir, outDir) {
  if (!fs.existsSync(componentsDir)) return;
  const entries = fs.readdirSync(componentsDir).filter(file => file.endsWith('.jsx') || file.endsWith('.tsx'));
  if (entries.length === 0) return;
  for (const file of entries) {
    const entry = path.join(componentsDir, file);
    const outFile = path.join(outDir, file.replace(/\.(jsx|tsx)$/, '.js'));
    await build({
      build: {
        lib: entry,
        outDir: outDir,
        formats: ['es'],
        rollupOptions: {
          input: entry,
          output: {
            entryFileNames: file.replace(/\.(jsx|tsx)$/, '.js'),
            format: 'es',
          }
        }
      }
    });
    console.log(`[client] Component bundled: ${outFile}`);
  }
}

module.exports = { bundleClientComponents };
