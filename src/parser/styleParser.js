// Style tag parsing utility, extract <style> content and scoped attribute
function parseStyle(raw) {
  const styleMatch = raw.match(/<style(.*?)>([\s\S]*?)<\/style>/);
  if (!styleMatch) return { style: '', scoped: false };
  return {
    style: styleMatch[2].trim(),
    scoped: /scoped/.test(styleMatch[1])
  };
}

module.exports = { parseStyle };
