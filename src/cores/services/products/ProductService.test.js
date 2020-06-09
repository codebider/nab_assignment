const { when } = require('jest-when');

const ProductService = require('./ProductService');

describe('ProductService', () => {
  let service = null;
  let findAllAndFilterMock;
  let createSearchingActivityMock;

  beforeEach(() => {
    findAllAndFilterMock = jest.fn();
    createSearchingActivityMock = jest.fn();

    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
    };

    const productDao = {
      findAllAndFilter: findAllAndFilterMock,
    };

    const activityService = {
      createSearchingActivity: createSearchingActivityMock,
    };

    service = new ProductService({
      logger,
      productDao,
      activityService,
    });
  });

  describe('list method', () => {
    it('should call with correct params & times', async () => {
      // Given
      const data = {
        rows: [
          {
            id: 1,
            name: 'laptop',
            colour: 'red',
            branch: 'Sony',
            price: 1000,
          },
          {
            id: 2,
            name: 'iphone',
            colour: 'white',
            branch: 'Apple',
            price: 3400,
          },
        ],
        count: 2,
      };

      const input = {
        search: 'name',
        page: 1,
        limit: 10,
      };

      const { page, limit, ...filters } = input;

      // Validate params
      when(findAllAndFilterMock)
        .calledWith(filters, page, limit)
        .mockResolvedValue(data);
      // When
      const result = await service.list(input);
      // Then
      expect(result).toEqual({
        data: [
          { branch: 'Sony', colour: 'red', id: 1, name: 'laptop', price: 1000 },
          { branch: 'Apple', colour: 'white', id: 2, name: 'iphone', price: 3400 },
        ],
        meta: { limit: 10, page: 1, total: 2 },
      });

      // Should create searching activity
      expect(createSearchingActivityMock).toBeCalledTimes(1);
      expect(createSearchingActivityMock).toBeCalledWith('name');
    });
  });
});
