// Template variable replacement and rendering utility
// Used to replace {{ var }} with actual data
function renderTemplate(template, data) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
    return typeof data[key] !== 'undefined' ? data[key] : '';
  });
}

module.exports = { renderTemplate };
