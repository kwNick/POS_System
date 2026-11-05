package com.example.jwt_rest.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.jwt_rest.projection.ProductSalesReport;
import com.example.jwt_rest.projection.TopProducts;
import com.example.jwt_rest.projection.TotalUnitsPerProduct;
import com.example.jwt_rest.repositories.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductSalesReport> getProductSalesReport() {
        return productRepository.findProductSalesReport();
    }

    public List<ProductSalesReport> getProductSalesReportById(Long shopId) {
        return productRepository.findProductSalesReportById(shopId);
    }

    public List<ProductSalesReport> getTopProductsUnitsByShop(Long shopId) {
        return productRepository.findTopProductsUnitsByShop(shopId);
    }

    public List<ProductSalesReport> getTopProductsRevenueByShop(Long shopId) {
        return productRepository.findTopProductsRevenueByShop(shopId);
    }

    // Not yet used in front end but maybe later with form or pathvariable
    public List<ProductSalesReport> getProductSalesReportByShopAndDateRange(Long shopId, LocalDate startDate, LocalDate endDate, String orderBy) {
        return productRepository.findProductSalesReportByShopAndDateRange(shopId, startDate, endDate, orderBy);
    }

    public List<TotalUnitsPerProduct> getTotalUnitsSoldPerProduct() {
        return productRepository.findTotalUnitsSoldPerProduct();
    }

    // Top Products by units sold and revenue for a specific shop and all shops
    
    public List<TopProducts> getTopProductsByUnitsPerShop(String username) {
        return productRepository.findTopProductsByUnitsPerShop(username);
    }

    public List<TopProducts> getTopProductsByRevenuePerShop(String username) {
        return productRepository.findTopProductsByRevenuePerShop(username);
    }

    public List<TopProducts> getTopProductsByUnitsAllShops(String username) {
        return productRepository.findTopProductsByUnitsAllShops(username);
    }

    public List<TopProducts> getTopProductsByRevenueAllShops(String username) {
        return productRepository.findTopProductsByRevenueAllShops(username);
    }
}