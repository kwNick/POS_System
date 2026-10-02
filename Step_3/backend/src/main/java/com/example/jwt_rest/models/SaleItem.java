package com.example.jwt_rest.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity 
@Table(name = "sale_items")
public class SaleItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @Column(name = "sale_id", nullable = false)
    // private Long sale_id;

    // @Column(name = "product_id", nullable = false)
    // private Long product_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", nullable = false)
    private Sale sale;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private java.math.BigDecimal unit_price;

    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private java.math.BigDecimal subtotal; 
}

// CREATE TABLE sale_items (
//     id BIGSERIAL PRIMARY KEY,

//     sale_id BIGINT NOT NULL,
//     product_id BIGINT NOT NULL,

//     quantity INTEGER NOT NULL CHECK (quantity > 0),
//     unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
//     subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),

//     CONSTRAINT fk_sale_items_sale
//         FOREIGN KEY (sale_id)
//         REFERENCES sales(id)
//         ON DELETE CASCADE,

//     CONSTRAINT fk_sale_items_product
//         FOREIGN KEY (product_id)
//         REFERENCES products(id)
// );