package com.pbkk.orderservice.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.pbkk.orderservice.model.OrderDetail;

public interface OrderDetailService {

	List<OrderDetail> getOrderDetails(Long orderId);
	OrderDetail createOrderDetail(OrderDetail orderDetail);
	OrderDetail createOrderDetail(Long orderId, OrderDetail orderDetail);
	OrderDetail updateOrderDetail(Long orderDetailId, OrderDetail orderDetailRequest);
	ResponseEntity<?> deleteOrderDetail(Long orderDetailId);
	
}
