
-- POS System SQL Schema
-- Generated: 2025-04-17 19:04:21

-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) CHECK (role IN ('ADMIN', 'CASHIER')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SHOPS
CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCTS
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    shop_id INT REFERENCES shops(id),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0
);

-- CUSTOMERS
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    shop_id INT REFERENCES shops(id),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20)
);

-- SALES
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    shop_id INT REFERENCES shops(id),
    user_id INT REFERENCES users(id),
    customer_id INT REFERENCES customers(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SALE ITEMS
CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- INVENTORY LOGS
CREATE TABLE inventory_logs (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    change_type VARCHAR(50),
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CATEGORIES
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    shop_id INT REFERENCES shops(id),
    name VARCHAR(100) NOT NULL
);

-- PRODUCT CATEGORIES (MANY-TO-MANY)
CREATE TABLE product_categories (
    product_id INT REFERENCES products(id),
    category_id INT REFERENCES categories(id),
    PRIMARY KEY (product_id, category_id)
);

-- PAYMENTS
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(id),
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'COMPLETED',
    transaction_ref TEXT,
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RECEIPTS
CREATE TABLE receipts (
    id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(id),
    receipt_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CASHIERS
CREATE TABLE cashiers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    shop_id INT REFERENCES shops(id),
    name VARCHAR(100)
);

-- RETURNS
CREATE TABLE returns (
    id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    reason TEXT,
    returned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DISCOUNTS
CREATE TABLE discounts (
    id SERIAL PRIMARY KEY,
    shop_id INT REFERENCES shops(id),
    name VARCHAR(100),
    description TEXT,
    discount_type VARCHAR(50) CHECK (discount_type IN ('PERCENTAGE', 'FIXED')) NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP
);