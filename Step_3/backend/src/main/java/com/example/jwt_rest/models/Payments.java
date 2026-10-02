package com.example.jwt_rest.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "payments")
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sale_id", nullable = false)
    private Long sale_id;

    @Column(name = "payment_method", nullable = false, length = 30)
    private String payment_method;

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private java.math.BigDecimal amount;

    @Column(name = "status", nullable = false, length = 30, defaultValue = "COMPLETED")
    private String status;
 
    @Column(name = "transaction_reference", length = 150)
    private String transaction_reference;

    @Column(name = "created_at", nullable = false, updatable = false)
    private java.time.Timestamp created_at;

}

// CREATE TABLE payments (
//     id BIGSERIAL PRIMARY KEY,

//     sale_id BIGINT NOT NULL,

//     payment_method VARCHAR(30) NOT NULL,
//     amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),

//     status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED',

//     transaction_reference VARCHAR(150),

//     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

//     CONSTRAINT fk_payments_sale
//         FOREIGN KEY (sale_id)
//         REFERENCES sales(id)
//         ON DELETE CASCADE
// );