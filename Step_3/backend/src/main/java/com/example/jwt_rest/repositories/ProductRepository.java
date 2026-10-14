package com.example.jwt_rest.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.jwt_rest.models.Product;
import com.example.jwt_rest.projection.ProductSalesReport;
import com.example.jwt_rest.projection.TotalUnitsPerProduct;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrue();

    // it returns the report for all shops combined
    @Query(value = """
        SELECT
            p.id AS productId,
            p.name AS productName,
            SUM(si.quantity) AS unitsSold,
            SUM(si.subtotal) AS revenue
        FROM sale_items si
        JOIN products p
            ON si.product_id = p.id
        GROUP BY p.id, p.name
        ORDER BY revenue DESC
        """, nativeQuery = true)
    List<ProductSalesReport> findProductSalesReport();

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
        """, nativeQuery = true)
    List<ProductSalesReport> findProductSalesReportById(@Param("shopId") Long shopId);

    // returns the top 5 products by units sold for a specific shop
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
    List<ProductSalesReport> findTopProductsUnitsByShop(@Param("shopId") Long shopId);

    // returns the top 5 products by revenue for a specific shop
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
    List<ProductSalesReport> findTopProductsRevenueByShop(@Param("shopId") Long shopId);

    // Not yet used in front end but maybe later with form or pathvariable
    // returns the product sales report for a specific shop within a date range
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
            WHERE s.shop_id = :shopId AND s.created_at >= :startDate AND s.created_at <= :endDate
            GROUP BY p.id, p.name
            ORDER BY revenue DESC
        """, nativeQuery = true)
        List<ProductSalesReport> findProductSalesReportByShopAndDateRange(@Param("shopId") Long shopId, @Param("startDate") String startDate, @Param("endDate") String endDate);

        // Total Units sold for each product across all shops
        @Query (value = """
            SELECT
                p.name,
                SUM(si.quantity) AS units_sold
            FROM sale_items si
            JOIN products p
                ON p.id = si.product_id
            GROUP BY p.id, p.name
            ORDER BY units_sold DESC;
        """, nativeQuery = true)
        List<TotalUnitsPerProduct> findTotalUnitsSoldPerProduct();
}
