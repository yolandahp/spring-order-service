package com.pbkk.orderservice.service;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface CustomerAPICall {
	
	@FormUrlEncoded
	@POST("oauth/check_token")
	Call<Map<String, Object>> checkToken( @Header("Content-Type") String content_type,
										  @Header("Authorization") String tokenAuth,
										  @Field("token") String tokenChecked);
}
