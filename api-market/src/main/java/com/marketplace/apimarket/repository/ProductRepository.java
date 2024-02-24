package com.marketplace.apimarket.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.marketplace.apimarket.model.Category;
import com.marketplace.apimarket.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
  public List<Optional<Product>> findByUserId(Integer userId);

  @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword%")
  public List<Product> findByKeyword(@Param("keyword") String keyword);

  // @Query("SELECT p, do FROM DetailOrder do JOIN Product p ON do.product.id =
  // p.id WHERE p.userId = :userId")
  @Query("SELECT p FROM Product p WHERE p.userId = :userId")
  public List<Product> findProductsByUserId(@Param("userId") Integer userId);

  List<Product> findByCategory(Category category);
}
