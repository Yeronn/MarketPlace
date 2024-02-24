package com.marketplace.apimarket.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.apimarket.dto.AuthenticationResponse;
import com.marketplace.apimarket.dto.LoginRequest;
import com.marketplace.apimarket.dto.RegisterRequest;
import com.marketplace.apimarket.jwt.JwtUtil;
import com.marketplace.apimarket.model.User;
import com.marketplace.apimarket.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {
  @Autowired
  private UserService userService;

  @PostMapping("/register")
  public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
    Optional<User> existingUser = userService.findUserByEmail(request.getEmail());
    if (existingUser.isPresent()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico ya está en uso.");
    }

    userService.registerUser(request);
    return ResponseEntity.ok("Usuario registrado correctamente.");
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    String email = request.getEmail();
    String password = request.getPassword();

    if (email == null || password == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email o password vacio.");
    }

    Optional<User> authenticatedUserOptional = userService.authenticateUser(request);
    if (authenticatedUserOptional.isPresent()) {
      User authenticatedUser = authenticatedUserOptional.get();
      String token = JwtUtil.generateToken(authenticatedUser.getId(), authenticatedUser.getEmail());

      AuthenticationResponse response = new AuthenticationResponse();
      response.setId(authenticatedUser.getId());
      response.setName(authenticatedUser.getName());
      response.setUsername(authenticatedUser.getUsername());
      response.setRole(authenticatedUser.getRole());
      response.setToken(token);

      return ResponseEntity.ok(response);
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas.");
  }
}
