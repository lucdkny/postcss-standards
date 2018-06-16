const css = require('../helper/helper');

module.exports = {
  font: {
    base: [
      'font',
      'font-style',
      'font-weight',
      'font-stretch',
      'font-size',
      'line-height',
      'font-family'
    ],
    variant: css.suffix.convertWithItself('font-variant', [
        'caps',
        'numeric',
        'alternates',
        'ligatures',
        'east-asian'
      ]
    ),
    special: ['font-size-adjust', 'font-smooth']
  },

  text: [
    'text-align',
    'text-align-last',
    'text-indent',
    ...css.suffix.convertWithItself('text-decoration', [
        'color',
        'style',
        'line'
      ]
    ),
    'text-transform',
    'text-shadow',
    'text-overflow',
    ...css.suffix.convertWithItself('text-emphasis', [
        'color',
        'style',
        'position'
      ]
    ),
    'text-justify',
    'letter-spacing',
    'tab-size',
    'word-spacing',
    'word-break',
    'word-wrap',
    'overflow-wrap',
    'white-space',
    'hyphens',
    'hanging-punctuation'
  ],

  list: [
    ...css.suffix.convertWithItself('list-style', [
        'type',
        'position',
        'image'
      ]
    ),
    'counter-reset',
    'counter-increment'
  ],

  table: [
    'table-layout',
    'border-spacing',
    'border-collapse',
    'vertical-align',
    'empty-cells',
    'caption-side'
  ],

  columns: [
    'columns',
    'column-width',
    'column-count',
    'column-gap',
    'column-rule',
    'column-span',
    'column-fill'
  ]
};
