const css = require('../helper/helper');

module.exports = {
  transition: css.suffix.convertWithItself('transition', [
        'property',
        'duration',
        'timing-function',
        'delay'
    ]
  ),

  transform: css.suffix.convertWithItself('transform', [
        'box',
        'origin',
        'style'
    ]
  ),

  animation: css.suffix.convertWithItself('animation', [
        'name',
        'duration',
        'timing-function',
        'delay',
        'iteration-count',
        'direction',
        'fill-mode',
        'play-state'
    ]
  )
};
