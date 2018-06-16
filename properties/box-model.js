const css = require('../helper/helper');

module.exports = [
  ...css.suffix.convertWithItself('overflow', ['x', 'y']),
  'box-sizing',
  ...css.prefix.convertWithItself('width', ['min', 'max']),
  ...css.prefix.convertWithItself('height', ['min', 'max']),
  ...css.trbl('padding'),
  ...css.border(),
  ...css.midfix.convertWithItself('border-radius', [
      'top-left',
      'top-right',
      'bottom-right',
      'bottom-left'
    ]
  ),
  ...css.suffix.convertWithItself('border-image', [
      'source',
      'slice',
      'width',
      'outset',
      'repeat'
    ]
  ),
  ...css.trbl('margin'),
  ...css.suffix.convertWithItself('outline', [
      'width',
      'style',
      'color',
      'offset'
    ]
  )
];
