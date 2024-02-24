package com.marketplace.apimarket.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data

public class OrderRequest {

  private Date date;
  private String deliveryAddress;
  private String status;
  private List<DetailOrderRequest> detailOrder;
}
