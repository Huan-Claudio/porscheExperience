package com.porsche.experience.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuração de CORS para permitir comunicação com o front-end React
 * 
 * CORS (Cross-Origin Resource Sharing) é necessário porque:
 * - O front-end React é servido em http://localhost:5173 (Vite dev server)
 * - O backend Java está em http://localhost:8081/api
 * - Browsers bloqueiam requisições entre diferentes origens por padrão
 * 
 * Essa configuração permite que o React acesse os endpoints da API Java
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:5173",      // Vite dev server (React)
                        "http://localhost:3000",       // Alternative React dev port
                        "http://localhost:4173",       // Vite preview server
                        "http://127.0.0.1:5173",
                        "http://127.0.0.1:3000",
                        "http://127.0.0.1:4173"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
