package com.marketplace.apimarket.dto;

import lombok.Data;

@Data
public class UserResponse {
  private Integer id;
  private String name;
  private String username;
  private String email;
  private String phoneNumber;
  private String role;
}
