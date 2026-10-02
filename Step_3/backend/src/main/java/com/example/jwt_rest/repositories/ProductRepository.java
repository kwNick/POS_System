package com.example.jwt_rest.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.jwt_rest.models.Product;
import com.example.jwt_rest.projection.ProductSalesReport;

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

    @Query(value = """
        SELECT
            p.id AS productId,
            p.name AS productName,
            SUM(si.quantity) AS unitsSold,
            SUM(si.subtotal) AS revenue
        FROM sale_items si
        JOIN products p
            ON si.product_id = p.id
        JOIN sales s
            ON si.sale_id = s.id
        WHERE s.shop_id = :shopId
        GROUP BY p.id, p.name
        ORDER BY unitsSold DESC
        LIMIT 5
        """, nativeQuery = true)
    List<ProductSalesReport> findTopProductsUnitsByShop(
        @Param("shopId") Long shopId
    );

    @Query(value = """
        SELECT
            p.id AS productId,
            p.name AS productName,
            SUM(si.quantity) AS unitsSold,
            SUM(si.subtotal) AS revenue
        FROM sale_items si
        JOIN products p
            ON si.product_id = p.id
        JOIN sales s
            ON si.sale_id = s.id
        WHERE s.shop_id = :shopId
        GROUP BY p.id, p.name
        ORDER BY revenue DESC
        LIMIT 5
        """, nativeQuery = true)
    List<ProductSalesReport> findTopProductsRevenueByShop(
        @Param("shopId") Long shopId
    );
}
