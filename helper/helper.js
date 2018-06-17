module.exports = {
  /*
  * Build properties order
  */
  prefix: {
    convert(property, prefixes) {
    	return prefixes.map(prefix => `${prefix}-${property}`);
    },
    convertWithItself(property, prefixes) {
      return [property].concat(this.convert(property, prefixes));
    }
  },
  midfix: {
  	convert(property, midfixes) {
  		const holder = property.split('-');
      const last = holder.pop();
    	return midfixes.map(mdfx => `${holder.join('-')}${holder.length > 0 ? '-' : ''}${mdfx}-${last}`);
    },
    convertWithItself(property, midfixes) {
      return [property].concat(this.convert(property, midfixes));
    }
  },
  suffix: {
    convert(property, suffixes) {
    	return suffixes.map(suffix => `${property}-${suffix}`);
    },
    convertWithItself(property, suffixes) {
      return [property].concat(this.convert(property, suffixes));
    }
  },
  trbl(property) {
    const rules = [];
	  if (property) {
	    rules.push(property);
	    property += '-';
	  } else {
      property = '';
    }

	  return rules.concat([
	    property + 'top',
	    property + 'right',
	    property + 'bottom',
	    property + 'left'
	  ]);
  },
  border() {
    const borderDesc = ['width', 'style', 'color'];
    const borderExtend = this.trbl('border')
      .map(value => this.suffix.convertWithItself(value, borderDesc))
      .reduce((a, b) => a.concat(b));

    return borderExtend;
  },
  /*
  * Check if a decl is prefixed or not
  */
  isPrefixed: {
    list () {
      return [
        '-ms-', 'mso-', // Microsoft
        '-moz-',        // Mozilla
        '-o-', '-xv-',  // Opera Software
        '-atsc-',       //  Advanced Television Standards Committee
        '-wap-',        //  The WAP Forum
        '-khtml-',      //  KDE
        '-webkit-',     //  Apple
        'prince-',      //  YesLogic
        '-ah-',         //  Antenna House
        '-hp-',         //  Hewlett Packard
        '-ro-',         //  Real Objects
        '-rim-',        //  Research In Motion
        '-tc-'          //  TallComponents
      ]
    },
    check (property) {
      const regexForPrefixes = new RegExp('^(' + this.list().join('|') + ')([a-z\-]+)$', 'i')
      return regexForPrefixes.test(property)
    }
  },
  /*
   * Convert properties array to an object with order index
   */
  indexProperties(properties) {
    return properties.reduce(function(result, item, index) {
      result[item] = index + 1;
      return result;
    }, {});
  },
  /*
   * Simple compare 2 array
   */
  compareArray(array, anotherArray) {
    return JSON.stringify(array) !== JSON.stringify(anotherArray);
  },
  /*
  * Get ordered decl array from origin array
  */
  getOrderedProps(array, order) {
    return [...array].sort(function(a, b) {
      if (!order.hasOwnProperty(a)) {
        return 1;
      } else if (!order.hasOwnProperty(b)) {
        return -1;
      } else {
        return order[a] - order[b];
      }
    });
  },
  /*
  * Get origin decl array from rule
  */
  getProps(rule) {
    const originProperties = [];
    rule.nodes.map((decl) => {
      if (decl.type === 'decl' && !this.isPrefixed.check(decl.prop) && !this.isPrefixed.check(decl.value)) {
        originProperties.push(decl.prop)
      }
    });
    return originProperties;
  }
};
