package com.example.jwt_rest.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.jwt_rest.dtos.UserDataResponse;
import com.example.jwt_rest.services.UserDataService;

@RestController
@RequestMapping("/api/userData")
public class UserDataController {

    private final UserDataService userDataService;

    public UserDataController(
            UserDataService userDataService
    ) {
        this.userDataService = userDataService;
    }

    @GetMapping("/{username}/data")
    public ResponseEntity<UserDataResponse> getUserData(
            @PathVariable String username
    ) {

        UserDataResponse response =
                userDataService.getUserData(username);

        return ResponseEntity.ok(response);
    }
}