package com.example.jwt_rest.services;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.jwt_rest.projection.SalesUserReport;
import com.example.jwt_rest.projection.DailyRevenue;
import com.example.jwt_rest.projection.SalesSummary;
import com.example.jwt_rest.repositories.SaleRepository;

@Service
public class SaleService {
    private final SaleRepository saleRepository;
    public SaleService(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    public List<SalesUserReport> findAllSales() {
        return saleRepository.findAllSales();
    }

    public List<DailyRevenue> findDailyRevenue() {
        return saleRepository.findDailyRevenue();
    }

    public List<Double> findAverageSaleByShopId(Long shopId) {
        return saleRepository.findAverageSaleByShopId(shopId);
    }

    public SalesSummary findSalesSummaryByShopAndDateRange(Long shopId, LocalDate startDate, LocalDate endDate) {
        return saleRepository.findSalesSummaryByShopAndDateRange(shopId, startDate, endDate);
    }
};
