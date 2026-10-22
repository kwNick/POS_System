package com.example.jwt_rest.dtos;

import com.fasterxml.jackson.databind.JsonNode;

public record UserDataResponse(JsonNode userData) {
}