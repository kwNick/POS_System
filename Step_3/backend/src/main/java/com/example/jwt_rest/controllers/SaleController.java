package com.example.jwt_rest.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import com.example.jwt_rest.projection.DailyRevenue;
import com.example.jwt_rest.projection.SalesUserReport;
import com.example.jwt_rest.services.SaleService;

@RestController
@RequestMapping("/api/sales")
public class SaleController {
    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping("/all-sales")
    public List<SalesUserReport> findAllSales() {
        return saleService.findAllSales();
    }

    @GetMapping("/daily-revenue")
    public List<DailyRevenue> findDailyRevenue() {
        return saleService.findDailyRevenue();
    }

    @GetMapping("/{shopId}/average-sale")
    public List<Double> findAverageSaleByShopId(@PathVariable Long shopId) {
        return saleService.findAverageSaleByShopId(shopId);
    }
}