package com.healthai.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthai.backend.config.OllamaConfig;
import com.healthai.backend.dto.HealthAnalysisResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for interacting with Ollama AI API.
 */
@Slf4j
@Service
public class OllamaService {

    private final WebClient webClient;
    private final OllamaConfig ollamaConfig;
    private final ObjectMapper objectMapper;

    public OllamaService(WebClient ollamaWebClient, OllamaConfig ollamaConfig, ObjectMapper objectMapper) {
        this.webClient = ollamaWebClient;
        this.ollamaConfig = ollamaConfig;
        this.objectMapper = objectMapper;
    }

    /**
     * Generate health analysis from Ollama based on user input.
     * Caches responses for identical prompts.
     *
     * @param symptoms   User symptoms
     * @param age        User age
     * @param gender     User gender
     * @param lifestyle  User lifestyle
     * @return Mono of HealthAnalysisResponse
     */
    @Cacheable(value = "aiResponses", key = "#symptoms.concat(#age).concat(#gender).concat(#lifestyle)")
    public Mono<HealthAnalysisResponse> generateHealthAnalysis(String symptoms, Integer age, String gender, String lifestyle) {
        String prompt = buildPrompt(symptoms, age, gender, lifestyle);
        log.debug("Sending prompt to Ollama: {}", prompt);

        return callOllama(prompt)
                .map(this::parseResponse)
                .doOnSuccess(response -> log.info("Successfully generated health analysis"))
                .doOnError(error -> log.error("Failed to generate health analysis", error));
    }

    /**
     * Build a structured prompt for the AI model.
     */
    private String buildPrompt(String symptoms, Integer age, String gender, String lifestyle) {
        return String.format(
                "You are a helpful health assistant. Based on the user input, return ONLY valid JSON with:\n" +
                "{\n" +
                "  \"possibleConditions\": [],\n" +
                "  \"homeRemedies\": [],\n" +
                "  \"dietPlan\": [],\n" +
                "  \"exercise\": [],\n" +
                "  \"precautions\": []\n" +
                "}\n" +
                "Do NOT provide diagnosis. Keep it safe and general.\n" +
                "User input:\n" +
                "- Symptoms: %s\n" +
                "- Age: %d\n" +
                "- Gender: %s\n" +
                "- Lifestyle: %s\n" +
                "Provide only the JSON object, no extra text.",
                symptoms, age, gender, lifestyle != null ? lifestyle : "not specified"
        );
    }

    /**
     * Call Ollama API with the given prompt.
     */
    private Mono<String> callOllama(String prompt) {
        OllamaRequest request = new OllamaRequest(ollamaConfig.getModel(), prompt, false);

        return webClient.post()
                .uri("/api/generate")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(OllamaResponse.class)
                .map(OllamaResponse::getResponse)
                .onErrorResume(WebClientResponseException.class, ex -> {
                    log.error("Ollama API error: {} - {}", ex.getStatusCode(), ex.getResponseBodyAsString());
                    return Mono.error(new OllamaServiceException("Ollama service unavailable", ex));
                })
                .onErrorResume(ex -> {
                    log.error("Unexpected error calling Ollama", ex);
                    return Mono.error(new OllamaServiceException("Failed to call Ollama", ex));
                });
    }

    /**
     * Parse the JSON response from Ollama into HealthAnalysisResponse.
     */
    private HealthAnalysisResponse parseResponse(String responseText) {
        try {
            JsonNode root = objectMapper.readTree(responseText);
            HealthAnalysisResponse response = new HealthAnalysisResponse();

            response.setPossibleConditions(extractList(root, "possibleConditions"));
            response.setHomeRemedies(extractList(root, "homeRemedies"));
            response.setDietPlan(extractList(root, "dietPlan"));
            response.setExercise(extractList(root, "exercise"));
            response.setPrecautions(extractList(root, "precautions"));
            response.setDisclaimer("This is not medical advice. Consult a healthcare professional for accurate diagnosis.");

            return response;
        } catch (JsonProcessingException e) {
            log.error("Failed to parse Ollama response: {}", responseText, e);
            throw new OllamaServiceException("Invalid JSON response from AI", e);
        }
    }

    private List<String> extractList(JsonNode node, String field) {
        JsonNode array = node.get(field);
        List<String> list = new ArrayList<>();
        if (array != null && array.isArray()) {
            array.forEach(item -> list.add(item.asText()));
        }
        return list;
    }

    /**
     * Request DTO for Ollama API.
     */
    private static class OllamaRequest {
        private final String model;
        private final String prompt;
        private final boolean stream;

        public OllamaRequest(String model, String prompt, boolean stream) {
            this.model = model;
            this.prompt = prompt;
            this.stream = stream;
        }

        public String getModel() { return model; }
        public String getPrompt() { return prompt; }
        public boolean isStream() { return stream; }
    }

    /**
     * Response DTO for Ollama API.
     */
    private static class OllamaResponse {
        private String response;

        public String getResponse() { return response; }
        public void setResponse(String response) { this.response = response; }
    }

    /**
     * Custom exception for Ollama service errors.
     */
    public static class OllamaServiceException extends RuntimeException {
        public OllamaServiceException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}