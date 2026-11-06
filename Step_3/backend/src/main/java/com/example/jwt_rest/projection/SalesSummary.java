package com.example.jwt_rest.projection;

import java.math.BigDecimal;

public interface SalesSummary {
    // Integer getPointNumber(); // For chart fetch

    // String getDate(); // For chart fetch

    Long getTotalTransactions();

    BigDecimal getTotalRevenue();

    BigDecimal getAverageSale();

    BigDecimal getTotalTax();

    BigDecimal getAvgTaxPerSale();
    
    Long getUnitsSold();

    String getEmployeeSalesSummary();
    // Object getEmployee(); // This is a placeholder for the employee field, which can be of any type (e.g., String, Long, etc.) depending on your requirements.
};