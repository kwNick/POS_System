package com.example.jwt_rest.projection;

import java.math.BigDecimal;

public interface SalesSummary {
    Long getTotalTransactions();

    BigDecimal getTotalRevenue();

    BigDecimal getAverageSale();
    
    Long getUnitsSold();
}
