package com.marketplace.apimarket.dto;

import com.marketplace.apimarket.model.Category;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class ProductResponse {
  private Integer id;
  private String name;
  private String description;
  private double price;
  private Integer stock;
  private Category category;
  private UserResponse user;
  @Column(length = 1048576)
  private String urlImage;

}
