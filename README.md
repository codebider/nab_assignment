# NAB Assessment

### Requirements
(Private)

### System Design
1. A high-level solution diagram for the components.

![High-level solution diagram](./files/high-level_solution.png)

2. Entity relationship diagram for the database.

![Entity relationship diagram](./files/database.png)

3. API Layer

* External - For user facing (need optimize such as caching, ...)
- [ ] GET api/external/products - Get, search, filter products
- [ ] GET api/external/products/{id} - Get product detail

* Internal - For internal users like admin.
- [ ] POST api/internal/products - Create product
- [ ] GET api/internal/products/{id} - Get product detail
- [ ] PUT api/internal/products/{id} - Update product
- [ ] DELETE api/internal/products/{id} - Delete product
- [ ] POST api/internal/orders - Make an order
- [ ] POST api/internal/orders/{id} - Get order detail


### Code structure

### Development

### Example:

