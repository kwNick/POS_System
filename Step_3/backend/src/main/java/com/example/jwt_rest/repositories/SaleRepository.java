package com.example.jwt_rest.repositories;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.jwt_rest.models.Sale;
import com.example.jwt_rest.projection.SalesUserReport;
import com.example.jwt_rest.projection.ChartData;
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

    @Query (value = """
        WITH period_bounds AS (
            SELECT
                CAST(:shopId AS BIGINT) AS shop_id,
                CURRENT_DATE AS end_date,

                CASE
                    WHEN :period = '1M'
                        THEN (CURRENT_DATE - INTERVAL '1 month')::date
                    WHEN :period = '3M'
                        THEN (CURRENT_DATE - INTERVAL '3 months')::date
                    WHEN :period = '6M'
                        THEN (CURRENT_DATE - INTERVAL '6 months')::date
                    WHEN :period = '1Y'
                        THEN (CURRENT_DATE - INTERVAL '1 year')::date
                    WHEN :period = 'ALL'
                        THEN COALESCE(
                            (
                                SELECT MIN(s.created_at)::date
                                FROM sales s
                                WHERE s.shop_id = CAST(:shopId AS BIGINT)
                            ),
                            CURRENT_DATE
                        )
                END AS start_date

        ),

        -- Calculate the total number of days
        period_info AS (
            SELECT
                *,
                (end_date - start_date + 1) AS total_days
            FROM period_bounds
        ),
        -- Generate 10 interval numbers: 0 through 9
        bucket_numbers AS (
            SELECT generate_series(0, 9) AS point_number
        ),
        -- Calculate the start and end date for each interval
        buckets AS (
            SELECT
                bn.point_number,
                pi.shop_id,
                (
                    pi.start_date +
                    ((bn.point_number * pi.total_days) / 10)
                ) AS bucket_start,
                (
                    pi.start_date +
                    (((bn.point_number + 1) * pi.total_days) / 10)
                ) AS bucket_end_exclusive
            FROM bucket_numbers bn
            CROSS JOIN period_info pi
        ),

        -- Find the sales belonging to each interval
        bucket_sales AS (
            SELECT
                b.point_number,
                s.*
            FROM buckets b
            JOIN sales s
                ON s.shop_id = b.shop_id
                AND s.created_at >= b.bucket_start
                AND s.created_at < b.bucket_end_exclusive
        ),

        -- Calculate sales-level analytics
        sales_metrics AS (
            SELECT
                b.point_number,
                COUNT(bs.id) AS "totalTransactions",
                COALESCE(SUM(bs.subtotal), 0) AS "totalRevenue",
                COALESCE(AVG(bs.subtotal), 0) AS "averageSale",
                COALESCE(SUM(bs.tax), 0) AS "totalTax",
                COALESCE(AVG(bs.tax), 0) AS "avgTaxPerSale"
            FROM buckets b
            LEFT JOIN bucket_sales bs
                ON bs.point_number = b.point_number
            GROUP BY b.point_number
        ),

        -- Calculate units sold for each interval
        items_metrics AS (
            SELECT
                b.point_number,
                COALESCE(SUM(si.quantity), 0) AS "unitsSold"
            FROM buckets b
            LEFT JOIN bucket_sales bs
                ON bs.point_number = b.point_number
            LEFT JOIN sale_items si
                ON si.sale_id = bs.id
            GROUP BY b.point_number
        ),

        -- Calculate individual employee performance
        employee_metrics AS (
            SELECT
                bs.point_number,
                e.id AS "employeeId",
                CONCAT_WS(
                    ' ',
                    e.first_name,
                    e.last_name
                ) AS "employeeName",
                COUNT(*) AS "totalTransactions",
                COALESCE(SUM(bs.subtotal), 0) AS "totalRevenue",
                COALESCE(AVG(bs.subtotal), 0) AS "averageSale"
            FROM bucket_sales bs
            JOIN employees e
                ON e.id = bs.employee_id
            GROUP BY
                bs.point_number,
                e.id,
                e.first_name,
                e.last_name
        ),

        -- Combine employees into a JSON array for each interval
        employee_summary AS (
            SELECT
                point_number,
                jsonb_agg(
                    jsonb_build_object(
                        'employeeId', "employeeId",
                        'employeeName', "employeeName",
                        'totalTransactions', "totalTransactions",
                        'totalRevenue', "totalRevenue",
                        'averageSale', "averageSale"
                    )
                    ORDER BY "totalRevenue" DESC
                ) AS "employeeSalesSummary"
            FROM employee_metrics
            GROUP BY point_number
        )

        -- Return all 10 chart points
        SELECT
            b.point_number AS "pointNumber",
            TO_CHAR(b.bucket_start, 'Mon DD') ||
            ' - ' ||
            TO_CHAR(
                b.bucket_end_exclusive - 1,
                'Mon DD'
            ) AS date,
            sm."totalTransactions",
            sm."totalRevenue",
            sm."averageSale",
            sm."totalTax",
            sm."avgTaxPerSale",
            im."unitsSold",
            COALESCE(
                es."employeeSalesSummary",
                '[]'::jsonb
            ) AS "employeeSalesSummary"
        FROM buckets b
        JOIN sales_metrics sm
            ON sm.point_number = b.point_number
        JOIN items_metrics im
            ON im.point_number = b.point_number
        LEFT JOIN employee_summary es
            ON es.point_number = b.point_number
        ORDER BY b.point_number;

        """, nativeQuery = true)
    List<ChartData> findSalesSummaryByShopAndPeriod(@Param("shopId") Long shopId, @Param("period") String period);
    
    @Query (value = """
        WITH user_shops AS (
            SELECT id AS shop_id
            FROM shops
            WHERE user_id = CAST(:userId AS BIGINT)
        ),

        period_bounds AS (
            SELECT
                CURRENT_DATE AS end_date,
                CASE
                    WHEN :period = '1M'
                        THEN (CURRENT_DATE - INTERVAL '1 month')::date
                    WHEN :period = '3M'
                        THEN (CURRENT_DATE - INTERVAL '3 months')::date
                    WHEN :period = '6M'
                        THEN (CURRENT_DATE - INTERVAL '6 months')::date
                    WHEN :period = '1Y'
                        THEN (CURRENT_DATE - INTERVAL '1 year')::date
                    WHEN :period = 'ALL'
                        THEN COALESCE(
                            (
                                SELECT MIN(s.created_at)::date
                                FROM sales s
                                JOIN user_shops us ON us.shop_id = s.shop_id
                            ),
                            CURRENT_DATE
                        )
                END AS start_date
        ),

        period_info AS (
            SELECT
                *,
                (end_date - start_date + 1) AS total_days
            FROM period_bounds
        ),

        bucket_numbers AS (
            SELECT generate_series(0, 9) AS point_number
        ),

        buckets AS (
            SELECT
                bn.point_number,
                pi.start_date +
                    ((bn.point_number * pi.total_days) / 10) AS bucket_start,
                pi.start_date +
                    (((bn.point_number + 1) * pi.total_days) / 10)
                    AS bucket_end_exclusive
            FROM bucket_numbers bn
            CROSS JOIN period_info pi
        ),

        bucket_sales AS (
            SELECT
                b.point_number,
                s.*
            FROM buckets b
            JOIN sales s
                ON s.created_at >= b.bucket_start
                AND s.created_at < b.bucket_end_exclusive
            JOIN user_shops us
                ON us.shop_id = s.shop_id
        ),

        sales_metrics AS (
            SELECT
                b.point_number,
                COUNT(bs.id) AS "totalTransactions",
                COALESCE(SUM(bs.subtotal), 0) AS "totalRevenue",
                COALESCE(AVG(bs.subtotal), 0) AS "averageSale",
                COALESCE(SUM(bs.tax), 0) AS "totalTax",
                COALESCE(AVG(bs.tax), 0) AS "avgTaxPerSale"
            FROM buckets b
            LEFT JOIN bucket_sales bs
                ON bs.point_number = b.point_number
            GROUP BY b.point_number
        ),

        items_metrics AS (
            SELECT
                b.point_number,
                COALESCE(SUM(si.quantity), 0) AS "unitsSold"
            FROM buckets b
            LEFT JOIN bucket_sales bs
                ON bs.point_number = b.point_number
            LEFT JOIN sale_items si
                ON si.sale_id = bs.id
            GROUP BY b.point_number
        ),

        employee_metrics AS (
            SELECT
                bs.point_number,
                e.id AS "employeeId",
                CONCAT_WS(' ', e.first_name, e.last_name) AS "employeeName",
                COUNT(*) AS "totalTransactions",
                COALESCE(SUM(bs.subtotal), 0) AS "totalRevenue",
                COALESCE(AVG(bs.subtotal), 0) AS "averageSale"
            FROM bucket_sales bs
            JOIN employees e
                ON e.id = bs.employee_id
            GROUP BY
                bs.point_number,
                e.id,
                e.first_name,
                e.last_name
        ),

        employee_summary AS (
            SELECT
                point_number,
                jsonb_agg(
                    jsonb_build_object(
                        'employeeId', "employeeId",
                        'employeeName', "employeeName",
                        'totalTransactions', "totalTransactions",
                        'totalRevenue', "totalRevenue",
                        'averageSale', "averageSale"
                    )
                    ORDER BY "totalRevenue" DESC
                ) AS "employeeSalesSummary"
            FROM employee_metrics
            GROUP BY point_number
        )

        SELECT
            b.point_number AS "pointNumber",
            TO_CHAR(b.bucket_start, 'Mon DD') ||
                ' - ' ||
                TO_CHAR(b.bucket_end_exclusive - 1, 'Mon DD') AS date,
            sm."totalTransactions",
            sm."totalRevenue",
            sm."averageSale",
            sm."totalTax",
            sm."avgTaxPerSale",
            im."unitsSold",
            COALESCE(es."employeeSalesSummary", '[]'::jsonb)
                AS "employeeSalesSummary"
        FROM buckets b
        JOIN sales_metrics sm
            ON sm.point_number = b.point_number
        JOIN items_metrics im
            ON im.point_number = b.point_number
        LEFT JOIN employee_summary es
            ON es.point_number = b.point_number
        ORDER BY b.point_number;
        """, nativeQuery = true)
    List<ChartData> findSalesSummaryTotalAndPeriod(@Param("userId") Long userId, @Param("period") String period);
    
    @Query (value = """
        WITH user_shops AS (
            SELECT
                id AS shop_id,
                name AS shop_name
            FROM shops
            WHERE user_id = CAST(:userId AS BIGINT)
        ),

        -- Create one overall series plus one series per shop.
        chart_series AS (
            SELECT
                'TOTAL' AS "seriesType",
                'TOTAL' AS "seriesKey",
                NULL::BIGINT AS shop_id,
                'All Shops' AS "seriesName"
            UNION ALL
            SELECT
                'SHOP' AS "seriesType",
                'SHOP:' || shop_id AS "seriesKey",
                shop_id,
                shop_name AS "seriesName"
            FROM user_shops
        ),

        period_bounds AS (
            SELECT
                cs.*,
                CURRENT_DATE AS end_date,
                CASE
                    WHEN :period = '1M'
                        THEN (CURRENT_DATE - INTERVAL '1 month')::date
                    WHEN :period = '3M'
                        THEN (CURRENT_DATE - INTERVAL '3 months')::date
                    WHEN :period = '6M'
                        THEN (CURRENT_DATE - INTERVAL '6 months')::date
                    WHEN :period = '1Y'
                        THEN (CURRENT_DATE - INTERVAL '1 year')::date
                    WHEN :period = 'ALL'
                        THEN COALESCE(
                            (
                                SELECT MIN(s.created_at)::date
                                FROM sales s
                                JOIN user_shops us
                                    ON us.shop_id = s.shop_id
                                WHERE cs.shop_id IS NULL
                                OR s.shop_id = cs.shop_id
                            ),
                            CURRENT_DATE
                        )
                END AS start_date
            FROM chart_series cs
        ),

        period_info AS (
            SELECT
                *,
                (end_date - start_date + 1) AS total_days
            FROM period_bounds
        ),

        bucket_numbers AS (
            SELECT generate_series(0, 9) AS point_number
        ),

        buckets AS (
            SELECT
                pi."seriesType",
                pi."seriesKey",
                pi.shop_id,
                pi."seriesName",
                bn.point_number,
                pi.start_date +
                    ((bn.point_number * pi.total_days) / 10)
                    AS bucket_start,
                pi.start_date +
                    (((bn.point_number + 1) * pi.total_days) / 10)
                    AS bucket_end_exclusive
            FROM period_info pi
            CROSS JOIN bucket_numbers bn
        ),

        -- A TOTAL series includes every user shop.
        -- A SHOP series includes only that individual shop.
        bucket_sales AS (
            SELECT
                b."seriesKey",
                b."seriesType",
                b.shop_id AS series_shop_id,
                b."seriesName",
                b.point_number,
                s.*
            FROM buckets b
            JOIN user_shops us
                ON b.shop_id IS NULL
                OR us.shop_id = b.shop_id
            JOIN sales s
                ON s.shop_id = us.shop_id
                AND s.created_at >= b.bucket_start
                AND s.created_at < b.bucket_end_exclusive
        ),

        sales_metrics AS (
            SELECT
                b."seriesKey",
                b.point_number,
                COUNT(bs.id) AS "totalTransactions",
                COALESCE(SUM(bs.subtotal), 0) AS "totalRevenue",
                COALESCE(AVG(bs.subtotal), 0) AS "averageSale",
                COALESCE(SUM(bs.tax), 0) AS "totalTax",
                COALESCE(AVG(bs.tax), 0) AS "avgTaxPerSale"
            FROM buckets b
            LEFT JOIN bucket_sales bs
                ON bs."seriesKey" = b."seriesKey"
                AND bs.point_number = b.point_number
            GROUP BY b."seriesKey", b.point_number
        ),

        items_metrics AS (
            SELECT
                b."seriesKey",
                b.point_number,
                COALESCE(SUM(si.quantity), 0) AS "unitsSold"
            FROM buckets b
            LEFT JOIN bucket_sales bs
                ON bs."seriesKey" = b."seriesKey"
                AND bs.point_number = b.point_number
            LEFT JOIN sale_items si
                ON si.sale_id = bs.id
            GROUP BY b."seriesKey", b.point_number
        ),

        employee_metrics AS (
            SELECT
                bs."seriesKey",
                bs.point_number,
                e.id AS "employeeId",
                CONCAT_WS(
                    ' ',
                    e.first_name,
                    e.last_name
                ) AS "employeeName",
                COUNT(*) AS "totalTransactions",
                COALESCE(SUM(bs.subtotal), 0) AS "totalRevenue",
                COALESCE(AVG(bs.subtotal), 0) AS "averageSale"
            FROM bucket_sales bs
            JOIN employees e
                ON e.id = bs.employee_id

            GROUP BY
                bs."seriesKey",
                bs.point_number,
                e.id,
                e.first_name,
                e.last_name
        ),

        employee_summary AS (
            SELECT
                "seriesKey",
                point_number,
                jsonb_agg(
                    jsonb_build_object(
                        'employeeId', "employeeId",
                        'employeeName', "employeeName",
                        'totalTransactions', "totalTransactions",
                        'totalRevenue', "totalRevenue",
                        'averageSale', "averageSale"
                    )
                    ORDER BY "totalRevenue" DESC
                ) AS "employeeSalesSummary"

            FROM employee_metrics
            GROUP BY "seriesKey", point_number
        )

        SELECT
            b."seriesType",
            b."seriesKey",
            b.shop_id AS "shopId",
            b."seriesName",
            b.point_number AS "pointNumber",
            TO_CHAR(b.bucket_start, 'Mon DD') ||
                ' - ' ||
                TO_CHAR(b.bucket_end_exclusive - 1, 'Mon DD') AS date,
            sm."totalTransactions",
            sm."totalRevenue",
            sm."averageSale",
            sm."totalTax",
            sm."avgTaxPerSale",
            im."unitsSold",
            COALESCE(
                es."employeeSalesSummary",
                '[]'::jsonb
            ) AS "employeeSalesSummary"
        FROM buckets b
        JOIN sales_metrics sm
            ON sm."seriesKey" = b."seriesKey"
            AND sm.point_number = b.point_number
        JOIN items_metrics im
            ON im."seriesKey" = b."seriesKey"
            AND im.point_number = b.point_number
        LEFT JOIN employee_summary es
            ON es."seriesKey" = b."seriesKey"
            AND es.point_number = b.point_number
        ORDER BY
            CASE WHEN b."seriesType" = 'TOTAL' THEN 0 ELSE 1 END,
            b.shop_id,
            b.point_number;
    """, nativeQuery = true)
    List<ChartData> findSalesSummaryTotalAllShopsAndPeriod(@Param("userId") Long userId, @Param("period") String period);
};