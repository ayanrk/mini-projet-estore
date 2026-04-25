package com.estore.billing.controller;

import com.estore.billing.entity.Order;
import com.estore.billing.service.BillingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final BillingService billingService;

    public OrderController(BillingService billingService) {
        this.billingService = billingService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Order> placeOrder(@PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(billingService.placeOrder(userId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(billingService.getOrdersByUser(userId));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(billingService.getOrderById(orderId));
    }
}
