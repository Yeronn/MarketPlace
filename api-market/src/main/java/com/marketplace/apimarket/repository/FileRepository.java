package com.marketplace.apimarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marketplace.apimarket.model.File;

public interface FileRepository extends JpaRepository<File, Long> {

}
