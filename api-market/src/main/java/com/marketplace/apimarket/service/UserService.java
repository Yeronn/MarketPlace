package com.marketplace.apimarket.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketplace.apimarket.dto.LoginRequest;
import com.marketplace.apimarket.dto.RegisterRequest;
import com.marketplace.apimarket.model.User;
import com.marketplace.apimarket.repository.UserRepository;
import com.marketplace.apimarket.util.PasswordUtil;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public void registerUser(RegisterRequest request) {
    User user = new User();
    user.setName(request.getName());
    user.setUsername(request.getUsername());
    user.setPhoneNumber(request.getPhoneNumber());
    user.setEmail(request.getEmail());
    user.setPassword(PasswordUtil.encodePassword(request.getPassword()));
    user.setRole("user");

    userRepository.save(user);
  }

  public Optional<User> authenticateUser(LoginRequest request) {
    Optional<User> userOptional = findUserByEmail(request.getEmail());
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      if (PasswordUtil.verifyPassword(request.getPassword(), user.getPassword())) {
        return Optional.of(user);
      }
    }
    return Optional.empty();
  }

  public void createAdmin(User user) {
    userRepository.save(user);
  }

  public Optional<User> findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public Boolean isAdminUserExists() {
    List<User> adminUsers = userRepository.findByRole("admin");
    return adminUsers.size() == 1;
  }
}
