package com.example.jwt_rest.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/sales-report")
    public List<ProductSalesReport> getProductSalesReport() {
        return productService.getProductSalesReport();
    }

    @GetMapping("/{shopId}/sales-report")
    public List<ProductSalesReport> getProductSalesReportById(@PathVariable Long shopId) {
        return productService.getProductSalesReportById(shopId);
    }

    @GetMapping("/{shopId}/reports/top-products-units")
    public List<ProductSalesReport> getTopProductsUnits(@PathVariable Long shopId) {
        return productService.getTopProductsUnitsByShop(shopId);
    }

    @GetMapping("/{shopId}/reports/top-products-revenue")
    public List<ProductSalesReport> getTopProductsRevenue(@PathVariable Long shopId) {
        return productService.getTopProductsRevenueByShop(shopId);
    }

    // Not yet used in front end but maybe with form, either dates are path variables or form fields
    @GetMapping("/{shopId}/reports/top-products-revenue/{startDate}/{endDate}")
    public List<ProductSalesReport> getProductSalesReportByShopAndDateRange(@PathVariable Long shopId, @PathVariable LocalDate startDate, @PathVariable LocalDate endDate, @RequestParam(required = false, defaultValue = "revenue") String orderBy) {
        return productService.getProductSalesReportByShopAndDateRange(shopId, startDate, endDate, orderBy);
    }

    // @GetMapping ("/{shopId}/reports/top-products-units-per-shop/{startDate}/{endDate}")

    // @GetMapping ("/{shopId}/reports/top-products-revenue-per-shop/{startDate}/{endDate}")

    // top 10 products by units sold for a all shops
    
    // top 10 products by revenue for a all shops

    // top 10 products by units sold for a specific shop

    // top 10 products by revenue for a specific shop
}