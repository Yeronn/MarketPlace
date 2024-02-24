package com.marketplace.apimarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marketplace.apimarket.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
  List<Order> findByUserId(Integer userId);
}
