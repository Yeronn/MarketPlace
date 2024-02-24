package com.marketplace.apimarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marketplace.apimarket.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
