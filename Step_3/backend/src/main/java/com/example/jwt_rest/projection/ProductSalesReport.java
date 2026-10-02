package com.example.jwt_rest.projection;

import java.math.BigDecimal;

// A projection is primarily a way to tell Spring Data what pieces of a query result you want. A DTO is a Java object you intentionally create to carry data between layers, especially to your API.

public interface ProductSalesReport {

    Long getProductId();

    String getProductName();

    Long getUnitsSold();

    BigDecimal getRevenue();
}