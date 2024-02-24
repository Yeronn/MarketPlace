package com.marketplace.apimarket.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketplace.apimarket.dto.ProductResponse;
import com.marketplace.apimarket.dto.UserResponse;
import com.marketplace.apimarket.model.Category;
import com.marketplace.apimarket.model.DetailOrder;
import com.marketplace.apimarket.model.Product;
import com.marketplace.apimarket.model.User;
import com.marketplace.apimarket.repository.CategoryRepository;
import com.marketplace.apimarket.repository.OrderDetailRepository;
import com.marketplace.apimarket.repository.ProductRepository;
import com.marketplace.apimarket.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {

  @Autowired
  private OrderDetailRepository orderDetailRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private UserRepository userRepository;

  public List<ProductResponse> getProducts() {
    List<Product> products = productRepository.findAll();

    return products.stream()
        .map(this::convertToResponse)
        .collect(Collectors.toList());
  }

  private ProductResponse convertToResponse(Product product) {
    ProductResponse response = new ProductResponse();

    response.setId(product.getId());
    response.setName(product.getName());
    response.setCategory(product.getCategory());
    response.setDescription(product.getDescription());
    response.setPrice(product.getPrice());
    response.setStock(product.getStock());
    response.setUrlImage(product.getUrlImage());

    UserResponse userResponse = new UserResponse();
    Optional<User> userOptional = userRepository.findById(product.getUserId());
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

  public ProductResponse getProductById(Integer id) {

    Optional<Product> productOptional = productRepository.findById(id);
    if (productOptional.isPresent()) {
      ProductResponse response = new ProductResponse();
      Product product = productOptional.get();
      UserResponse userResponse = new UserResponse();
      Optional<User> userOptional = userRepository.findById(product.getUserId());
      User user = userOptional.get();

      userResponse.setId(user.getId());
      userResponse.setUsername(user.getUsername());
      userResponse.setName(user.getName());
      userResponse.setEmail(user.getEmail());
      userResponse.setPhoneNumber(user.getPhoneNumber());
      userResponse.setRole(user.getRole());

      response.setId(product.getId());
      response.setName(product.getName());
      response.setCategory(product.getCategory());
      response.setDescription(product.getDescription());
      response.setPrice(product.getPrice());
      response.setStock(product.getStock());
      response.setUrlImage(product.getUrlImage());
      response.setUser(userResponse);
      return response;
    } else {
      throw new EntityNotFoundException("Producto no encontrado con ID: " + id);
    }

  }

  public List<ProductResponse> getProductsByKeyword(String keyword) {
    List<Product> products = productRepository.findByKeyword(keyword);

    return products.stream()
        .map(this::convertToResponse)
        .collect(Collectors.toList());
  }

  public List<ProductResponse> getProductsByCategory(Category category) {
    List<Product> products = productRepository.findByCategory(category);

    return products.stream()
        .map(this::convertToResponse)
        .collect(Collectors.toList());
  }

  public List<Product> getProductsUser(Integer idUser) {
    List<Optional<Product>> productsOptional = productRepository.findByUserId(idUser);

    List<Product> products = productsOptional
        .stream()
        .filter(Optional::isPresent)
        .map(Optional::get)
        .collect(Collectors.toList());

    return products;
  }

  public List<DetailOrder> getProductsSold(Integer userId) {
    List<Optional<Product>> productsOptional = productRepository.findByUserId(userId);

    List<Product> products = productsOptional
        .stream()
        .filter(Optional::isPresent)
        .map(Optional::get)
        .collect(Collectors.toList());

    List<DetailOrder> orderDetails = new ArrayList<>();
    for (Product product : products) {
      List<DetailOrder> details = orderDetailRepository.findByProduct(product);
      orderDetails.addAll(details);
    }

    return orderDetails;

  }

  public Product createProduct(String name, String description, double price, int stock, int idCategory, int idUser,
      String urlImage) throws IOException {
    Product newProduct = new Product();

    Category category = new Category();

    category = categoryRepository.findById(idCategory).orElse(null);

    newProduct.setName(name);
    newProduct.setDescription(description);
    newProduct.setPrice(price);
    newProduct.setStock(stock);
    newProduct.setCategory(category);
    newProduct.setUserId(idUser);
    newProduct.setUrlImage(urlImage);

    return productRepository.save(newProduct);
  }

  public Product updateProduct(Integer id, Product newProduct) {
    Optional<Product> optionalProduct = productRepository.findById(id);
    if (optionalProduct.isPresent()) {
      Product productRespond = optionalProduct.get();

      if (newProduct.getName() != null) {
        productRespond.setName(newProduct.getName());
      }

      if (newProduct.getDescription() != null) {
        productRespond.setDescription(newProduct.getDescription());
      }

      if (newProduct.getStock() != null) {
        if (newProduct.getStock() >= 0) {
          productRespond.setStock(newProduct.getStock());
        }
      }

      if (newProduct.getPrice() != 0) {
        productRespond.setPrice(newProduct.getPrice());
      }

      if (newProduct.getCategory() != null) {
        productRespond.setCategory(newProduct.getCategory());
      }

      productRepository.save(productRespond);
      return productRespond;

    } else {
      throw new EntityNotFoundException("Producto no encontrado con ID: " + id);
    }
  }

  public Product updateProductImage(Integer id, String urlImage) {
    Optional<Product> optionalProduct = productRepository.findById(id);

    if (optionalProduct.isPresent()) {
      Product productRespond = optionalProduct.get();

      productRespond.setUrlImage(urlImage);
      productRepository.save(productRespond);
      return productRespond;
    } else {
      throw new EntityNotFoundException("Producto no encontrado con ID: " + id);
    }
  }

  public void deleteProduct(Integer id) {
    Optional<Product> optionalProduct = productRepository.findById(id);
    if (optionalProduct.isPresent()) {
      productRepository.deleteById(id);
    } else {
      throw new EntityNotFoundException("Producto no encontrado con ID: " + id);
    }

  }

}
