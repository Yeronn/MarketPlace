package com.marketplace.apimarket.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.Data;

@Data
public class ReviewRequest {
  private Integer idProduct;
  private String description;
  @DecimalMin(value = "0.0", message = "La puntuación mínima debe ser 0")
  @DecimalMax(value = "5.0", message = "La puntuación máxima debe ser 5")
  private double punctuation;

}
