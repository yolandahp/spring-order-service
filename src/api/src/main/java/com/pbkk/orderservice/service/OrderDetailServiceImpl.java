package com.pbkk.orderservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pbkk.orderservice.exception.ResourceNotFoundException;
import com.pbkk.orderservice.model.Order;
import com.pbkk.orderservice.model.OrderDetail;
import com.pbkk.orderservice.repository.OrderDetailRepository;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	@Autowired
	private OrderService orderService;
	
	@Override
	public List<OrderDetail> getOrderDetails(Long orderId) {
		List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(orderId);
		if (orderDetails.isEmpty()) {
			throw new ResourceNotFoundException("Order Id "+orderId+" Not Found!");
		} else {
			return orderDetails;
		}
	}

	@Override
	public OrderDetail createOrderDetail(OrderDetail orderDetail) {
		orderDetail =  orderDetailRepository.save(orderDetail);
		orderService.recalculateOrderTotalPrice(orderDetail.getOrder().getId());
		return orderDetail;
	}

	@Override
	public OrderDetail createOrderDetail(Long orderId, OrderDetail orderDetail) {
		Order order = orderService.getOrder(orderId);
		if (order != null) {
			orderDetail.setOrder(order);
			OrderDetail newOrderDetail = orderDetailRepository.save(orderDetail);
			orderService.recalculateOrderTotalPrice(orderId);
			return newOrderDetail;
		} else {
			throw new ResourceNotFoundException("Order Id "+orderId+" Not Found!");
		}
	}

	@Override
	public OrderDetail updateOrderDetail(Long orderDetailId, OrderDetail orderDetailRequest) {
		OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId).orElse(null);
		if(orderDetail != null) {
			orderDetail.setAmount(orderDetailRequest.getAmount());
			orderDetail.setPrice(orderDetailRequest.getPrice());
			orderDetail.setSubTotal(orderDetailRequest.getAmount() * orderDetailRequest.getPrice());
			orderDetail =  orderDetailRepository.save(orderDetail);
			orderService.recalculateOrderTotalPrice(orderDetail.getOrder().getId());
			return orderDetail;
		} else {
			throw new ResourceNotFoundException("Order Detail Id "+orderDetailId+" Not Found!");
		}
	}

	@Override
	public ResponseEntity<?> deleteOrderDetail(Long orderDetailId) {
		OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId).orElse(null);
		if(orderDetail != null) {
			orderDetailRepository.delete(orderDetail);
			orderService.recalculateOrderTotalPrice(orderDetail.getOrder().getId());
			return ResponseEntity.ok().build();
		} else {
			throw new ResourceNotFoundException("Order Detail Id "+orderDetailId+" Not Found!");
		}

	}

}
