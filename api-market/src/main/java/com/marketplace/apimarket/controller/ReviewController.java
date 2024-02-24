package com.marketplace.apimarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.apimarket.dto.ReviewRequest;
import com.marketplace.apimarket.dto.ReviewResponse;
import com.marketplace.apimarket.service.ReviewService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

  @Autowired
  private ReviewService reviewService;

  @GetMapping("/{idProduct}")
  public List<ReviewResponse> getReviewsProduct(HttpServletRequest request,
      @PathVariable Integer idProduct) {
    int idUser = (int) request.getAttribute("id");

    return reviewService.getReviewsProduct(idProduct, idUser);
  }

  @PostMapping
  public ResponseEntity<?> createReview(HttpServletRequest request, @Valid @RequestBody ReviewRequest reviewRequest) {
    int idUser = (int) request.getAttribute("id");
    reviewService.createReview(reviewRequest, idUser);

    return ResponseEntity.status(HttpStatus.CREATED).body("Review creada correctamente.");
  }
}
