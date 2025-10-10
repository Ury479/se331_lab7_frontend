package com.example.yourproject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // ⭐ 启用 CORS（必须在最前面）
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // 禁用 CSRF（对于 REST API 通常需要禁用）
            .csrf(csrf -> csrf.disable())
            
            // 配置会话管理（JWT 通常使用无状态）
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // 配置访问权限
            .authorizeHttpRequests(auth -> auth
                // 允许所有 OPTIONS 请求（CORS 预检）
                .requestMatchers("OPTIONS", "/**").permitAll()
                
                // 允许访问事件相关的端点（根据你的需求调整）
                .requestMatchers("/events/**").permitAll()
                .requestMatchers("/api/events/**").permitAll()
                
                // 允许访问认证端点
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/auth/**").permitAll()
                
                // 允许图片上传
                .requestMatchers("/uploadImage").permitAll()
                
                // 其他请求需要认证
                .anyRequest().authenticated()
            );

        return http.build();
    }

    /**
     * CORS 配置
     * 这是关键配置，必须正确设置
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // ⭐ 允许的前端地址（包含所有可能的端口）
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",  // Vite 默认端口
            "http://localhost:5174",  // Vite 备用端口
            "http://localhost:3000",  // 其他可能的端口
            "http://localhost:4173"   // Vite preview 端口
        ));
        
        // 或者在开发环境使用 allowedOriginPatterns（更灵活）
        // configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        
        // ⭐ 允许的 HTTP 方法
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));
        
        // ⭐ 允许的请求头
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // ⭐ 暴露的响应头（前端需要读取）
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization",
            "x-total-count",
            "X-Total-Count"
        ));
        
        // ⭐ 允许携带凭证（Cookie、Authorization header）
        configuration.setAllowCredentials(true);
        
        // 预检请求的缓存时间（秒）
        configuration.setMaxAge(3600L);
        
        // 应用到所有路径
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}

