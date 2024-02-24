package com.marketplace.apimarket;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.marketplace.apimarket.model.Category;
import com.marketplace.apimarket.model.User;
import com.marketplace.apimarket.repository.CategoryRepository;
import com.marketplace.apimarket.service.UserService;
import com.marketplace.apimarket.util.PasswordUtil;

@Component
public class ApplicationStartup implements ApplicationListener<ContextRefreshedEvent> {

  private final UserService userService;
  private final CategoryRepository categoryRepository;

  public ApplicationStartup(UserService userService, CategoryRepository categoryRepository) {
    this.userService = userService;
    this.categoryRepository = categoryRepository;
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent event) {
    createAdminUser();
    createDefaultCategories();
  }

  private void createAdminUser() {
    if (!userService.isAdminUserExists()) {
      User adminUser = new User();
      adminUser.setName("Admin");
      adminUser.setUsername("userAdmin");
      adminUser.setPhoneNumber("123456789");
      adminUser.setEmail("admin@admin.com");
      adminUser.setPassword(PasswordUtil.encodePassword("adminPassword"));
      adminUser.setRole("admin");

      userService.createAdmin(adminUser);
    }
  }

  private void createDefaultCategories() {
    if (categoryRepository.count() == 0) {
      List<String> defaultCategoryNames = Arrays.asList(
          "Electrónica", "Ropa", "Hogar", "Deportes", "Libros", "Juguetes", "Belleza", "Automóviles", "Tecnología",
          "Deportes", "Juegos");

      List<Category> defaultCategories = defaultCategoryNames.stream()
          .map(categoryName -> {
            Category category = new Category();
            category.setName(categoryName);
            return category;
          })
          .collect(Collectors.toList());

      categoryRepository.saveAll(defaultCategories);
    }
  }
}
