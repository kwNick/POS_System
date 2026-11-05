package com.example.jwt_rest.projection;

import java.math.BigDecimal;

public interface TopProducts {
    Long getShopId();

    String getShopName();

    Long getProductId();

    String getProductName();

    Long getUnitsSold();

    BigDecimal getTotalRevenue();
}
