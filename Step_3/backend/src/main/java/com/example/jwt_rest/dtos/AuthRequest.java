package com.example.jwt_rest.dtos;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}


// Comparison
// 
// Feature	                     |  @Data class	                |   Interface projection	             |     Record
// Example	                     |   AuthRequest	            |    ProductSalesReport	                 |      UserDataResponse
// Defines fields	             |   Yes	                    |    No	                                 |      Yes, as components
// Can be instantiated directly	 |   Yes	                    |    No, not as an interface	         |      Yes
// Mutable	                     |   Usually yes	            |    Depends on implementation	         |      Components cannot be reassigned
// Typical purpose	             |   Request/response DTO	    |    Reading selected database columns	 |      Request/response DTO
// Accessors	                 |   getUsername()	            |    getRevenue()	                     |      userData()