package com.example.jwt_rest.repositories;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.jwt_rest.models.Product;
import com.example.jwt_rest.projection.ProductSalesReport;
import com.example.jwt_rest.projection.TopProducts;
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
            WHERE s.shop_id = :shopId 
                AND s.created_at >= CAST(:startDate AS DATE) 
                AND s.created_at < CAST(:endDate AS DATE) + INTERVAL '1 day'
            GROUP BY p.id, p.name
            ORDER BY revenue DESC
        """, nativeQuery = true)  // AND created_at >= CAST(:startDate AS DATE) - Spring can bind the Java LocalDate to PostgreSQL's DATE type.
        List<ProductSalesReport> findProductSalesReportByShopAndDateRange(@Param("shopId") Long shopId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

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


    @Query(value = """
        WITH selected_user AS (
            SELECT id
            FROM users
            WHERE username = 'Alex'
        )
        SELECT
            p.id AS product_id,
            p.name AS product_name,
            SUM(si.quantity) AS units_sold
        FROM selected_user u
        JOIN shops s
            ON s.user_id = u.id
        JOIN sales sa
            ON sa.shop_id = s.id
        JOIN sale_items si
            ON si.sale_id = sa.id
        JOIN products p
            ON p.id = si.product_id
        GROUP BY
            p.id,
            p.name
        ORDER BY
            units_sold DESC,
            p.name ASC
        LIMIT 10;
        """, nativeQuery = true)
    List<TopProducts> findTopProductsByUnitsAllShops(
        @Param("username") String username
    );

    @Query(value = """
        WITH selected_user AS (
            SELECT id
            FROM users
            WHERE username = 'Alex'
        )
        SELECT
            p.id AS product_id,
            p.name AS product_name,
            SUM(si.subtotal) AS total_revenue
        FROM selected_user u
        JOIN shops s
            ON s.user_id = u.id
        JOIN sales sa
            ON sa.shop_id = s.id
        JOIN sale_items si
            ON si.sale_id = sa.id
        JOIN products p
            ON p.id = si.product_id
        GROUP BY
            p.id,
            p.name
        ORDER BY
            total_revenue DESC,
            p.name ASC
        LIMIT 10;
        """, nativeQuery = true)
    List<TopProducts> findTopProductsByRevenueAllShops(
        @Param("username") String username
    );

    @Query(value = """
        WITH selected_user AS (
            SELECT id
            FROM users
            WHERE username = 'Alex'
        ),
        product_sales AS (
            SELECT
                s.id AS shop_id,
                s.name AS shop_name,
                p.id AS product_id,
                p.name AS product_name,
                SUM(si.quantity) AS units_sold
            FROM selected_user u
            JOIN shops s
                ON s.user_id = u.id
            JOIN sales sa
                ON sa.shop_id = s.id
            JOIN sale_items si
                ON si.sale_id = sa.id
            JOIN products p
                ON p.id = si.product_id
            WHERE sa.status = 'COMPLETED'
            GROUP BY
                s.id,
                s.name,
                p.id,
                p.name
        ),
        ranked_products AS (
            SELECT
                *,
                ROW_NUMBER() OVER (
                    PARTITION BY shop_id
                    ORDER BY units_sold DESC, product_name ASC
                ) AS product_rank
            FROM product_sales
        )
        SELECT
            shop_id,
            shop_name,
            product_id,
            product_name,
            units_sold
        FROM ranked_products
        WHERE product_rank <= 10
        ORDER BY
            shop_name,
            product_rank;
        """, nativeQuery = true)
    List<TopProducts> findTopProductsByUnitsPerShop(
        @Param("username") String username
    );

    @Query(value = """
        WITH selected_user AS (
            SELECT id
            FROM users
            WHERE username = 'Alex'
        ),
        product_sales AS (
            SELECT
                s.id AS shop_id,
                s.name AS shop_name,
                p.id AS product_id,
                p.name AS product_name,
                SUM(si.subtotal) AS total_revenue
            FROM selected_user u
            JOIN shops s
                ON s.user_id = u.id
            JOIN sales sa
                ON sa.shop_id = s.id
            JOIN sale_items si
                ON si.sale_id = sa.id
            JOIN products p
                ON p.id = si.product_id
            WHERE sa.status = 'COMPLETED'
            GROUP BY
                s.id,
                s.name,
                p.id,
                p.name
        ),
        ranked_products AS (
            SELECT
                *,
                ROW_NUMBER() OVER (
                    PARTITION BY shop_id
                    ORDER BY total_revenue DESC, product_name ASC
                ) AS product_rank
            FROM product_sales
        )
        SELECT
            shop_id,
            shop_name,
            product_id,
            product_name,
            total_revenue
        FROM ranked_products
        WHERE product_rank <= 10
        ORDER BY
            shop_name,
            product_rank;
        """, nativeQuery = true)
    List<TopProducts> findTopProductsByRevenuePerShop(
        @Param("username") String username
    );
}
