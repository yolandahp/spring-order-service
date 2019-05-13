package com.pbkk.orderservice.service;

import java.util.List;

import com.pbkk.orderservice.model.Order;

public interface OrderService {

	List<Order> getAllOrders();
	List<Order> getOrdersByParameter(Integer status, Integer customerId);
	Order getOrder(Long orderId);
	Order createOrder(Order order);
	Order updateOrderStatus(Long orderId, Integer status);
	void recalculateOrderTotalPrice(Long orderId);
}
