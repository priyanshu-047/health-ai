package com.healthai.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration properties for Ollama integration.
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "ollama")
public class OllamaConfig {

    private String baseUrl;
    private String model;
    private Timeout timeout = new Timeout();

    @Data
    public static class Timeout {
        private long connect = 5000;
        private long read = 30000;
    }
}