package com.healthai.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;

/**
 * Main entry point for the Health-AI Assistant Backend.
 * Uses reactive MongoDB and enables caching for performance.
 */
@SpringBootApplication
@EnableReactiveMongoAuditing
@EnableCaching
public class HealthAiBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthAiBackendApplication.class, args);
    }
}