package com.example.jwt_rest.projection;

public interface EmployeeSalesSummary {
    Long getEmployeeId();
    String getEmployeeName();
    Long getTotalTransactions();
    Double getTotalRevenue();
    Double getAverageSale();

};
