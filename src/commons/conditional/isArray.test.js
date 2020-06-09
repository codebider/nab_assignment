const noop = require('../helpers/noop');
const toString = require('../helpers/toString');

const isArray = require('./isArray');

describe('isArray', () => {
  [
    { input: '', output: false },
    { input: noop, output: false },
    { input: {}, output: false },
    { input: [], output: true },
    { input: 0, output: false },
    { input: false, output: false },
    { input: true, output: false },
    { input: undefined, output: false },
    { input: null, output: false },
  ].forEach(({ input, output }) => {
    it(`should return "${toString(output)}" when the value is "${toString(input)}"`, () =>
      expect(isArray(input)).toBe(output));
  });
});
