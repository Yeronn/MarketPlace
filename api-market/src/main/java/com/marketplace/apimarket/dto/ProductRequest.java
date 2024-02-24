package com.marketplace.apimarket.dto;

import lombok.Data;

@Data
public class ProductRequest {
  private String name;
  private String description;
  private double price;
  private Integer stock;
  private Integer idCategory;
  private Integer idUser;

}
