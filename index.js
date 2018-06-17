const postcss = require('postcss');
const helper = require('./helper/helper')
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
 * Main module
 */
module.exports = postcss.plugin('postcss-standards', function(opts) {
  const defaults = {
    throwValidateErrors: true,
    properties: defaultProperties
  }
  const options = Object.assign({}, defaults, opts);
  const ordering = helper.indexProperties(options.properties);
  return function(root, result) {
    result.decl_order = {};
    root.walkRules(rule => {
      const originProperties = helper.getProps(rule);
      const correctedProperties = helper.getOrderedProps(originProperties, ordering);
      if (helper.compareArray(originProperties, correctedProperties)) {
        result.decl_order[rule.selector] = correctedProperties;
        const message = `Properties order should be:\n${correctedProperties.join('\n')}\n\n`;
        if (options.throwValidateErrors) {
          throw rule.error(message, { plugin: 'postcss-standards' });
          return;
        } else {
          rule.warn(result, message);
        }
      }
    });
  };
});
