package com.example.jwt_rest.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Service;

import com.example.jwt_rest.dtos.UserDataResponse;
import com.example.jwt_rest.repositories.UserDataRepository;

@Service
public class UserDataService {

    private final UserDataRepository userDataRepository;
    private final ObjectMapper objectMapper;

    public UserDataService(
            UserDataRepository userDataRepository,
            ObjectMapper objectMapper
    ) {
        this.userDataRepository = userDataRepository;
        this.objectMapper = objectMapper;
    }

    public UserDataResponse getUserData(String username) {

        String json = userDataRepository
                .findUserDataByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        try {
            JsonNode userData = objectMapper.readTree(json);

            return new UserDataResponse(userData);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(
                    "Failed to parse user data",
                    e
            );
        }
    }
}