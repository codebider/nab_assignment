# NAB Assessment

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting Started](#getting-started)
  - [System Architecture](#system-architecture)
  - [Code structure](#code-structure)
  - [Requirements](#requirements)
  - [Development](#development)
  - [Migration](#Migration)
  - [Note](#note)
  - [Suggested](#Suggested)
  - [TODO](#TODO)
  - [Sample](#sample)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started

### System Architecture
1. A high-level solution diagram for the components.

![High-level solution diagram](./files/high-level_solution.png)

2. Entity relationship diagram for the database.

![Entity relationship diagram](./files/database.png)

3. API Layer

* External - For user facing (need to optimize: caching, queue)
- [x] GET api/external/products - Get, search, filter products
- [x] GET api/external/products/{id} - Get product detail

* Internal - For internal users like admin.
- [ ] POST api/internal/products - Create product
- [ ] GET api/internal/products/{id} - Get product detail
- [ ] PUT api/internal/products/{id} - Update product
- [ ] DELETE api/internal/products/{id} - Delete product
- [x] POST api/internal/orders - Make an order
- [ ] GET api/internal/orders/{id} - Get order detail
- [ ] PUT api/internal/orders/{id} - Update order detail
- [x] GET api/internal/activities - Get, filter list activities


### Code structure
    .
    ├── file                        # Documentation files
    ├── src                         # Source files
    │   ├── apis                    # Configurate all apis
    │   ├── commons                 # Common utils
    │   └── cores                   # Core bussines
    │   │   └── config              # Storing configuration
    │   │   └── db                  # DB migration, models
    │   │   └── libs                # Some libs like cache, queue, ..
    │   │   └── services            # Core bussines logic here
    │   └── plugins                 # Plugins for happi framwork
    ├── docker-compose.yml          # Build the database for developing
    └── README.md

### Requirements

- [Install **Docker**](https://docs.docker.com/install/)
- [Install **Docker Compose**](https://docs.docker.com/compose/install/)
- [Install **NodeJs**](https://nodejs.org/en/download/)

### Prepare for first setup

1. Install node modules: `npm install`

2. Build a local database: `docker-compose up --detach`

3. Migrate database: `npm run sequelize-cli db:migrate`

4. Seeds data for develop: `npm run sequelize-cli db:seed:all`

### Development

1. Run the app `npm run develop`

2. Run unit test `npm test`

3. Run unit test with coverage `npm run test:coverage`

4. Run linter `npm run lint`

### Migration
- Use this command line to create new model

`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

- Migrate database:

`npm run sequelize-cli db:migrate`

- Undo migrate:

`npm run sequelize-cli db:migrate:undo`

### Note
- What is uuid in the header?
    - This value just like user session.
    - In the client side, we need to generate the uuid and pass to header so that we can store this value to activity logs. So that we can easily track user flow.

### Suggested
- For tracking activities, we can use GA (Google Analytics). it is more powerful for tracking user flow.

### TODO:
- Finish all remain apis.
- Use queue for save activity event.

### Sample
- Get list products
```
curl -X GET "http://0.0.0.0:5000/external/products" -H "accept: application/json" -H "uuid: 8717febc-a9e7-11ea-bb37-0242ac130002"
```

- Search products by name
```
curl -X GET "http://0.0.0.0:5000/external/products?search=laptop" -H "accept: application/json" -H "uuid: 8717febc-a9e7-11ea-bb37-0242ac130002"
```

- Filter products by colour
```
curl -X GET "http://0.0.0.0:5000/external/products?colour=red" -H "accept: application/json" -H "uuid: 8717febc-a9e7-11ea-bb37-0242ac130002"
```

- Filter products by branch
```
curl -X GET "http://0.0.0.0:5000/external/products?branch=apple" -H "accept: application/json" -H "uuid: 8717febc-a9e7-11ea-bb37-0242ac130002"
```

- Get product by id
```
curl -X GET "http://0.0.0.0:5000/external/products/1" -H "accept: application/json" -H "uuid: 8717febc-a9e7-11ea-bb37-0242ac130002"
```

- Admin make order
```
curl -X POST "http://0.0.0.0:5000/internal/orders" -H "accept: application/json" -H "uuid: 8717febc-a9e7-11ea-bb37-0242ac130002" -H "Content-Type: application/json" -d "{ \"customerPhone\": \"0961171948\", \"customerName\": \"Daniel\", \"shippingAddress\": \"235 Cong Hoa\", \"shippingCity\": \"Ho Chi Minh\", \"products\": [ { \"productId\": 1, \"quantity\": 2 } ]}"
```
## References
