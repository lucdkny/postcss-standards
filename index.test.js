var postcss = require('postcss');

var plugin = require('./');

const expectEqual = (input, output, opts) => {
  return postcss([ plugin(opts) ]).process(input)
    .then(result => {
      expect(result.decl_order).toEqual(output)
    })
}

/* Test cases */
it('Nomral style', () => {
    const expected = {
        '.normal_style': [
            'position',
            'z-index',
            'top',
            'left',
            'display',
            'overflow',
            'width',
            'height',
            'border-radius',
            'margin-bottom',
            'background'
        ]
    };
    return expectEqual(
    	`.normal_style {
    		border-radius: 100%;
    		display: block;
    		background: #000;
    		position: absolute;
    		margin-bottom: 0;
            z-index: 9999;
            top: 0;
            left: 0;
            overflow: scroll;
            width: 100%;
            height: 100%;
    	}`,
        expected,
        { throwValidateErrors: false }
    );
});

it('Prefixed style', () => {
    const expected = {
        '.prefixed': [
            'display',
            'justify-content',
            'align-items',
            'background',
            'color',
            'text-align',
            'text-decoration',
            'text-transform'
        ]
    };
    return expectEqual(
        `.prefixed {
            color: #333;
            background: #fff;
            text-align: center;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            justify-content: center;
            text-decoration: unerline;
            -webkit-box-align: center;
            -ms-flex-align: center;
                    align-items: center;
            text-transform: uppercase;
        }`,
        expected,
        { throwValidateErrors: false }
    );
});

it('Style with @media', () => {
    const expected = {
        '.responsive_style_768px': [
            'display',
            'width',
            'height',
            'background',
            'text-decoration'
        ]
    };
    return expectEqual(
        `@media (min-width: 768px) {
            .responsive_style_768px {
                background: #000;
                width: 200px;
                -webkit-apperance: none;
                display: block;
                text-decoration: none;
                height: 40px;
            }
        }`,
        expected,
        { throwValidateErrors: false }
    );
});

it('Nested style', () => {
    const expected = {
        '.nested_children': [
            'display',
            'width',
            'padding',
            'color'
        ],
        '.nested_children_child': [
            'position',
            'border-radius',
            'margin',
            'background'
        ]
    };
    return expectEqual(
        `.nested_style {
            display: flex;
            align-items: center;
            background: #fff;
            color: #333;

            .nested_children {
                padding: 0 15px;
                color: #000;
                display: block;
                width: 50%;
                
                .nested_children_child {
                    margin: 0 -15px;
                    position: absolute;
                    background: #000;
                    border-radius: 100%;
                }
            }
        }`,
        expected,
        { throwValidateErrors: false }
    );
});
