package com.pbkk.orderservice.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pbkk.orderservice.model.Order;
import com.pbkk.orderservice.model.OrderDetail;
import com.pbkk.orderservice.service.OrderDetailService;
import com.pbkk.orderservice.service.OrderService;

@RequestMapping("/orders")
@RestController
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private OrderDetailService orderDetailService;
	
	@GetMapping()
	public List<Order> getAllOrder(){
		return orderService.getAllOrders();
	}
	
	@PostMapping
	public Order createOrder(
			@RequestBody Order orderRequest
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
		
//		
//		Order newOrder = orderRequest;
//		List<OrderDetail> newOrderDetail = orderRequest.getOrderDetails();
//		System.out.println(orderRequest.getOrderDetails());
//		
//		List<OrderDetail> temp = newOrderDetail.stream().map(orderDetail -> {
//			orderDetail.setOrder(newOrder);
//			return orderDetailService.createOrderDetail(orderDetail);
//		}).collect(Collectors.toList());
//		System.out.println(temp);
//		newOrder.setOrderDetails(temp);
	}
}
