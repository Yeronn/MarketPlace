package com.marketplace.apimarket.model;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "products")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;

  @NotNull(message = "El nombre es obligatorio")
  private String name;

  @NotNull(message = "La descripción es obligatorio")
  private String description;

  @NotNull(message = "El precio es obligatorio")
  @Min(value = 1, message = "El precio debe ser mayor que cero")
  private double price;

  @NotNull(message = "El stock es obligatorio")
  @Min(value = 0, message = "El stock debe ser mayor o igual a cero")
  private Integer stock;

  @Column(name = "user_id", nullable = false)
  private Integer userId;

  @Column(name = "url_image", length = 1048576)
  private String urlImage;

}
