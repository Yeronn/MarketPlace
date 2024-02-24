package com.marketplace.apimarket.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
  private String timestamp;
  private Integer status;
  private String error;
  private String message;
  private Set<String> details;
}
