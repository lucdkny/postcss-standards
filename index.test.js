var postcss = require('postcss');

var plugin = require('postcss-standards');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

/* Write tests here */

it('Sort order', () => {
    return run(
    	'a{border-radius: 100%; overflow: scroll; display: block; background-image: none; position: absolute; background-size: cover; margin-bottom: 0;}',
    	'a{border-radius: 100%; overflow: scroll; display: block; background-image: none; position: absolute; background-size: cover; margin-bottom: 0;}'
    );
});
