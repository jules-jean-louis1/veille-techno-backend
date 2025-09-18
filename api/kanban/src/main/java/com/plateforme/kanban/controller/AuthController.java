package com.plateforme.kanban.controller;

import java.time.Instant;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plateforme.kanban.model.User;
import com.plateforme.kanban.service.AuthService;

import io.swagger.v3.core.util.Json;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public User register(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
            throw new IllegalArgumentException(Json.pretty("Email and password must not be empty"));
        }
        user.setFirstName(firstName == null || firstName.isEmpty() ? "" : firstName);
        user.setLastName(lastName == null || lastName.isEmpty() ? "" : lastName);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());
        User newUser = authService.create(user);

        return newUser;
    }
}
