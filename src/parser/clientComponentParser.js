// 解析模板中的客户端组件（带 client:* 指令的标签）
const htmlparser2 = require('htmlparser2');

function parseClientComponents(html) {
  const components = [];
  const parser = new htmlparser2.Parser({
    onopentag(name, attribs) {
      // 检查是否有 client:* 指令
      Object.keys(attribs).forEach(attr => {
        if (/^client:/.test(attr)) {
          components.push({
            tag: name,
            directive: attr,
            value: attribs[attr],
            props: attribs
          });
        }
      });
    }
  }, { decodeEntities: true });
  parser.write(html);
  parser.end();
  return components;
}

module.exports = { parseClientComponents };
