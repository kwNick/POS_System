-- Core Entities

-- USERS -- Core
-- users → sales	                One-to-Many	            Each user can make many sales
-- users → inventory_logs	        One-to-Many	            Each inventory change is tracked to a user
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) CHECK (role IN ('ADMIN', 'CASHIER')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SALES -- Core
-- sales → sale_items	            One-to-Many 	        Each sale can have many items
-- sales → payments	                One-to-One / Many	    A sale can have one or more payment records
-- sales → returns	                One-to-Many	            A sale can be referenced by multiple returns
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    customer_id INT REFERENCES customers(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SALE ITEMS -- Core
CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    price_at_sale DECIMAL(10, 2) NOT NULL
);

-- PAYMENTS -- Core
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(id) ON DELETE CASCADE,
    method VARCHAR(50) NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    change_given DECIMAL(10, 2)
);

-- PRODUCTS -- Core
-- products → sale_items	        One-to-Many	            A product can appear in many sales
-- products → inventory_logs	    One-to-Many	            Each product has many inventory logs
-- products → return_items	        One-to-Many	            Products can appear in return items
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2),
    stock_quantity INT DEFAULT 0,
    category_id INT REFERENCES product_categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INVENTORY LOGS -- Core
CREATE TABLE inventory_logs (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    user_id INT REFERENCES users(id),
    change INT NOT NULL,
    reason VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Secondary Entities

-- CUSTOMERS -- Secondary
-- customers → sales	            One-to-Many	            Each customer can have many sales
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    loyalty_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCT CATEGORIES -- Secondary
-- product_categories → products	One-to-Many	            Each category has many products
CREATE TABLE product_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- DISCOUNTS -- Secondary
-- discounts → products	            Many-to-One (optional)	A discount may apply to a product
CREATE TABLE discounts (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) CHECK (type IN ('PERCENTAGE', 'FIXED')) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    product_id INT REFERENCES products(id),
    start_date DATE,
    end_date DATE
);


-- RETURNS -- Secondary
-- returns → return_items	        One-to-Many	            A return can have many returned items
CREATE TABLE returns (
    id SERIAL PRIMARY KEY,
    original_sale_id INT REFERENCES sales(id),
    user_id INT REFERENCES users(id),
    total_refunded DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RETURN ITEMS -- Secondary
CREATE TABLE return_items (
    id SERIAL PRIMARY KEY,
    return_id INT REFERENCES returns(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    refund_amount DECIMAL(10, 2)
);


-- Relationship	                    Type	            Description
-- users → sales	                One-to-Many	            Each user can make many sales
-- customers → sales	            One-to-Many	            Each customer can have many sales
-- sales → sale_items	            One-to-Many 	        Each sale can have many items
-- products → sale_items	        One-to-Many	            A product can appear in many sales
-- product_categories → products	One-to-Many	            Each category has many products
-- products → inventory_logs	    One-to-Many	            Each product has many inventory logs
-- users → inventory_logs	        One-to-Many	            Each inventory change is tracked to a user
-- sales → payments	                One-to-One / Many	    A sale can have one or more payment records
-- sales → returns	                One-to-Many	            A sale can be referenced by multiple returns
-- returns → return_items	        One-to-Many	            A return can have many returned items
-- products → return_items	        One-to-Many	            Products can appear in return items
-- discounts → products	            Many-to-One (optional)	A discount may apply to a product