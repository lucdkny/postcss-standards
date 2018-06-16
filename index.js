const postcss = require('postcss');
/*
* Properties orders
*/
const positioning = require('./properties/positioning');
const display = require('./properties/display');
const boxModel = require('./properties/box-model');
const layout = require('./properties/layout');
const style = require('./properties/style');
const content = require('./properties/content');
const effects = require('./properties/effects');

/*
 * Defaults properties
 */
const defaultProperties = [
  ...positioning,
  ...display,
  ...boxModel,
  ...layout.grid,
  ...layout.flexbox,
  ...layout.shared,
  ...style,
  ...content.font.base,
  ...content.font.variant,
  ...content.font.special,
  ...content.text,
  ...content.list,
  ...content.table,
  ...content.columns,
  ...effects.transition,
  ...effects.transform,
  ...effects.animation
]

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
          throw rule.error(errorMessage, { plugin: 'postcss-standards' });
        } else {
          const warnMessage = `Line ${rule.source.start.line}, Column ${rule.source.start.column}, Selector ${rule.selector} properties order should be:\n${correctedProperties.join('\n')}\n\n`;
          console.warn(warnMessage);
        }
      }
    });
  };
});
