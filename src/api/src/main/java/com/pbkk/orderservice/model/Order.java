package com.pbkk.orderservice.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@Table(name = "orders")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
		value = {"createdAt", "updatedAt"},
		allowGetters = true
)
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "customer_id")
	private Long customerId;
	
	@NotNull
	@Column(name = "restaurant_id")
	private Long restaurantId;
	
	@Size(max = 500)
	@Column(name = "delivery_address")
	private String deliveryAddress;
	
	@Column(name = "status")
	private Integer status;
	
	@Size(max = 1000)
	@Column(name = "notes")
	private String notes;
	
	@Column(name = "price")
	private Double price;
	
	@Column(name = "deals")
	private Double deals;
	
	@Column(name = "total_price")
	private Double totalPrice;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	@CreatedDate
	private Date createdAt;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	@LastModifiedDate
	private Date updateAt;
	
	@OneToMany(mappedBy = "order")
	private List<OrderDetail> orderDetails;
	
}
