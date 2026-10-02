package com.example.jwt_rest.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity 
@Table(name = "sales")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @Column(name = "shop_id", nullable = false)
    // private Long shop_id;

    // @Column(name = "user_id", nullable = false)
    // private Long user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(name = "tax", nullable = false, precision = 10, scale = 2)
    private BigDecimal tax;

    @Column(name = "discount", nullable = false, precision = 10, scale = 2)
    private BigDecimal discount;

    @Column(name = "total", nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(name = "status", nullable = false, length = 30)
    private String status;

    @Column(name = "created_at", nullable = false)
    private java.time.LocalDateTime created_at;

    @OneToMany(mappedBy = "sale")
    private List<SaleItem> saleItems = new ArrayList<>();

    @OneToMany(mappedBy = "sale")
    private List<Payment> payments = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
    }

}

// CREATE TABLE sales (
//     id BIGSERIAL PRIMARY KEY,
//     shop_id BIGINT NOT NULL,
//     user_id BIGINT NOT NULL,

//     subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
//     tax NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
//     discount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
//     total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),

//     status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED',

//     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

//     CONSTRAINT fk_sales_shop
//         FOREIGN KEY (shop_id)
//         REFERENCES shops(id),

//     CONSTRAINT fk_sales_user
//         FOREIGN KEY (user_id)
//         REFERENCES users(id)
// );