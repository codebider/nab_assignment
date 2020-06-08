# NAB Assessment

### Requirements
(Private)

### System Design
1. A high-level solution diagram for the components.

![High-level solution diagram](./files/high-level_solution.png)

2. Entity relationship diagram for the database.

![Entity relationship diagram](./files/database.png)

3. API Layer

* External - For user facing (need to optimize such as caching, ...)
- [ ] GET api/external/products - Get, search, filter products
- [ ] GET api/external/products/{id} - Get product detail

* Internal - For internal users like admin.
- [ ] POST api/internal/products - Create product
- [ ] GET api/internal/products/{id} - Get product detail
- [ ] PUT api/internal/products/{id} - Update product
- [ ] DELETE api/internal/products/{id} - Delete product
- [ ] POST api/internal/orders - Make an order
- [ ] POST api/internal/orders/{id} - Get order detail
- [ ] GET api/internal/activities - Get, filter list activities


### Code structure
    .
    ├── file                        # Documentation files (alternatively `doc`)
    ├── src                         # Source files (alternatively `lib` or `app`)
    │   ├── apis                    # Storing apis
    │   ├── commons                 # Common utils
    │   └── cores                   # Core bussines
    │   └── plugins                 # Plugins for happi
    ├── docker-compose.yml          # Build the database for developing
    └── README.md

### Development

### Example:

