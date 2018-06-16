const css = require('../helper/helper');

module.exports = {
  grid: [
    // Parent
    'grid',
    ...css.suffix.convertWithItself('grid-template', ['rows', 'columns', 'areas']),
    ...css.midfix.convertWithItself('grid-gap', ['row', 'column']),
    ...css.suffix.convert('grid-auto', ['rows', 'columns', 'flow']),

    // Children
    'grid-area',
    ...css.suffix.convertWithItself('grid-row', ['start', 'end']),
    ...css.suffix.convertWithItself('grid-column', ['start', 'end'])
  ],

  flexbox: [
    // Parent
    ...css.suffix.convert('flex', ['flow', 'direction', 'wrap']),

    // Children
    'order',
    ...css.suffix.convertWithItself('flex', ['grow', 'shrink', 'basis'])
  ],

  shared: [
    // Parent
    ...css.suffix.convert('justify', ['items', 'content']),
    ...css.suffix.convert('align', ['items', 'content']),

    // Children
    ...css.prefix.convert('self', ['justify', 'align'])
  ]
};
