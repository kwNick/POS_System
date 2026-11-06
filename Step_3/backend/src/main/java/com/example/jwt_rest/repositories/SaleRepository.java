package com.example.jwt_rest.repositories;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.jwt_rest.models.Sale;
import com.example.jwt_rest.projection.SalesUserReport;
import com.example.jwt_rest.projection.DailyRevenue;
import com.example.jwt_rest.projection.SalesSummary;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Query(value = """
            SELECT
            s.id AS sale_id,
            u.username,
            s.subtotal,
            s.tax,
            s.total,
            s.created_at
        FROM sales s
        JOIN users u
            ON s.user_id = u.id
        ORDER BY s.created_at DESC
        """, nativeQuery = true)
    List<SalesUserReport> findAllSales();

    @Query(value = """
            SELECT
                DATE(created_at) AS sale_date,
                SUM(total) AS revenue
            FROM sales
            GROUP BY DATE(created_at)
            ORDER BY sale_date;
        """, nativeQuery = true)
    List<DailyRevenue> findDailyRevenue();

    // Not yet used in front end
    @Query (value = """
            SELECT
                DATE(created_at) AS sale_date,
                SUM(total) AS revenue
            FROM sales
            WHERE shop_id = :shopId
            GROUP BY DATE(created_at)
            ORDER BY sale_date;
        """, nativeQuery = true)
    List<DailyRevenue> findDailyRevenueByShopId(Long shopId);

    @Query (value = """
            SELECT AVG(subtotal) AS average_sale
            FROM sales
            WHERE shop_id = :shopId
        """, nativeQuery = true)
    List<Double> findAverageSaleByShopId(Long shopId);

    @Query (value = """
            SELECT
                (
                    SELECT COUNT(*)
                    FROM sales s
                    WHERE s.shop_id = :shopId
                    AND s.created_at >= CAST(:startDate AS DATE)
                    AND s.created_at < CAST(:endDate AS DATE) + INTERVAL '1 day'
                ) AS totalTransactions,
                (
                    SELECT COALESCE(SUM(s.subtotal), 0)
                    FROM sales s
                    WHERE s.shop_id = :shopId
                    AND s.created_at >= CAST(:startDate AS DATE)
                    AND s.created_at < CAST(:endDate AS DATE) + INTERVAL '1 day'
                ) AS totalRevenue,
                (
                    SELECT COALESCE(AVG(s.subtotal), 0)
                    FROM sales s
                    WHERE s.shop_id = :shopId
                    AND s.created_at >= CAST(:startDate AS DATE)
                    AND s.created_at < CAST(:endDate AS DATE) + INTERVAL '1 day'
                ) AS averageSale,
                (
                    SELECT COALESCE(SUM(s.tax),0)
                    FROM sales s
                    WHERE s.shop_id = :shopId
                    AND s.created_at >= CAST(:startDate AS DATE)
                    AND s.created_at < CAST(:endDate AS DATE) + INTERVAL '1 day'
                ) AS totalTax,
                (
                    SELECT COALESCE(AVG(s.tax), 0)
                    FROM sales s
                    WHERE s.shop_id = :shopId
                    AND s.created_at >= CAST(:startDate AS DATE)
                    AND s.created_at < CAST(:endDate AS DATE) + INTERVAL '1 day'
                ) AS avgTaxPerSale,
                (
                    SELECT COALESCE(SUM(si.quantity), 0)
                    FROM sales s
                    JOIN sale_items si ON si.sale_id = s.id
                    WHERE s.shop_id = :shopId
                    AND s.created_at >= CAST(:startDate AS DATE)
                    AND s.created_at < CAST(:endDate AS DATE) + INTERVAL '1 day'
                ) AS unitsSold,
                (
        SELECT COALESCE(
            jsonb_agg(
                jsonb_build_object(
                    'employeeId', employeeId,
                    'employeeName', employeeName,
                    'totalTransactions', totalTransactions,
                    'totalRevenue', totalRevenue,
                    'averageSale', averageSale
                )
                ORDER BY totalRevenue DESC
            ),
            '[]'::jsonb
        )
        FROM (
            SELECT
                e.id AS employeeId,
                CONCAT(e.first_name, ' ', e.last_name) AS employeeName,
                COUNT(*) AS totalTransactions,
                COALESCE(SUM(s.subtotal), 0) AS totalRevenue,
                COALESCE(AVG(s.subtotal), 0) AS averageSale
            FROM sales s
            JOIN employees e ON s.employee_id = e.id
            WHERE s.shop_id = 1
            AND s.created_at >= CAST('2026-01-01' AS DATE)
            AND s.created_at < CAST('2026-12-31' AS DATE) + INTERVAL '1 day'
            GROUP BY e.id, e.first_name, e.last_name
        ) employee_summary
    ) AS "employeeSalesSummary"
                
        """, nativeQuery = true)
    SalesSummary findSalesSummaryByShopAndDateRange(@Param("shopId") Long shopId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
};