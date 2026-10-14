package com.example.jwt_rest.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.jwt_rest.models.Sale;
import com.example.jwt_rest.projection.SalesUserReport;
import com.example.jwt_rest.projection.DailyRevenue;

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
            SELECT AVG(total) AS average_sale
            FROM sales
            WHERE shop_id = :shopId
        """, nativeQuery = true)
    List<Double> findAverageSaleByShopId(Long shopId);
}
