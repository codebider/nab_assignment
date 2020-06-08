const { queryLike } = require('./utils');

describe('utils', () => {
  describe('utils.queryLike function', () => {
    it('should build correct query', () => {
      // Give
      const field = 'name';
      const value = 'abc';
      // When
      const result = queryLike(field, value);
      // Then
      expect(result).toMatchInlineSnapshot(`
        Object {
          "name": Object {
            Symbol(like): "%abc%",
          },
        }
      `);
    });

    it('should build correct query when missing value', () => {
      // Give
      const field = 'name';
      // When
      const result = queryLike(field);
      // Then
      expect(result).toEqual({});
    });
  });
});
