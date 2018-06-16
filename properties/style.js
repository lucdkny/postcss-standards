const css = require('../helper/helper');

module.exports = [
  ...css.suffix.convertWithItself('background', [
      'color',
      'image',
      'repeat',
      'position',
      'position-x',
      'position-y',
      'size',
      'origin',
      'clip',
      'attachment'
    ]
  ),
  'color',
  'box-shadow'
];
