package com.estore.billing.service;

import com.estore.billing.entity.Order;
import com.estore.billing.entity.OrderItem;
import com.estore.billing.repository.OrderRepository;
import com.estore.customer.entity.User;
import com.estore.customer.repository.UserRepository;
import com.estore.exception.ResourceNotFoundException;
import com.estore.inventory.service.InventoryService;
import com.estore.shopping.entity.Cart;
import com.estore.shopping.entity.CartItem;
import com.estore.shopping.service.ShoppingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class BillingService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ShoppingService shoppingService;
    private final InventoryService inventoryService;

    public BillingService(OrderRepository orderRepository, UserRepository userRepository,
                          ShoppingService shoppingService, InventoryService inventoryService) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.shoppingService = shoppingService;
        this.inventoryService = inventoryService;
    }

    @Transactional
    public Order placeOrder(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));
        Cart cart = shoppingService.getOrCreateCart(userId);
        if (cart.getItems().isEmpty())
            throw new RuntimeException("Le panier est vide");

        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(shoppingService.calculateTotal(cart));

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getItems()) {
            inventoryService.decreaseStock(cartItem.getProduct().getId(), cartItem.getQuantity());
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(cartItem.getProduct());
            oi.setQuantity(cartItem.getQuantity());
            oi.setUnitPrice(cartItem.getUnitPrice());
            orderItems.add(oi);
        }
        order.setItems(orderItems);
        Order saved = orderRepository.save(order);
        shoppingService.clearCart(userId);
        return saved;
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Commande introuvable"));
    }
    //admin
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
