package com.example.jwt_rest.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
