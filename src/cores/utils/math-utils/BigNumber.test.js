const BigNumber = require('./BigNumber');

describe('add method', () => {
  [
    { input: { a: 0.1, b: 0.2 }, output: 0.3 },
    { input: { a: '0.1', b: 0.2 }, output: 0.3 },
    { input: { a: '0', b: 0.2 }, output: 0.2 },
    { input: { a: 500, b: 10 }, output: 510 },
  ].forEach(({ input, output }) => {
    it(`should return "${output}" when the value is "${toString(input)}"`, () => {
      const value = new BigNumber(input.a);
      expect(value.plus(input.b).toNumber()).toBe(output);
    });
  });
});

describe('mix method method', () => {
  it(`should return correct data"`, () => {
    const value = new BigNumber('0.5');
    expect(
      value
        .plus(5)
        .times(100)
        .minus(2)
        .div(0.5)
        .toNumber(),
    ).toBe(((0.5 + 5) * 100 - 2) / 0.5);
  });
});

describe('toFixed method method', () => {
  it(`should return correct data"`, () => {
    const value = new BigNumber(0.5123);
    expect(value.toFixed(2)).toBe(0.51);
  });
});
