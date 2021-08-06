function stringifyStyle(style) {
  return Object.keys(style)
    .map((rule) => `${rule}: ${style[rule]};`)
    .join(' ');
}

function getStyle(className, style) {
  return `${className}{ ${stringifyStyle(style)} }`;
}

function getStyles(style) {
  return Object.keys(style)
    .map((className) => getStyle(className, style[className]))
    .join('');
}

module.exports = { stringifyStyle, getStyles, getStyle };
