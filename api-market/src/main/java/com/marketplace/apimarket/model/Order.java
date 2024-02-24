package com.marketplace.apimarket.model;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@DynamicInsert
@DynamicUpdate

@Table(name = "orders")

public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "id_user")
  private Integer userId;

  private Date date;

  @Column(name = "delivery_address")
  private String deliveryAddress;

  private String status;

  @Column(name = "total_order")
  private double totalOrder;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<DetailOrder> detailOrder;
}
