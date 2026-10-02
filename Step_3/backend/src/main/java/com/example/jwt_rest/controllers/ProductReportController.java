package com.example.jwt_rest.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwt_rest.projection.ProductSalesReport;
import com.example.jwt_rest.services.ProductService;

@RestController
@RequestMapping("/api/shops")
public class ProductReportController {

    private final ProductService productService;

    public ProductReportController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{shopId}/reports/top-products-units")
    public List<ProductSalesReport> getTopProductsUnits(
            @PathVariable Long shopId) {

        return productService.getTopProductsUnitsByShop(shopId);
    }

    @GetMapping("/{shopId}/reports/top-products-revenue")
    public List<ProductSalesReport> getTopProductsRevenue(
            @PathVariable Long shopId) {

        return productService.getTopProductsRevenueByShop(shopId);
    }
}