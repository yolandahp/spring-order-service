package com.pbkk.orderservice.model;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@Table(name = "order_details")
@JsonIgnoreProperties(
		value = {"createdAt", "updatedAt"},
		allowGetters = true
)
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "order_id", nullable = false)
	private Order order;
	
	@Column(name = "menu_id")
	private Long menuId;
	
	@Column(name = "price")
	private Double price;
	
	@Column(name = "amount")
	private Long amount;
	
	@Column(name = "sub_total")
	private Double subTotal;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	@CreatedDate
	private Date createdAt;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	@LastModifiedDate
	private Date updateAt;

}
