package com.adp.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.adp.backend.models.Cart;
import com.adp.backend.models.CartItem;
import com.adp.backend.models.Product;
import com.adp.backend.models.User;
import com.adp.backend.repositories.CartRepository;
import com.adp.backend.repositories.ProductRepository;
import com.adp.backend.repositories.UserRepository;

@Service
@Transactional
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Cart getCartByUserId(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return cartRepository.findByUserAndIsUserCart(user, true)
            .orElseGet(() -> {
                Cart newCart = new Cart();
                newCart.setUser(user);
                newCart.setIsUserCart(true);
                return cartRepository.save(newCart);
            });
    }

    @Transactional
    public void addItemToCart(Long userId, Long productId, Integer quantity) {
        Cart cart = getCartByUserId(userId);
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cart.getItems().stream()
            .filter(item -> item.getProduct().getId().equals(productId))
            .findFirst()
            .orElseGet(() -> {
                CartItem newItem = new CartItem();
                newItem.setProduct(product);
                cart.getItems().add(newItem);
                return newItem;
            });

        cartItem.setQuantity(quantity);
        cartRepository.save(cart);
    }

    @Transactional
    public void removeItemFromCart(Long itemId) {
        cartRepository.deleteById(itemId);
    }

    @Transactional
    public void purchaseCart(Long userId) {
        Cart cart = getCartByUserId(userId);
        if (cart == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        try {
            // Clear cart items after successful purchase
            cart.getItems().clear();
            cartRepository.save(cart);
        } catch (Exception e) {
            throw new RuntimeException("Failed to process purchase: " + e.getMessage());
        }
    }
} 