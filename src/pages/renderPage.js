// 页面渲染核心流程
// 集成 .astro 解析、服务端脚本执行、模板渲染、样式处理、客户端组件识别
const { parseAstroFile } = require('../parser/astroParser');
const { runServerScript } = require('../parser/serverScriptRunner');
const { renderTemplate } = require('../parser/templateRenderer');
const { parseStyle } = require('../parser/styleParser');
const { parseClientComponents } = require('../parser/clientComponentParser');
const fs = require('fs');

function renderAstroPage(filePath) {
  const { script, html, style, scoped } = parseAstroFile(filePath);
  // 执行服务端脚本，获取数据
  const data = runServerScript(script);
  // 渲染模板变量
  let renderedHtml = renderTemplate(html, data);
  // 识别客户端组件
  const clientComponents = parseClientComponents(renderedHtml);
  // 合并样式
  let styleTag = '';
  if (style) {
    styleTag = `<style${scoped ? ' scoped' : ''}>${style}</style>`;
  }
  // 插入客户端激活脚本
  let hydrationScripts = '';
  clientComponents.forEach(comp => {
    // 这里只做简单插入，实际可根据 client:* 指令类型优化
    hydrationScripts += `<script type="module" src="/components/${comp.tag}.js"></script>\n`;
  });
  // 最终 HTML
  return {
    html: `${styleTag}\n${renderedHtml}\n${hydrationScripts}`,
    clientComponents
  };
}

module.exports = { renderAstroPage };
