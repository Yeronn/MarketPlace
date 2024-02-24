package com.marketplace.apimarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.apimarket.dto.UserRequest;
import com.marketplace.apimarket.dto.UserResponse;
import com.marketplace.apimarket.service.AdminService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
public class AdminController {

  @Autowired
  private AdminService adminService;

  @GetMapping(value = "/users")
  public ResponseEntity<List<UserResponse>> getAllUsers() {
    return ResponseEntity.ok(adminService.getUsers());
  }

  @GetMapping(value = "/user/{id}")
  public ResponseEntity<?> getUser(@PathVariable Integer id) {
    try {
      UserResponse userResponse = adminService.getUserById(id);
      return ResponseEntity.ok(userResponse);
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }

  @PutMapping(value = "/user/{id}")
  public ResponseEntity<?> updateUser(@PathVariable Integer id, @Valid @RequestBody UserRequest userRequest) {
    try {
      UserResponse userResponse = adminService.updateUser(id, userRequest);
      return ResponseEntity.ok(userResponse);
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }

  @DeleteMapping(value = "/user/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
    try {
      adminService.deleteUser(id);
      return ResponseEntity.ok("Usuario eliminado correctamente");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }

}
