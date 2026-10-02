package com.example.jwt_rest.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "products")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "sku", nullable = false, length = 50, unique = true)
    private String sku;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private java.math.BigDecimal price;

    @Column(name = "stock_quantity", nullable = false, defaultValue = "0")
    private Integer stock_quantity;

    @Column(name = "active", nullable = false, defaultValue = "true")
    private Boolean active;

    @Column(name = "created_at", nullable = false, updatable = false)
    private java.time.Timestamp created_at;

    @Column(name = "updated_at", nullable = false)
    private java.time.Timestamp updated_at;

}

// CREATE TABLE products (
//     id BIGSERIAL PRIMARY KEY,
//     name VARCHAR(150) NOT NULL,
//     description TEXT,
//     sku VARCHAR(50) NOT NULL UNIQUE,
//     price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
//     stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
//     active BOOLEAN NOT NULL DEFAULT TRUE,
//     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );