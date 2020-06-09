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
- [x] GET api/external/products - Get, search, filter products
- [x] GET api/external/products/{id} - Get product detail

* Internal - For internal users like admin.
- [ ] POST api/internal/products - Create product
- [ ] GET api/internal/products/{id} - Get product detail
- [ ] PUT api/internal/products/{id} - Update product
- [ ] DELETE api/internal/products/{id} - Delete product
- [x] POST api/internal/orders - Make an order
- [ ] POST api/internal/orders/{id} - Get order detail
- [x] GET api/internal/activities - Get, filter list activities


### Code structure
    .
    ├── file                        # Documentation files
    ├── src                         # Source files
    │   ├── apis                    # Storing apis
    │   ├── commons                 # Common utils
    │   └── cores                   # Core bussines
    │   └── plugins                 # Plugins for happi
    ├── docker-compose.yml          # Build the database for developing
    └── README.md

### Development
Steps to run service locally
- Install libs `npm install`
- Start service `npm run develop`

### Example:

