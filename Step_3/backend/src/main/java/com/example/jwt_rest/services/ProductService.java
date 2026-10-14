package com.example.jwt_rest.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.jwt_rest.projection.ProductSalesReport;
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
    public List<ProductSalesReport> getProductSalesReportByShopAndDateRange(Long shopId, String startDate, String endDate) {
        return productRepository.findProductSalesReportByShopAndDateRange(shopId, startDate, endDate);
    }

    public List<TotalUnitsPerProduct> getTotalUnitsSoldPerProduct() {
        return productRepository.findTotalUnitsSoldPerProduct();
    }
}