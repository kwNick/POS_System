package com.example.jwt_rest.projection;

import java.math.BigDecimal;

public interface ChartData {
    Integer getPointNumber(); // For chart fetch

    String getDate(); // For chart fetch

    Long getTotalTransactions();

    BigDecimal getTotalRevenue();

    BigDecimal getAverageSale();

    BigDecimal getTotalTax();

    BigDecimal getAvgTaxPerSale();
    
    Long getUnitsSold();

    String getEmployeeSalesSummary();
}
