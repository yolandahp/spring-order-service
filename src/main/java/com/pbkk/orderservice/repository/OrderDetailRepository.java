package com.pbkk.orderservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pbkk.orderservice.model.OrderDetail;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
	List<OrderDetail> findByOrderId(Long orderId);
	Optional<OrderDetail> findByIdAndOrderId(Long id, Long orderId); 
}
