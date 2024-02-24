package com.marketplace.apimarket.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UserRequest {
  private String name;
  private String username;
  private String phoneNumber;
  @Email(message = "El correo electrónico debe tener un formato válido")
  private String email;
  private String role;
}
