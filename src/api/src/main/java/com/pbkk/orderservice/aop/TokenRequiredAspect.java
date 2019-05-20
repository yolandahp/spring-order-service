package com.pbkk.orderservice.aop;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.pbkk.orderservice.exception.UnauthorizedException;
import com.pbkk.orderservice.service.CustomerAPICallService;

public class TokenRequiredAspect {
	
	@Autowired
	private CustomerAPICallService customerAPICallService;
	
	@Before("@annotation(tokenRequired)")
	public void tokenRequired(TokenRequired tokenRequired) throws Throwable {
		ServletRequestAttributes requestAttributes =(ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = requestAttributes.getRequest();

        String tokenAuth = request.getHeader("Authorization");
        System.out.println(tokenAuth);
        
        if (tokenAuth == null)
            throw new UnauthorizedException("Token required. Make sure 'Authorization' key is in request header");
        boolean checked = customerAPICallService.checkToken(tokenAuth);
        if (!checked)
        	throw new UnauthorizedException("Unauthorized access");
	}
}
