module.exports = {
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
  }
};
