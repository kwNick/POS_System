package com.example.jwt_rest.projection;

import java.math.BigDecimal;

// A projection is primarily a way to tell Spring Data what pieces of a query result you want. A DTO is a Java object you intentionally create to carry data between layers, especially to your API.

public interface ProductSalesReport {

    Long getProductId();

    String getProductName();

    Long getUnitsSold();

    BigDecimal getRevenue();
}

// Comparison
// 
// Feature	                     |  @Data class	                |   Interface projection	             |     Record
// Example	                     |   AuthRequest	            |    ProductSalesReport	                 |      UserDataResponse
// Defines fields	             |   Yes	                    |    No	                                 |      Yes, as components
// Can be instantiated directly	 |   Yes	                    |    No, not as an interface	         |      Yes
// Mutable	                     |   Usually yes	            |    Depends on implementation	         |      Components cannot be reassigned
// Typical purpose	             |   Request/response DTO	    |    Reading selected database columns	 |      Request/response DTO
// Accessors	                 |   getUsername()	            |    getRevenue()	                     |      userData()