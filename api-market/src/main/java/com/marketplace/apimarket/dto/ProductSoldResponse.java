package com.marketplace.apimarket.dto;

import com.marketplace.apimarket.model.Category;

import lombok.Data;

@Data
public class ProductSoldResponse {
  private Integer id;
  private String name;
  private String description;
  private double price;
  private Integer stock;
  private Category category;
  private UserResponse user;
  private int amount;
  private double total;
}
