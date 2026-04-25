package com.estore.customer.controller;

import com.estore.customer.dto.AuthDTO.*;
import com.estore.customer.entity.Profile;
import com.estore.customer.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CustomerService customerService;

    public AuthController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(customerService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(customerService.login(request));
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<Profile> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(customerService.getProfile(userId));
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long userId, @RequestBody ProfileRequest request) {
        return ResponseEntity.ok(customerService.updateProfile(userId, request));
    }
}
