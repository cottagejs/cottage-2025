// Astro-like component parser (.astro file parser)
// Split server-side script, template HTML, style
const fs = require('fs');

function parseAstroFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  // Extract server-side script
  const scriptMatch = raw.match(/---([\s\S]*?)---/);
  const script = scriptMatch ? scriptMatch[1].trim() : '';
  // Extract template HTML
  const html = raw.replace(/---([\s\S]*?)---/, '').replace(/<style[\s\S]*?<\/style>/g, '').trim();
  // Extract style
  const styleMatch = raw.match(/<style(.*?)>([\s\S]*?)<\/style>/);
  const style = styleMatch ? styleMatch[2].trim() : '';
  const scoped = styleMatch ? /scoped/.test(styleMatch[1]) : false;
  return {
    script,
    html,
    style,
    scoped
  };
}

module.exports = { parseAstroFile };
