package com.marketplace.apimarket.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketplace.apimarket.dto.ReviewRequest;
import com.marketplace.apimarket.dto.ReviewResponse;
import com.marketplace.apimarket.dto.UserResponse;
import com.marketplace.apimarket.model.Product;
import com.marketplace.apimarket.model.Review;
import com.marketplace.apimarket.model.User;
import com.marketplace.apimarket.repository.ProductRepository;
import com.marketplace.apimarket.repository.ReviewRepository;
import com.marketplace.apimarket.repository.UserRepository;

@Service
public class ReviewService {

  @Autowired
  private ReviewRepository reviewRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private UserRepository userRepository;

  public List<ReviewResponse> getReviewsProduct(Integer idProduct,
      Integer idUser) {
    List<Review> reviews = reviewRepository.findByProductId(idProduct);

    return reviews.stream()
        .map(this::convertToResponse)
        .collect(Collectors.toList());
  }

  private ReviewResponse convertToResponse(Review review) {

    ReviewResponse response = new ReviewResponse();

    response.setId(review.getId());
    response.setDescription(review.getDescription());
    response.setPunctuation(review.getPunctuation());

    UserResponse userResponse = new UserResponse();
    Optional<User> userOptional = userRepository.findById(review.getUserId());
    User user = userOptional.get();

    userResponse.setId(user.getId());
    userResponse.setUsername(user.getUsername());
    userResponse.setName(user.getName());
    userResponse.setEmail(user.getEmail());
    userResponse.setPhoneNumber(user.getPhoneNumber());
    userResponse.setRole(user.getRole());
    response.setUser(userResponse);

    return response;
  }

  public Review createReview(ReviewRequest reviewRequest, Integer idUser) {
    Review newReview = new Review();

    Optional<Product> productOptional = productRepository.findById(reviewRequest.getIdProduct());
    Product product = productOptional.get();

    newReview.setUserId(idUser);
    newReview.setDescription(reviewRequest.getDescription());
    newReview.setPunctuation(reviewRequest.getPunctuation());
    newReview.setProduct(product);

    return reviewRepository.save(newReview);
  }
}
