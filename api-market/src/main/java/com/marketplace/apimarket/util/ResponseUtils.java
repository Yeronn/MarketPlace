package com.marketplace.apimarket.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ResponseUtils {

  public static ResponseEntity<String> getResponseEntity(String message, HttpStatus httpStatus) {
    return new ResponseEntity<String>("Mensaje: " + message, httpStatus);
  }
}
