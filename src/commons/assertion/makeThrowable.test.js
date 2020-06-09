const makeThrowable = require('./makeThrowable');

describe('makeThrowable', () => {
  it('should call "conditional" with "value"', () => {
    const conditional = jest.fn(() => true);
    const value = 'Some Value';
    const subject = makeThrowable(conditional, 'Expected Type');
    subject(value);
    expect(conditional).toHaveBeenCalledWith(value);
  });

  it('should throw when "conditional" returns false', () => {
    const conditional = jest.fn(() => false);
    const value = 'Some Value';
    const subject = makeThrowable(conditional, 'Expected Type');
    expect(() => subject(value)).toThrow();
  });

  it('should throw if "expectedType" not provided', () => {
    const conditional = jest.fn();
    expect(makeThrowable(conditional)).toThrow(TypeError);
    expect(makeThrowable(conditional)).toThrow(/"expectedType" has to be a non-empty string/);
  });

  it('should when supposed to, throws a TypeError if "errorMessage" not non-empty string', () => {
    const conditional = jest.fn(() => false);
    const value = 'Some Value';
    const subject = makeThrowable(conditional, 'Expected Type');
    expect(() => subject(value)).toThrow(TypeError);
    expect(() => subject(value)).toThrow(/Error – expected/);
  });

  it('should when supposed to, throws "errorMessage" if non-empty string', () => {
    const conditional = jest.fn(() => false);
    const value = 'Some Value';
    const errorMessage = 'Error Message';
    const subject = makeThrowable(conditional, 'Expected Type');
    expect(() => subject(value, errorMessage)).toThrow(errorMessage);
  });

  it('should when supposed to, throws "errorMessage" if non-empty string, and correct Error type when provided', () => {
    const conditional = jest.fn(() => false);
    const value = 'Some Value';
    const errorMessage = 'Error Message';
    const Error = ReferenceError;
    const subject = makeThrowable(conditional, 'Expected Type');
    expect(() => subject(value, errorMessage, Error)).toThrow(errorMessage);
    expect(() => subject(value, errorMessage, Error)).toThrow(Error);
  });
});
