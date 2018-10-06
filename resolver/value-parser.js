'use strict';
const isEqual = require('lodash.isequal');

const Node = require('../parser/node');
const SubNode = require('../parser/sub');

class ValueParser extends Node {
	constructor(id, parser, options) {
		super();

		this.id = id;
		this.node = new SubNode(parser);
		this.options = options;

		const mapper = parser._mapper;
		this.node.mapper = (r, encounter) => {
			r = mapper ? mapper(r, encounter) : r;
			return {
				id: id,
				value: r
			};
		};
	}

	equals(o) {
		return o instanceof ValueParser && this.node.equals(o.node)
			&& isEqual(this.options, o.options);
	}

	match(encounter) {
		return this.node.match(encounter, this.options);
	}

	toString() {
		return 'ValueParser[' + this.id + ']';
	}
}

module.exports = ValueParser;
