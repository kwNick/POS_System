package com.example.jwt_rest.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.jwt_rest.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrue();

    @Query(value = """
        SELECT
            p.name,
            SUM(si.quantity) AS units_sold,
            SUM(si.subtotal) AS revenue
        FROM sale_items si
        JOIN products p
            ON si.product_id = p.id
        GROUP BY p.id, p.name
        ORDER BY revenue DESC
        """, nativeQuery = true)
    List<Object[]> findProductSalesReport();
}
