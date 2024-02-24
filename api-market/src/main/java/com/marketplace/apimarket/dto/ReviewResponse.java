package com.marketplace.apimarket.dto;

import lombok.Data;

@Data
public class ReviewResponse {
  private Integer id;
  private UserResponse user;
  private String description;
  private double punctuation;
}
