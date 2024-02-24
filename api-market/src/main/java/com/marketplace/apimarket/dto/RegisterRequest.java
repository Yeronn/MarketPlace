package com.marketplace.apimarket.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterRequest {

  @NotBlank(message = "Nombre requerido")
  @NotNull(message = "Nombre requerido")
  private String name;

  @NotBlank(message = "Username requerido")
  @NotNull(message = "Username requerido")
  private String username;

  @NotBlank(message = "Telefono requerido")
  @NotNull(message = "Telefono requerido")
  private String phoneNumber;

  @NotBlank(message = "Correo electrónico requerido")
  @NotNull(message = "Correo electrónico requerido")
  @Email(message = "El correo electrónico debe tener un formato válido")
  private String email;

  @NotBlank(message = "Password requerido")
  @NotNull(message = "Password requerido")
  private String password;
}
