package com.example.jwt_rest.controllers;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwt_rest.projection.TopProducts;
import com.example.jwt_rest.projection.TotalUnitsPerProduct;
import com.example.jwt_rest.services.ProductService;

@RestController 
@RequestMapping ("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/total-units-sold")
    public List<TotalUnitsPerProduct> getTotalUnitsSoldPerProduct() {
        return productService.getTotalUnitsSoldPerProduct();
    }

    // Top Products by units sold and revenue for a specific shop and all shops

    @GetMapping("/top-by-units-per-shop")
    public List<TopProducts> topProductsByUnitsPerShop(@AuthenticationPrincipal UserDetails user) {
        return productService.getTopProductsByUnitsPerShop(user.getUsername());
    }

    @GetMapping("/top-by-revenue-per-shop")
    public List<TopProducts> topProductsByRevenuePerShop(@AuthenticationPrincipal UserDetails user) {
        return productService.getTopProductsByRevenuePerShop(user.getUsername());
    }

    @GetMapping("/top-by-units-all-shops")
    public List<TopProducts> topProductsByUnitsAllShops(@AuthenticationPrincipal UserDetails user) {
        return productService.getTopProductsByUnitsAllShops(user.getUsername());
    }

    @GetMapping("/top-by-revenue-all-shops")
    public List<TopProducts> topProductsByRevenueAllShops(@AuthenticationPrincipal UserDetails user) {
        return productService.getTopProductsByRevenueAllShops(user.getUsername());
    }
}
