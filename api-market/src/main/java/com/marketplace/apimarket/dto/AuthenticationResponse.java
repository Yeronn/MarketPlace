package com.marketplace.apimarket.dto;

import lombok.Data;

@Data
public class AuthenticationResponse {
  private Integer id;
  private String name;
  private String username;
  private String role;
  private String token;
}
