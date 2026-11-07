package com.example.jwt_rest.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.List;

import com.example.jwt_rest.projection.ChartData;
import com.example.jwt_rest.projection.DailyRevenue;
import com.example.jwt_rest.projection.SalesSummary;
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

    @GetMapping ("/{shopId}/sales-summary/{startDate}/{endDate}")
    public SalesSummary findSalesSummaryByShopAndDateRange(@PathVariable Long shopId, @PathVariable LocalDate startDate, @PathVariable LocalDate endDate) {
        return saleService.findSalesSummaryByShopAndDateRange(shopId, startDate, endDate);
    }

    @GetMapping ("/{shopId}/sales-summary/{period}")
    public List<ChartData> findSalesSummaryByShopAndPeriod(@PathVariable Long shopId, @PathVariable String period) {
        return saleService.findSalesSummaryByShopAndPeriod(shopId, period);
    }

    @GetMapping ("/total-sales-summary/{userId}/{period}")
    public List<ChartData> findSalesSummaryTotalAndPeriod(@PathVariable Long userId, @PathVariable String period) {
        return saleService.findSalesSummaryTotalAndPeriod(userId, period);
    }

    @GetMapping ("/total-allshops-sales-summary/{userId}/{period}")
    public List<ChartData> findSalesSummaryTotalAllShopsAndPeriod(@PathVariable Long userId, @PathVariable String period) {
        return saleService.findSalesSummaryTotalAllShopsAndPeriod(userId, period);
    }
}