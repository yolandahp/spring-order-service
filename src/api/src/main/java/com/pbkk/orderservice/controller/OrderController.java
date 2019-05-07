package com.pbkk.orderservice.controller;


import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.HttpStatus;

import com.pbkk.orderservice.model.Order;
import com.pbkk.orderservice.model.OrderDetail;
import com.pbkk.orderservice.service.OrderDetailService;
import com.pbkk.orderservice.service.OrderService;

@RequestMapping("/orders")
@RestControllerAdvice
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private OrderDetailService orderDetailService;
	
	@GetMapping()
	public List<Order> getAllOrder(@RequestParam(name = "status", required = false) String status){
		if (status != null) {
			if (status.equals("ongoing")) {
				List<Order> ongoing = orderService.getOrdersByStatus(1);
				ongoing.addAll(orderService.getOrdersByStatus(2));
				ongoing.addAll(orderService.getOrdersByStatus(3));
				return ongoing;
			}
			if (status.equals("completed")) {
				return orderService.getOrdersByStatus(4);
			}
			if (status.equals("cancelled")) {
				return orderService.getOrdersByStatus(9);
			}
			return null;
		}
		return orderService.getAllOrders();
	}
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Order createOrder(
			@Valid @RequestBody Order orderRequest
			) {
		Order newOrder = new Order();
		newOrder.setCustomerId(orderRequest.getCustomerId());
		newOrder.setRestaurantId(orderRequest.getRestaurantId());
		newOrder.setDeliveryAddress(orderRequest.getDeliveryAddress());
		newOrder.setStatus(orderRequest.getStatus());
		newOrder.setNotes(orderRequest.getNotes());
		newOrder.setPrice(orderRequest.getPrice());
		newOrder.setDeals(orderRequest.getDeals());
		newOrder.setTotalPrice(orderRequest.getTotalPrice());
		Order fixOrder = orderService.createOrder(newOrder);
		
		for(OrderDetail orderDetail: orderRequest.getOrderDetails()) {
			OrderDetail newOrderDetail = new OrderDetail();
			newOrderDetail.setMenuId(orderDetail.getMenuId());
			newOrderDetail.setPrice(orderDetail.getPrice());
			newOrderDetail.setAmount(orderDetail.getAmount());
			newOrderDetail.setSubTotal(orderDetail.getSubTotal());
			newOrderDetail.setOrder(newOrder);
			newOrder.getOrderDetails().add(newOrderDetail);
			orderDetailService.createOrderDetail(newOrderDetail);
		}
				
		return fixOrder;
	}
	
	@GetMapping("{id}")
	public Order getOrder(@PathVariable("id") Long orderId) {
		return orderService.getOrder(orderId);
	}
	
	@PatchMapping("/{id}/status")
	public Order updateOrderStatus(
			@PathVariable(name = "id") Long orderId,
			@RequestParam(name = "status") Integer status
			) {
		return orderService.updateOrderStatus(orderId, status);
	}
	
}
