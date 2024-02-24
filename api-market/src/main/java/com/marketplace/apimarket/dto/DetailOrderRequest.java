package com.marketplace.apimarket.dto;

import lombok.Data;

@Data
public class DetailOrderRequest {
  private Integer idProduct;
  private int amount;
  private double total;

}
