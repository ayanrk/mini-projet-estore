package com.estore.shopping.controller;

import com.estore.shopping.entity.Cart;
import com.estore.shopping.service.ShoppingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final ShoppingService shoppingService;

    public CartController(ShoppingService shoppingService) {
        this.shoppingService = shoppingService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(shoppingService.getOrCreateCart(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody Map<String, Long> body,
                                          @RequestParam int quantity) {
        return ResponseEntity.ok(shoppingService.addToCart(body.get("userId"), body.get("productId"), quantity));
    }

    @PutMapping("/update/{itemId}")
    public ResponseEntity<Cart> updateQuantity(@PathVariable Long itemId, @RequestParam int quantity) {
        return ResponseEntity.ok(shoppingService.updateQuantity(itemId, quantity));
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long itemId) {
        shoppingService.removeItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        shoppingService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
