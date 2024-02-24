package com.marketplace.apimarket.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketplace.apimarket.dto.UserRequest;
import com.marketplace.apimarket.dto.UserResponse;
import com.marketplace.apimarket.model.User;
import com.marketplace.apimarket.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdminService {

  @Autowired
  private UserRepository userRepository;

  public List<UserResponse> getUsers() {
    List<User> users = userRepository.findAll();
    List<UserResponse> UserResponses = users.stream()
        .filter(user -> user.getRole().equals("user"))
        .map(user -> {
          UserResponse UserResponse = new UserResponse();
          UserResponse.setId(user.getId());
          UserResponse.setName(user.getName());
          UserResponse.setUsername(user.getUsername());
          UserResponse.setPhoneNumber(user.getPhoneNumber());
          UserResponse.setEmail(user.getEmail());
          UserResponse.setRole(user.getRole());
          return UserResponse;
        })
        .collect(Collectors.toList());

    return UserResponses;
  }

  public UserResponse getUserById(Integer id) {
    Optional<User> userOptional = userRepository.findById(id);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      UserResponse userResponse = new UserResponse();
      userResponse.setId(user.getId());
      userResponse.setUsername(user.getUsername());
      userResponse.setName(user.getName());
      userResponse.setEmail(user.getEmail());
      userResponse.setPhoneNumber(user.getPhoneNumber());
      userResponse.setRole(user.getRole());
      return userResponse;
    } else {
      throw new EntityNotFoundException("Usuario no encontrado con ID: " + id);
    }
  }

  public UserResponse updateUser(Integer id, UserRequest userRequest) {
    Optional<User> optionalUser = userRepository.findById(id);

    if (optionalUser.isPresent()) {
      User user = optionalUser.get();

      if (userRequest.getName() != null) {
        user.setName(userRequest.getName());
      }

      if (userRequest.getUsername() != null) {
        user.setUsername(userRequest.getUsername());
      }

      if (userRequest.getPhoneNumber() != null) {
        user.setPhoneNumber(userRequest.getPhoneNumber());
      }

      if (userRequest.getEmail() != null) {
        user.setEmail(userRequest.getEmail());
      }

      if (userRequest.getRole() != null) {
        user.setEmail(userRequest.getRole());
      }

      userRepository.save(user);

      UserResponse userResponse = new UserResponse();
      userResponse.setId(user.getId());
      userResponse.setName(user.getName());
      userResponse.setUsername(user.getUsername());
      userResponse.setPhoneNumber(user.getPhoneNumber());
      userResponse.setEmail(user.getEmail());
      userResponse.setRole(user.getRole());

      return userResponse;
    } else {
      throw new EntityNotFoundException("Usuario no encontrado con ID: " + id);
    }
  }

  public void deleteUser(Integer id) {
    Optional<User> optionalUser = userRepository.findById(id);

    if (optionalUser.isPresent()) {
      userRepository.deleteById(id);
    } else {
      throw new EntityNotFoundException("Usuario no encontrado con ID: " + id);
    }
  }

}
