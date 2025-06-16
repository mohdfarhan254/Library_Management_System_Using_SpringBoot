package net.javaguides.lms;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
  
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
          
            @SuppressWarnings("null")
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // allow all endpoints
                        .allowedOrigins("http://localhost:3003")  // frontend origins
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // allowed methods
                        .allowedHeaders("*")  // allow all headers
                        .allowCredentials(true);
            }
        };
    }
}
