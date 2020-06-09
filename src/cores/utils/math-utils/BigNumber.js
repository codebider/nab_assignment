const BigNumberLib = require('bignumber.js');
const throwIfMissing = require('../../../commons/assertion/throwIfMissing');

class BigNumber {
  constructor(number) {
    throwIfMissing(number, 'number is required');
    this.number = new BigNumberLib(number);
  }

  plus(value) {
    this.number = this.number.plus(value);
    return this;
  }

  times(value) {
    this.number = this.number.times(value);
    return this;
  }

  div(value) {
    this.number = this.number.div(value);
    return this;
  }

  minus(value) {
    this.number = this.number.minus(value);
    return this;
  }

  toNumber() {
    return this.number.toNumber();
  }

  toFixed(value = 2) {
    return parseFloat(this.number.toFixed(value));
  }
}

module.exports = BigNumber;
