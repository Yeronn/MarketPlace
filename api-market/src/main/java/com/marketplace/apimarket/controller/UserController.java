package com.marketplace.apimarket.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api")
public class UserController {

  @GetMapping("/productos")
  public ResponseEntity<String> getMessageRes() {
    return new ResponseEntity<String>("Productos", HttpStatus.OK);
  }

}
