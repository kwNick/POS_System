This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Demo Video

[![Demo Video](../image.png)](https://youtu.be/HpIIT2wax2g)

```text
                 POS DATABASE
                      │
          ┌───────────┴───────────┐
          │                       │
      Spring Boot              SQL
       REST API               queries
          │                       │
          └───────────┬───────────┘
                      │
                    Next.js
                      │
             ┌────────┴────────┐
             │                 │
          POS UI          Analytics
```

```text
        users
        │
        ├── user_roles
        │       │
        │       └── roles
        │
        └── shop_users
                │
                └── shops
                        │
                        └── registers
                                │
                                └── sales
                                    │
                                    ├── sale_items
                                    │      │
                                    │      └── products
                                    │
                                    └── payments
```

```text
        Today's Sales       $4,382.25

        Transactions             127

        Average Order          $34.51

        Top Product
        └── Widget A          83 sold

        Sales by Shop
        ├── Shop A          $2,431
        ├── Shop B          $1,284
        └── Shop C            $667
```

```text
                                 ┌───────────┐
                                 │  users    │
                                 └─────┬─────┘
                                       │
                                       │
        ┌───────────┐             ┌────▼─────┐
        │   shops   │────────────►│  sales   │
        └───────────┘             └────┬─────┘
                                       │
                            ┌──────────┴──────────┐
                            │                     │
                      ┌─────▼──────┐        ┌─────▼──────┐
                      │ sale_items │        │  payments  │
                      └─────┬──────┘        └────────────┘
                            │
                            │
                      ┌─────▼──────┐
                      │  products  │
                      └────────────┘
```

This is where your question about @OneToMany and @ManyToMany is important.

You actually don't want a @ManyToMany between Sale and Product directly.

Conceptually, yes:

```text
    Sale       Product
    │           │
    │ many      │ many
    └─────┬─────┘
            │
        sale_items
```

A sale can contain many products.

A product can appear in many sales.

So mathematically that's a many-to-many relationship.

But sale_items has additional information:

quantity
unit_price
subtotal

That makes SaleItem an association entity.

So your JPA model should be:

```text
Sale
 │
 │ @OneToMany
 ▼
SaleItem
 │
 │ @ManyToOne
 ▼
Product
```

```text
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    sku VARCHAR(50) NOT NULL UNIQUE,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales (
    id BIGSERIAL PRIMARY KEY,
    shop_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    tax NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
    discount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),

    status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sales_shop
        FOREIGN KEY (shop_id)
        REFERENCES shops(id),

    CONSTRAINT fk_sales_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE TABLE sale_items (
    id BIGSERIAL PRIMARY KEY,

    sale_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),

    CONSTRAINT fk_sale_items_sale
        FOREIGN KEY (sale_id)
        REFERENCES sales(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_sale_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
);

CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,

    sale_id BIGINT NOT NULL,

    payment_method VARCHAR(30) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),

    status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED',

    transaction_reference VARCHAR(150),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payments_sale
        FOREIGN KEY (sale_id)
        REFERENCES sales(id)
        ON DELETE CASCADE
);
```

*Security Configurations*
These paths are given authorization in securityConfig

- /auth/** permitAll
- /api/users/** hasRole(Admin)
- /users/** hasRole(Admin)
- /roles/** hasRole(Admin)
- /shops/** hasRole(user, Admin)

Backend API Endpoints
*HoneyPot Controller*
--> /
    - /admin
    - /login
    - /signin
    ...

*Authentication* (All Permissions)
--> /auth
1    - /login-refresh
2    - /register-refresh
3    - /logout-refresh
4    - /refresh

*Shop Controller*
--> /shops
5    - /{shopId} GET
6    - /{shopId} DELETE
7    - /{id} PUT
8    - /addShop

*User Controller*
--> /api
9     - /users    (admin permissions)
10    - /profile
11    - / delete

*UserData Controller*
--> /api/userData
12    - /{username}/data

*Default Paths from @RestController and starter-data-rest dependency*
--> All have GET /, Get /.../{id}, POST /, PUT /.../{id}, DELETE /.../{id}
13    - /payments (unused)
14    - /products (unused)
15    - /roles
16    - /saleItems (unused)
17    - /shops
18    - /userData ? (unused)
19    - /users

(Analytics)
*Product Controller*
--> /api/products
20    - /total-units-sold

(Analytics)
*Sale Controller*
--> /api/sales
21    - /all-sales
22    - /daily-revenue
23    - /{shopId}/average-sale

(Analytics)
*Product Report Controller*
--> /api/shops
24    - /sales-report
25    - /{shopId}/sales-report
26    - /{shopId}/reports/top-products-units
27    - /{shopId}/reports/top-products-revenue
28    - /{shopId}/reports/sales-by-date/{startDate}/{endDate}

Frontend API Endpoints

*AuthContext*
1 Login --> /auth/login-refresh
2 register --> /auth/register-refresh
3 logout --> /auth/logout-refresh
4 checkRefresh --> /auth/refresh

5 deleteProfile --> /api/delete

6 fetchShop --> /shops/{shopId}   GET
7 addShop --> /shops/addShop      POST
8 updateShop --> /shops/{shopId}  PUT
9 deleteShop --> /shops/{shopId}  DELETE

10 fetchProfile --> /api/profile
11 fetchUsersWithDetails --> /api/users
12 fetchUserDataObject --> /api/userData/{username}/data

13 fetchUsers --> /users
14 fetchShops --> /shops
15 fetchRoles --> /roles

(Analytics)
16 fetchAnalytics --> Calls these functions, Does Not Require any data to be passed in
17         - fetchProductSalesReport --> /api/shops/sales-report
18         - fetchAllSalesByUsers --> /api/sales/all-sales
19         - fetchDailyRevenue --> /api/sales/daily-revenue
20         - fetchTotalUnitsSoldPerProduct --> /api/products/total-untis-sold
21 fetchAverageSaleByShopId --> /api/sales/{shopId}/average-sale
22 fetchProductSalesReportById --> /api/shops/{shopId}/sales-report
23 fetchTopProductsUnits --> /reports/top-products-units
24 fetchTopProductsRevenue --> /reports/top-products-revenue
