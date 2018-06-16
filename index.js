const postcss = require('postcss');

/*
 * Auto add top, right, bottom, left to a prefix
 */
const autoTopRightBottomLeft = (prefix) => {
  const rules = [];
  if (prefix) {
    rules.push(prefix);
    prefix += '-';
  } else {
    prefix = '';
  }

  return rules.concat([
    prefix + 'top',
    prefix + 'right',
    prefix + 'bottom',
    prefix + 'left'
  ]);
};

/*
 * Auto add min, max to a property
 */
function autoMinMax(suffix) {
  return [suffix, 'min-' + suffix, 'max-' + suffix];
}

/*
 * First priority property
 */
const priority = ['content'];

/*
 * Position properties
 */
const positioning = [
    'position',
    'z-index'
  ]
  .concat(autoTopRightBottomLeft());

/*
 * Grid properties
 */
const gridParentRules = [
  'grid-template',
  'grid-template-columns',
  'grid-template-rows',
  'grid-template-areas',
  'grid-gap',
  'grid-column-gap',
  'grid-row-gap',
  'grid',
  'grid-auto-columns',
  'grid-auto-rows',
  'grid-auto-flow'
];

const gridChildrenRules = [
  'grid-area',
  'grid-column',
  'grid-row',
  'grid-column-start',
  'grid-column-end',
  'grid-row-start',
  'grid-row-end'
];

/*
 * Flexible properties
 */
const flexibleBoxLayoutRules = [
  'flex',
  'flex-grow',
  'flex-shrink',
  'flex-basis',
  'flex-flow',
  'flex-wrap',
  'flex-direction',
  'order'
];

const boxAlignmentRules = [
  'justify-items',
  'justify-content',
  'justify-self',
  'align-items',
  'align-content',
  'align-self'
];

const displayAndBoxModel = ['display']
  .concat(gridParentRules)
  .concat(gridChildrenRules)
  .concat(flexibleBoxLayoutRules)
  .concat(boxAlignmentRules)
  .concat([
    'overflow',
    'overflow-x',
    'overflow-y',
    'box-sizing'
  ])
  .concat(autoMinMax('width'))
  .concat(autoMinMax('height'))
  .concat(autoTopRightBottomLeft('padding'))
  .concat(autoTopRightBottomLeft('border'))
  .concat([
    'border-width',
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
    'border-radius',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-right-radius',
    'border-bottom-left-radius'
  ])
  .concat(autoTopRightBottomLeft('margin'));

/*
 * Background properties
 */
const background = [
  'background',
  'background-color',
  'background-image',
  'background-position',
  'background-size',
  'background-repeat',
  'background-origin',
  'background-clip',
  'background-attachment'
];

/*
 * Typography properties
 */
const typography = [
  'color',
  'font',
  'font-family',
  'font-size',
  'font-style',
  'font-variant',
  'font-weight',
  'line-height',
  'letter-spacing',
  'text-align',
  'text-decoration',
  'text-indent',
  'text-overflow',
  'text-shadow',
  'text-transform',
  'white-space',
  'word-break',
  'word-spacing'
];

/*
 * Other properties
 */
const otherProperties = []
  .concat(background)
  .concat(typography);

/*
 * Defaults properties
 */
const defaultProperties = priority
  .concat(positioning)
  .concat(displayAndBoxModel)
  .concat(otherProperties);

/*
 * Convert properties array to an object with order index
 */
const indexProperties = (properties) => {
  return properties.reduce(function(result, item, index) {
    result[item] = index + 1;
    return result;
  }, {});
};

/*
 * Simple compare 2 array
 */
const compareArray = (array, anotherArray) => {
  return JSON.stringify(array) !== JSON.stringify(anotherArray);
};

/*
 * Main module
 */
module.exports = postcss.plugin('postcss-standards', function(opts) {
  opts = opts || {throwValidateErrors: true, properties: defaultProperties};
  const propertiesOrder = opts.properties;
  const ordering = indexProperties(propertiesOrder);
  return function(root) {
    root.walkRules(rule => {
      /*
       * Get origin properties
       */
      const originProperties = [];
      rule.walkDecls((decl) => originProperties.push(decl.prop));

      /*
       * Get corrected properties
       */
      const correctedProperties = [...originProperties].sort(function(a, b) {
        if (!propertiesOrder.includes(a)) {
          return 1;
        } else if (!propertiesOrder.includes(b)) {
          return -1;
        } else {
          return ordering[a] - ordering[b];
        }
      });
      if (compareArray(originProperties, correctedProperties)) {
        if (opts.throwValidateErrors) {
          const errorMessage = `Properties order should be:\n${correctedProperties.join('\n')}\n\n`;
          throw rule.error(message, { plugin: 'postcss-standards' });
        } else {
          const warnMessage = `Line ${rule.source.start.line}, Column ${rule.source.start.column}, Selector ${rule.selector} properties order should be:\n${correctedProperties.join('\n')}\n\n`;
          console.warn(warnMessage);
        }
      }
    });
  };
});
