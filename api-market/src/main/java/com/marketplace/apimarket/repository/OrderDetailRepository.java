package com.marketplace.apimarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.marketplace.apimarket.model.DetailOrder;
import com.marketplace.apimarket.model.Product;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<DetailOrder, Integer> {
  List<DetailOrder> findByProduct(Product product);

  @Query("SELECT d FROM DetailOrder d")
  List<DetailOrder> findAllCustom();
}
