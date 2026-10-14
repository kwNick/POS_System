package com.example.jwt_rest.projection;

public interface SalesUserReport {
    Long getSaleId();
    String getUsername();
    Double getSubtotal();
    Double getTax();
    Double getTotal();
    String getCreatedAt();
}
