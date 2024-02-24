package com.marketplace.apimarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.apimarket.dto.OrderRequest;
import com.marketplace.apimarket.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  @Autowired
  private OrderService orderService;

  @GetMapping("{id}")
  public ResponseEntity<?> getOrder(@PathVariable Integer id) {
    try {
      return ResponseEntity.ok(orderService.getOrder(id));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

    }
  }

  @PostMapping
  public ResponseEntity<String> createOrder(HttpServletRequest request, @RequestBody OrderRequest orderRequest) {
    try {
      int userId = (int) request.getAttribute("id");
      orderService.createOrder(userId, orderRequest);
      return ResponseEntity.status(HttpStatus.CREATED).body("Pedido creado correctamente.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Error al crear el pedido: " + e.getMessage());
    }
  }

  @GetMapping("/user")
  public ResponseEntity<?> getOrdersByUser(HttpServletRequest request) {
    int userId = (int) request.getAttribute("id");
    System.out.println(userId);
    return ResponseEntity.ok(orderService.getOrdersUser(userId));
  }

}
