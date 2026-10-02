package com.example.jwt_rest.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.jwt_rest.models.SaleItem;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {
    List<SaleItem> findBySaleId(Long saleId);
}
