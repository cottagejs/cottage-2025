// Server-side script execution utility
// Used to execute server-side scripts in .astro files and return data object
function runServerScript(script) {
  const exports = {};
  const module = { exports };
  // Use Function constructor for safe execution (trusted content only)
  const fn = new Function('exports', 'module', script);
  fn(exports, module);
  return module.exports;
}

module.exports = { runServerScript };
