package com.pbkk.orderservice.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

@Service
public class CustomerAPICallServiceImpl implements CustomerAPICallService {
	private final String baseUrl = "https://rendoru.com/kuliah/pbkk/";
	private Retrofit retro;
	private CustomerAPICall customerAPICall;
	
	public CustomerAPICallServiceImpl() {
		this.retro = new Retrofit.Builder()
				.baseUrl(baseUrl)
				.addConverterFactory(GsonConverterFactory.create())
				.build();
		this.customerAPICall = retro.create(CustomerAPICall.class);
	}
	
	@Override
	public boolean checkToken(String token) {
		Call<Map<String, Object>> tokenCheck = customerAPICall.checkToken(token, token);
		Response<Map<String, Object>> respToken;
		try {
			respToken = tokenCheck.execute();
			System.out.println(respToken.code());
			if (respToken.code() != 200)
				return false;
			return true;
		} catch (Exception e) {
			System.out.println("error " + e);
		}
		return false;
	}

}
