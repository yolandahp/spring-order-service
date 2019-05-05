package com.pbkk.orderservice.service;

import java.util.List;

import com.pbkk.orderservice.model.Order;

public interface OrderService {

	List<Order> getAllOrders();
	List<Order> getOrdersByStatus(Integer status);
	Order getOrder(Long orderId);
	Order createOrder(Order order);
	Order updateOrderStatus(Long orderId, Integer status);
	
}
