package com.estore.inventory.controller;

import com.estore.inventory.entity.Inventory;
import com.estore.inventory.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Inventory> getStock(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getByProductId(productId));
    }
    //admin
    @PutMapping("/{productId}")
    public ResponseEntity<Inventory> updateStock(
            @PathVariable Long productId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(inventoryService.updateStock(productId, quantity));
    }
}
