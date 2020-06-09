const { when } = require('jest-when');

const ProductService = require('./ProductService');

describe('ProductService', () => {
  let service = null;
  let findAllAndFilterMock;
  let findByIdMock;
  let createSearchingActivityMock;
  let createViewingActivityMock;

  beforeEach(() => {
    findAllAndFilterMock = jest.fn();
    createSearchingActivityMock = jest.fn();
    createViewingActivityMock = jest.fn();
    findByIdMock = jest.fn();

    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
    };

    const productDao = {
      findAllAndFilter: findAllAndFilterMock,
      findById: findByIdMock,
    };

    const activityService = {
      createSearchingActivity: createSearchingActivityMock,
      createViewingActivity: createViewingActivityMock,
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
      expect(createSearchingActivityMock).toHaveBeenCalledTimes(1);
      expect(createSearchingActivityMock).toHaveBeenCalledWith('name');
    });
  });

  describe('getById method', () => {
    it('should call with correct params & times', async () => {
      // Given
      const product = {
        id: 2,
        name: 'iphone',
        colour: 'white',
        branch: 'Apple',
        price: 3400,
      };

      // Validate params
      when(findByIdMock)
        .calledWith(product.id)
        .mockResolvedValue(product);
      // When
      const result = await service.getById(2);
      // Then
      expect(result).toEqual(product);

      // Should create searching activity
      expect(createViewingActivityMock).toHaveBeenCalledTimes(1);
      expect(createViewingActivityMock).toHaveBeenCalledWith(product.id);
    });
  });
});
