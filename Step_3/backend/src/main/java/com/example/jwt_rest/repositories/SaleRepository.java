package com.example.jwt_rest.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.jwt_rest.models.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {

}
