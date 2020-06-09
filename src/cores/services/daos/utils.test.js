const { queryLike, queryRange, queryIn } = require('./utils');

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

  describe('utils.queryRange function', () => {
    it('should build correct query', () => {
      // Give
      const field = 'price';
      const from = 10;
      const to = 20;
      // When
      const result = queryRange(field, from, to);
      // Then
      expect(result).toMatchInlineSnapshot(`
        Object {
          "price": Object {
            Symbol(gte): 10,
            Symbol(lte): 20,
          },
        }
      `);
    });

    it('should build correct query when missing value', () => {
      // Give
      const field = 'price';
      // When
      const result = queryRange(field);
      // Then
      expect(result).toEqual({});
    });

    it('should build correct query when missing fromValue', () => {
      // Give
      const field = 'price';
      const from = 10;
      // When
      const result = queryRange(field, from);
      // Then
      expect(result).toMatchInlineSnapshot(`
        Object {
          "price": Object {
            Symbol(gte): 10,
          },
        }
      `);
    });

    it('should build correct query when missing toValue', () => {
      // Give
      const field = 'price';
      const to = 10;
      // When
      const result = queryRange(field, null, to);
      // Then
      expect(result).toMatchInlineSnapshot(`
        Object {
          "price": Object {
            Symbol(lte): 10,
          },
        }
      `);
    });
  });

  describe('utils.queryIn function', () => {
    it('should build correct query', () => {
      // Give
      const field = 'price';
      const value = [10, 12, 22];
      // When
      const result = queryIn(field, value);
      // Then
      expect(result).toMatchInlineSnapshot(`
        Object {
          "price": Object {
            Symbol(in): Array [
              10,
              12,
              22,
            ],
          },
        }
      `);
    });
  });
});
