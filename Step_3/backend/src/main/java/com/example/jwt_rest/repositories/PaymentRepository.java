package com.example.jwt_rest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.jwt_rest.models.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
}
