package com.pbkk.orderservice.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.pbkk.orderservice.model.OrderDetail;
import com.pbkk.orderservice.service.OrderDetailService;
import com.pbkk.orderservice.service.OrderService;

@RequestMapping("/orders")
@RestControllerAdvice
public class OrderDetailController {
	
	@Autowired
	OrderDetailService orderDetailService;
	
	@Autowired
	OrderService orderService;
	
	@GetMapping("/{id}/details")
	public List<OrderDetail> getOrderDetails(@PathVariable(name = "id") Long orderId){
		return orderDetailService.getOrderDetails(orderId);
	}
	
	@PostMapping("/{id}/details")
	@ResponseStatus(HttpStatus.CREATED)
	public OrderDetail addOrderDetail(
			@PathVariable(name = "id") Long orderId,
		    @Valid @RequestBody OrderDetail orderDetail
			){
		return orderDetailService.createOrderDetail(orderId, orderDetail);
	}
	
	@PutMapping("/{id}/details/{detailId}")
	public OrderDetail updateOrderDetail(
			@PathVariable(name = "id") Long orderId,
			@PathVariable(name = "detailId") Long orderDetailId,
			@Valid @RequestBody OrderDetail orderDetail
			){
		return orderDetailService.updateOrderDetail(orderDetailId, orderDetail);
	}
	
	@DeleteMapping("/{id}/details/{detailId}")
	public ResponseEntity<?> deleteOrderDetail(
			@PathVariable(name = "id") Long orderId,
			@PathVariable(name = "detailId") Long orderDetailId
			){
		return orderDetailService.deleteOrderDetail(orderDetailId);
	}
	
}
