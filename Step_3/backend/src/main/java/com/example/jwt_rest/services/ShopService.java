package com.example.jwt_rest.services;

import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.example.jwt_rest.dtos.ShopAddRequest;
import com.example.jwt_rest.models.Shop;
import com.example.jwt_rest.models.User;
import com.example.jwt_rest.repositories.ShopRepository;

@Service
public class ShopService {
    private final ShopRepository shopRepo;

    public ShopService(ShopRepository shopRepo){
        this.shopRepo = shopRepo;
    }
    
    @CacheEvict(value = "shops", key = "#userId")
    public Shop createShop(ShopAddRequest request, User user) throws RuntimeException {
        if(shopRepo.existsByUserAndName(user, request.getName())){
            throw new RuntimeException("Shop with this name already exists for this user.");
        }
        if(user == null) {
            throw new RuntimeException("User cannot be null.");

        }

        Shop shop = new Shop();
        shop.setName(request.getName());
        shop.setLocation(request.getLocation());
        shop.setUser(user); // Set the user for the shop
        
        return shopRepo.save(shop);
    }

    @Cacheable(value = "shops", key = "#userId")
    public List<Shop> getShopsByUserId(Long userId) {
        System.out.println("Fetching shops from DB...");
        return shopRepo.findByUserId(userId);
    }

}
