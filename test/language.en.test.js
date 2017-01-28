'use strict';

const chai = require('chai');
const expect = chai.expect;

const en = require('../language/en');
const integer = text => en.integer.match(text);
const number = text => en.number.match(text);
const ordinal = text => en.ordinal.match(text);
const temperature = (text, options) => en.temperature.match(text, options);
const date = (text, options) => en.date.match(text, options);
const time = (text, options) => en.time.match(text, options);

describe('English', function() {
	describe('Tokenization', function() {
		it('Simple: Hello World', function() {
			const tokens = en.tokenize('hello world');
			expect(tokens.length).to.equal(2);
			expect(tokens[0].raw).to.equal('hello');
			expect(tokens[1].raw).to.equal('world');
		});

		it('Contraction: Wasn\'t', function() {
			const tokens = en.tokenize('Wasn\'t');
			expect(tokens.length).to.equal(2);
			expect(tokens[0].normalized).to.equal('was');
			expect(tokens[1].normalized).to.equal('not');
		});

		it('Contraction: Can\'t', function() {
			const tokens = en.tokenize('Can\'t');
			expect(tokens.length).to.equal(2);
			expect(tokens[0].normalized).to.equal('can');
			expect(tokens[1].normalized).to.equal('not');
		});

		it('Contraction: I\'m', function() {
			const tokens = en.tokenize('I\'m');
			expect(tokens.length).to.equal(2);
			expect(tokens[0].normalized).to.equal('i');
			expect(tokens[1].normalized).to.equal('am');
		});

		it('Contraction: You\'re', function() {
			const tokens = en.tokenize('You\'re');
			expect(tokens.length).to.equal(2);
			expect(tokens[0].normalized).to.equal('you');
			expect(tokens[1].normalized).to.equal('are');
		});

		it('Contraction: They\'ll', function() {
			const tokens = en.tokenize('They\'ll');
			expect(tokens.length).to.equal(2);
			expect(tokens[0].normalized).to.equal('they');
			expect(tokens[1].normalized).to.equal('will');
		});
	});

	describe('Integer', function() {
		it('one', function() {
			return integer('one')
				.then(v =>
					expect(v).to.deep.equal({ value: 1 })
				);
		});

		it('1', function() {
			return integer('1')
				.then(v =>
					expect(v).to.deep.equal({ value: 1 })
				);
		});

		it('1 4', function() {
			return integer('1 4')
				.then(v =>
					expect(v).to.deep.equal({ value: 14 })
				);
		});

		it('thousand', function() {
			return integer('thousand')
				.then(v =>
					expect(v).to.deep.equal({ value: 1000 })
				);
		});

		it('one thousand', function() {
			return integer('one thousand')
				.then(v =>
					expect(v).to.deep.equal({ value: 1000 })
				);
		});

		it('1 thousand', function() {
			return integer('1 thousand')
				.then(v =>
					expect(v).to.deep.equal({ value: 1000 })
				);
		});

		it('1 400', function() {
			return integer('1 400')
				.then(v =>
					expect(v).to.deep.equal({ value: 1400 })
				);
		});

		it('two dozen', function() {
			return integer('two dozen')
				.then(v =>
					expect(v).to.deep.equal({ value: 24 })
				);
		});

		it('100k', function() {
			return integer('100k')
				.then(v =>
					expect(v).to.deep.equal({ value: 100000 })
				);
		});

		it('-100', function() {
			return integer('-100')
				.then(v =>
					expect(v).to.equal(null)
				);
		});

		it('-1 000', function() {
			return integer('-1 000')
				.then(v =>
					expect(v).to.equal(null)
				);
		});

		it('minus one million', function() {
			return integer('minus one million')
				.then(v =>
					expect(v).to.equal(null)
				);
		});

		it('1 thousand thousand', function() {
			return integer('1 thousand thousand')
				.then(v =>
					expect(v).to.deep.equal({ value: 1000000 })
				);
		});

		it('one 000', function() {
			return integer('one 000')
				.then(v =>
					expect(v).to.deep.equal({ value: 1 })
				);
		});
	});

	describe('Numbers', function() {
		it('one', function() {
			return number('one')
				.then(v =>
					expect(v).to.deep.equal({ value: 1 })
				);
		});

		it('1', function() {
			return number('1')
				.then(v =>
					expect(v).to.deep.equal({ value: 1 })
				);
		});

		it('1.4', function() {
			return number('1.4')
				.then(v =>
					expect(v).to.deep.equal({ value: 1.4 })
				);
		});

		it('1 4', function() {
			return number('1 4')
				.then(v =>
					expect(v).to.deep.equal({ value: 14 })
				);
		});

		it('thousand', function() {
			return number('thousand')
				.then(v =>
					expect(v).to.deep.equal({ value: 1000 })
				);
		});

		it('one thousand', function() {
			return number('one thousand')
				.then(v =>
					expect(v).to.deep.equal({ value: 1000 })
				);
		});

		it('1 thousand', function() {
			return number('1 thousand')
				.then(v =>
					expect(v).to.deep.equal({ value: 1000 })
				);
		});

		it('1.2 thousand', function() {
			return number('1.2 thousand')
				.then(v =>
					expect(v).to.deep.equal({ value: 1200 })
				);
		});

		it('1 400', function() {
			return number('1 400')
				.then(v =>
					expect(v).to.deep.equal({ value: 1400 })
				);
		});

		it('two dozen', function() {
			return number('two dozen')
				.then(v =>
					expect(v).to.deep.equal({ value: 24 })
				);
		});

		it('100k', function() {
			return number('100k')
				.then(v =>
					expect(v).to.deep.equal({ value: 100000 })
				);
		});

		it('-100', function() {
			return number('-100')
				.then(v =>
					expect(v).to.deep.equal({ value: -100 })
				);
		});

		it('-1 000', function() {
			return number('-1 000')
				.then(v =>
					expect(v).to.deep.equal({ value: -1000 })
				);
		});

		it('minus one million', function() {
			return number('minus one million')
				.then(v =>
					expect(v).to.deep.equal({ value: -1000000 })
				);
		});

		it('1 thousand thousand', function() {
			return number('1 thousand thousand')
				.then(v =>
					expect(v).to.deep.equal({ value: 1000000 })
				);
		});

		it('1e3', function() {
			return number('1e3')
				.then(v =>
					expect(v).to.deep.equal({ value: 1000 })
				);
		});

		it('1e-3', function() {
			return number('1e-3')
				.then(v =>
					expect(v).to.deep.equal({ value: 0.001 })
				);
		});
	});

	describe('Ordinal', function() {
		it('one', function() {
			return ordinal('one')
				.then(v =>
					expect(v).to.deep.equal({ value: 1 })
				);
		});

		it('1st', function() {
			return ordinal('1st')
				.then(v =>
					expect(v).to.deep.equal({ value: 1 })
				);
		});

		it('2 1st', function() {
			return ordinal('2 1st')
				.then(v =>
					expect(v).to.deep.equal({ value: 21 })
				);
		});

		it('stuff st', function() {
			return ordinal('stuff st')
				.then(v =>
					expect(v).to.deep.equal(null)
				);
		});
	});

	describe('Temperature', function() {
		it('one', function() {
			return temperature('one')
				.then(v =>
					expect(v).to.deep.equal({ value: 1, unit: 'unknown' })
				);
		});

		it('one degree', function() {
			return temperature('one degree')
				.then(v =>
					expect(v).to.deep.equal({ value: 1, unit: 'unknown' })
				);
		});

		it('one degree (default unit)', function() {
			return temperature('one degree', {
				temperature: 'celsius'
			})
				.then(v =>
					expect(v).to.deep.equal({ value: 1, unit: 'celsius' })
				);
		});

		it('40 F', function() {
			return temperature('40 F')
				.then(v =>
					expect(v).to.deep.equal({ value: 40, unit: 'fahrenheit' })
				);
		});

		it('40 fahrenheit', function() {
			return temperature('40 F')
				.then(v =>
					expect(v).to.deep.equal({ value: 40, unit: 'fahrenheit' })
				);
		});

		it('40 C', function() {
			return temperature('40 C')
				.then(v =>
					expect(v).to.deep.equal({ value: 40, unit: 'celsius' })
				);
		});

		it('40 celsius', function() {
			return temperature('40 celsius')
				.then(v =>
					expect(v).to.deep.equal({ value: 40, unit: 'celsius' })
				);
		});
	});

	describe('Date', function() {
		describe('Weekdays', function() {
			it('Friday', function() {
				return date('Friday')
					.then(v =>
						expect(v).to.deep.equal({ dayOfWeek: 5 })
					);
			});

			it('Tue', function() {
				return date('Tue')
					.then(v =>
						expect(v).to.deep.equal({ dayOfWeek: 2 })
					);
			});

			it('this tuesday', function() {
				const now = new Date(2017, 0, 24);
				return date('this tuesday', { now: now })
					.then(v =>
						expect(v).to.deep.equal({
							year: 2017,
							month: 0,
							day: 31
						})
					);
			});

			it('this Fri', function() {
				const now = new Date(2017, 0, 24);
				return date('this Fri', { now: now })
					.then(v =>
						expect(v).to.deep.equal({
							year: 2017,
							month: 0,
							day: 27
						})
					);
			});

			it('this Monday', function() {
				const now = new Date(2017, 0, 24);
				return date('this Monday', { now: now })
					.then(v =>
						expect(v).to.deep.equal({
							year: 2017,
							month: 0,
							day: 30
						})
					);
			});

			it('on Monday', function() {
				const now = new Date(2017, 0, 24);
				return date('this Monday', { now: now })
					.then(v =>
						expect(v).to.deep.equal({
							year: 2017,
							month: 0,
							day: 30
						})
					);
			});
		});

		describe('Months', function() {
			it('jan', function() {
				return date('jan')
					.then(v =>
						expect(v).to.deep.equal({ month: 0 })
					);
			});

			it('this month', function() {
				const now = new Date(2010, 0, 1);
				return date('this month', { now: now })
					.then(v =>
						expect(v).to.deep.equal({
							year: 2010,
							month: 0
						})
					);
			});

			it('next month', function() {
				const now = new Date(2010, 0, 1);
				return date('next month', { now: now })
					.then(v =>
						expect(v).to.deep.equal({
							year: 2010,
							month: 1
						})
					);
			});

			it('last month', function() {
				const now = new Date(2010, 0, 1);
				return date('last month', { now: now })
					.then(v =>
						expect(v).to.deep.equal({
							year: 2009,
							month: 11
						})
					);
			});

			it('in one month', function() {
				const now = new Date(2010, 0, 1);
				return date('in one month', { now: now })
					.then(v =>
						expect(v).to.deep.equal({
							year: 2010,
							month: 1
						})
					);
			});

			it('in 4 months', function() {
				const now = new Date(2010, 0, 1);
				return date('in 4 months', { now: now })
					.then(v =>
						expect(v).to.deep.equal({
							year: 2010,
							month: 4
						})
					);
			});
		});

		describe('Month + day', function() {
			it('jan 12', function() {
				return date('jan 12')
				.then(v =>
					expect(v).to.deep.equal({ month: 0, day: 12 })
				);
			});

			it('12 jan', function() {
				return date('12 jan')
				.then(v =>
					expect(v).to.deep.equal({ month: 0, day: 12 })
				);
			});

			it('12th november', function() {
				return date('12th november')
				.then(v =>
					expect(v).to.deep.equal({ month: 10, day: 12 })
				);
			});

			it('12th of november', function() {
				return date('12th of november')
				.then(v =>
					expect(v).to.deep.equal({ month: 10, day: 12 })
				);
			});

			it('4/12', function() {
				return date('4/12')
				.then(v =>
					expect(v).to.deep.equal({ month: 3, day: 12 })
				);
			});
		});

		describe('Relative day of week in month', function() {
			it('first Friday May', function() {
				return date('first Friday May', { now: new Date(2010, 0, 1) })
				.then(v =>
					expect(v).to.deep.equal({ year: 2010, month: 4, day: 7 })
				);
			});

			it('first Friday in May', function() {
				return date('first Friday in May', { now: new Date(2010, 0, 1) })
				.then(v =>
					expect(v).to.deep.equal({ year: 2010, month: 4, day: 7 })
				);
			});

			it('3rd Friday in May', function() {
				return date('3rd Friday in May', { now: new Date(2010, 0, 1) })
				.then(v =>
					expect(v).to.deep.equal({ year: 2010, month: 4, day: 21 })
				);
			});
		});

		describe('Year', function() {
			it('2018', function() {
				return date('2018')
					.then(v =>
						expect(v).to.deep.equal({ year: 2018 })
					);
			});

			it('this year', function() {
				return date('this year')
					.then(v =>
						expect(v).to.deep.equal({ year: new Date().getFullYear() })
					);
			});

			it('in 4 years', function() {
				return date('in 4 years', { now: new Date(2010, 0, 1) })
					.then(v =>
						expect(v).to.deep.equal({ year: 2014 })
					);
			});
		});

		describe('Month + Year', function() {
			it('may 2018', function() {
				return date('may 2018')
					.then(v =>
						expect(v).to.deep.equal({
							year: 2018,
							month: 4
						})
					);
			});
		});

		describe('Full dates', function() {
			it('12 jan 2018', function() {
				return date('12 jan 2018')
				.then(v =>
					expect(v).to.deep.equal({ year: 2018, month: 0, day: 12 })
				);
			});

			it('12 jan, 2018', function() {
				return date('12 jan, 2018')
				.then(v =>
					expect(v).to.deep.equal({ year: 2018, month: 0, day: 12 })
				);
			});

			it('12 jan in 2018', function() {
				return date('12 jan in 2018')
				.then(v =>
					expect(v).to.deep.equal({ year: 2018, month: 0, day: 12 })
				);
			});

			it('12 jan in 4 years', function() {
				return date('12 jan in 4 years', { now: new Date(2010, 0, 1) })
				.then(v =>
					expect(v).to.deep.equal({ year: 2014, month: 0, day: 12 })
				);
			});

			it('2010 01 01', function() {
				return date('2010 01 01')
				.then(v => {
					expect(v).to.deep.equal({
						year: 2010,
						month: 0,
						day: 1
					})
				});
			});

			it('2010-01-01', function() {
				return date('2010-01-01')
				.then(v => {
					expect(v).to.deep.equal({
						year: 2010,
						month: 0,
						day: 1
					})
				});
			});

			it('01 02 2010', function() {
				return date('01 02 2010')
				.then(v => {
					expect(v).to.deep.equal({
						year: 2010,
						month: 0,
						day: 2
					})
				});
			});

			it('01/02/2010', function() {
				return date('01/02/2010')
				.then(v => {
					expect(v).to.deep.equal({
						year: 2010,
						month: 0,
						day: 2
					})
				});
			});

			it('today', function() {
				return date('today', { now: new Date(2010, 0, 1) })
				.then(v =>
					expect(v).to.deep.equal({ year: 2010, month: 0, day: 1 })
				);
			});

			it('tomorrow', function() {
				return date('tomorrow', { now: new Date(2010, 0, 1) })
				.then(v =>
					expect(v).to.deep.equal({ year: 2010, month: 0, day: 2 })
				);
			});

			it('yesterday', function() {
				return date('yesterday', { now: new Date(2010, 0, 1) })
				.then(v =>
					expect(v).to.deep.equal({ year: 2009, month: 11, day: 31 })
				);
			});

			it('day after tomorrow', function() {
				return date('day after tomorrow', { now: new Date(2010, 0, 1) })
				.then(v =>
					expect(v).to.deep.equal({ year: 2010, month: 0, day: 3 })
				);
			});

			it('in 3 days', function() {
				return date('in 3 days', { now: new Date(2010, 0, 1) })
				.then(v =>
					expect(v).to.deep.equal({ year: 2010, month: 0, day: 4 })
				);
			});
		});

		describe('Relative dates within year', function() {
			it('12 jan next year', function() {
				return date('12 jan next year')
				.then(v =>
					expect(v).to.deep.equal({
						year: new Date().getFullYear() + 1,
						month: 0,
						day: 12
					})
				);
			});

			it('this month 2018', function() {
				const now = new Date(2010, 0, 1);
				return date('this month 2018', { now: now })
				.then(v =>
					expect(v).to.deep.equal({
						year: 2018,
						month: 0
					})
				);
			});

			it('first friday in 2018', function() {
				return date('first friday in 2018')
				.then(v =>
					expect(v).to.deep.equal({
						year: 2018,
						month: 0,
						day: 5
					})
				);
			});

			it('first friday in 4 years', function() {
				return date('first friday in 4 years', { now: new Date(2014, 2, 22) })
				.then(v =>
					expect(v).to.deep.equal({
						year: 2018,
						month: 0,
						day: 5
					})
				);
			});

			it('first friday in may 2018', function() {
				return date('first friday in may 2018')
				.then(v =>
					expect(v).to.deep.equal({
						year: 2018,
						month: 4,
						day: 4
					})
				);
			});

			it('first friday in may in 4 years', function() {
				return date('first friday in may in 4 years', { now: new Date(2014, 2, 22) })
				.then(v =>
					expect(v).to.deep.equal({
						year: 2018,
						month: 4,
						day: 4
					})
				);
			});
		});
	});

	describe('Time', function() {
		describe('Exactish', function() {
			it('00:00', function() {
				return time('00:00')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 0,
						minute: 0,
						precision: 'normal'
					})
				);
			});

			it('00 00', function() {
				return time('00:00')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 0,
						minute: 0,
						precision: 'normal'
					})
				);
			});

			it('330', function() {
				return time('330')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 3,
						minute: 30,
						precision: 'normal'
					})
				);
			});

			it('3:30', function() {
				return time('3:30')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 3,
						minute: 30,
						precision: 'normal'
					})
				);
			});

			// TODO: Activate this test when integer parsing is updated
			/*
			it('three thirty', function() {
				return time('three thirty')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 3,
						minute: 30,
						precision: 'normal'
					})
				);
			});
			*/

			it('3:30 PM', function() {
				return time('3:30 PM')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 15,
						minute: 30,
						precision: 'normal'
					})
				)
			});

			it('3:30 p.m.', function() {
				return time('3:30 p.m.')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 15,
						minute: 30,
						precision: 'normal'
					})
				)
			});

			it('3 a.m.', function() {
				return time('3 a.m.')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 3,
						minute: 0,
						precision: 'normal'
					})
				)
			});

			it('12 a.m.', function() {
				return time('12 a.m.')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 0,
						minute: 0,
						precision: 'normal'
					})
				)
			});

			it('20 a.m.', function() {
				return time('20 a.m.')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 8,
						minute: 0,
						precision: 'normal'
					})
				)
			});

			it('12 p.m.', function() {
				return time('12 p.m.')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 12,
						minute: 0,
						precision: 'normal'
					})
				)
			});

			it('22 p.m.', function() {
				return time('22 p.m.')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 22,
						minute: 0,
						precision: 'normal'
					})
				)
			});

			it('at 3', function() {
				return time('at 3')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 3,
						minute: 0,
						precision: 'normal'
					})
				)
			});
		});

		describe('Expressive', function() {

			it('quarter to twelve', function() {
				return time('quarter to twelve')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 11,
						minute: 45,
						precision: 'normal'
					})
				)
			});

			it('15 before 12', function() {
				return time('15 before 12')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 11,
						minute: 45,
						precision: 'normal'
					})
				)
			});

			it('half before 12', function() {
				return time('half before 12')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 11,
						minute: 30,
						precision: 'normal'
					})
				)
			});

			it('3 quarters til 12', function() {
				return time('3 quarters til 12')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 11,
						minute: 15,
						precision: 'normal'
					})
				)
			});

			it('15 minutes before 3 pm', function() {
				return time('15 minutes before 3 pm')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 14,
						minute: 45,
						precision: 'normal'
					})
				)
			});

			it('half past twelve', function() {
				return time('half past twelve')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 12,
						minute: 30,
						precision: 'normal'
					})
				)
			});

			it('half twelve', function() {
				return time('half twelve')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 12,
						minute: 30,
						precision: 'normal'
					})
				)
			});
		});

		/*
		describe('Timezones', function() {
			it('04:00 EST', function() {
				return time('04:00 EST')
				.then(v =>
					expect(v).to.deep.equal({
						hour: 4,
						minute: 0,
						precision: 'normal'
					})
				)
			});
		});
		*/

		describe('Relative', function() {
			it('in 4 hours', function() {
				return time('in 4 hours', { now: new Date(2010, 0, 1, 13, 30) })
				.then(v =>
					expect(v).to.deep.equal({
						hour: 17,
						minute: 30,
						precision: 'normal'
					})
				);
			});

			it('in 5 minutes', function() {
				return time('in 5 minutes', { now: new Date(2010, 0, 1, 13, 30) })
				.then(v =>
					expect(v).to.deep.equal({
						hour: 13,
						minute: 35,
						precision: 'normal'
					})
				);
			});

			it('in 4 hours 10 minutes', function() {
				return time('in 4 hours 10 minutes', { now: new Date(2010, 0, 1, 13, 30) })
				.then(v =>
					expect(v).to.deep.equal({
						hour: 17,
						minute: 40,
						precision: 'normal'
					})
				);
			});

			it('in 4 hours and 10 minutes', function() {
				return time('in 4 hours and 10 minutes', { now: new Date(2010, 0, 1, 13, 30) })
				.then(v =>
					expect(v).to.deep.equal({
						hour: 17,
						minute: 40,
						precision: 'normal'
					})
				);
			});

			it('in 45 minutes', function() {
				return time('in 45 minutes', { now: new Date(2010, 0, 1, 13, 30) })
				.then(v =>
					expect(v).to.deep.equal({
						hour: 14,
						minute: 15,
						precision: 'normal'
					})
				);
			});

			it('at in 4 hours', function() {
				return time('at in 4 hours', { now: new Date(2010, 0, 1, 13, 30) })
				.then(v =>
					expect(v).to.deep.equal({
						hour: 17,
						minute: 30,
						precision: 'normal'
					})
				);
			});
		});
	});
});
