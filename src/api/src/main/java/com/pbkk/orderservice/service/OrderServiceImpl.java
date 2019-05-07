package com.pbkk.orderservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pbkk.orderservice.exception.ResourceNotFoundException;
import com.pbkk.orderservice.model.Order;
import com.pbkk.orderservice.model.OrderDetail;
import com.pbkk.orderservice.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Override
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	@Override
	public List<Order> getOrdersByStatus(Integer status) {
		return orderRepository.findAll().stream()
				.filter(order -> order.getStatus().intValue() == status.intValue())
				.collect(Collectors.toList());
	}

	@Override
	public Order getOrder(Long orderId) {
		return orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order Id "+ orderId + " not exist"));
	}

	@Override
	public Order createOrder(Order order) {
		return orderRepository.save(order);
	}

	@Override
	public Order updateOrderStatus(Long orderId, Integer status) {
		Order order = orderRepository.findById(orderId).orElse(null);
		if(order != null) {
			order.setStatus(status);
			return orderRepository.save(order);
		} else {
			throw new ResourceNotFoundException("Order Id "+ orderId + " not found!");
		}
	}

	@Override
	public void recalculateOrderTotalPrice(Long orderId) {
		Order order = orderRepository.findById(orderId).orElse(null);
		if (order != null) {
			List<OrderDetail> orderDetails = order.getOrderDetails();
			Double price = 0.0;
			for ( OrderDetail orderDetail: orderDetails) {
				price += orderDetail.getSubTotal();
			}
			order.setPrice(price);
			Double totalPrice = price - order.getDeals();
			order.setTotalPrice(totalPrice);
			orderRepository.save(order);
		}
	}

}
