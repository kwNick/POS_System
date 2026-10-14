package com.example.jwt_rest.projection;

public interface DailyRevenue {
    java.time.LocalDate getSaleDate();
    double getRevenue();
}
