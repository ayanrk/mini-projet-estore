package com.estore.inventory.service;

import com.estore.exception.InsufficientStockException;
import com.estore.exception.ResourceNotFoundException;
import com.estore.inventory.entity.Inventory;
import com.estore.inventory.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Inventory getByProductId(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Stock introuvable pour produit : " + productId));
    }

    public boolean isAvailable(Long productId, int quantity) {
        Inventory inv = getByProductId(productId);
        return inv.getQuantity() >= quantity;
    }

    @Transactional
    public void decreaseStock(Long productId, int quantity) {
        Inventory inv = getByProductId(productId);
        if (inv.getQuantity() < quantity)
            throw new InsufficientStockException("Stock insuffisant pour produit : " + productId);
        inv.setQuantity(inv.getQuantity() - quantity);
        inventoryRepository.save(inv);
    }
}
