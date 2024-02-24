package com.marketplace.apimarket.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketplace.apimarket.model.Category;
import com.marketplace.apimarket.repository.CategoryRepository;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  public List<Category> getCategories() {
    List<Category> categories = categoryRepository.findAll();
    return categories;
  }
}
