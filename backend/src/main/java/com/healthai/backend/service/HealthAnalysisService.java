package com.healthai.backend.service;

import com.healthai.backend.dto.HealthAnalysisRequest;
import com.healthai.backend.dto.HealthAnalysisResponse;
import com.healthai.backend.dto.HealthRecordResponse;
import com.healthai.backend.model.HealthRecord;
import com.healthai.backend.repository.HealthRecordRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

/**
 * Service for health analysis business logic.
 */
@Slf4j
@Service
public class HealthAnalysisService {

    private final OllamaService ollamaService;
    private final HealthRecordRepository healthRecordRepository;

    public HealthAnalysisService(OllamaService ollamaService, HealthRecordRepository healthRecordRepository) {
        this.ollamaService = ollamaService;
        this.healthRecordRepository = healthRecordRepository;
    }

    /**
     * Analyze health input and generate AI-powered suggestions.
     * Stores the request and response in MongoDB.
     */
    public Mono<HealthAnalysisResponse> analyzeHealth(HealthAnalysisRequest request) {
        log.info("Analyzing health for symptoms: {}, age: {}, gender: {}",
                request.getSymptoms(), request.getAge(), request.getGender());

        return ollamaService.generateHealthAnalysis(
                        request.getSymptoms(),
                        request.getAge(),
                        request.getGender(),
                        request.getLifestyle()
                )
                .flatMap(response -> saveHealthRecord(request, response))
                .map(this::mapToResponse);
    }

    /**
     * Save health analysis record to MongoDB.
     */
    private Mono<HealthRecord> saveHealthRecord(HealthAnalysisRequest request, HealthAnalysisResponse response) {
        HealthRecord record = HealthRecord.builder()
                .symptoms(request.getSymptoms())
                .age(request.getAge())
                .gender(request.getGender())
                .lifestyle(request.getLifestyle())
                .possibleConditions(response.getPossibleConditions())
                .homeRemedies(response.getHomeRemedies())
                .dietPlan(response.getDietPlan())
                .exercise(response.getExercise())
                .precautions(response.getPrecautions())
                .disclaimer(response.getDisclaimer())
                .timestamp(LocalDateTime.now())
                .build();

        return healthRecordRepository.save(record)
                .doOnSuccess(saved -> log.debug("Saved health record with id: {}", saved.getId()))
                .doOnError(error -> log.error("Failed to save health record", error));
    }

    /**
     * Retrieve all health records sorted by timestamp descending.
     */
    public Flux<HealthRecordResponse> getAllHealthRecords() {
        return healthRecordRepository.findAllByOrderByTimestampDesc()
                .map(this::mapToRecordResponse);
    }

    /**
     * Map HealthRecord entity to HealthRecordResponse DTO.
     */
    private HealthRecordResponse mapToRecordResponse(HealthRecord record) {
        return HealthRecordResponse.builder()
                .id(record.getId())
                .symptoms(record.getSymptoms())
                .age(record.getAge())
                .gender(record.getGender())
                .lifestyle(record.getLifestyle())
                .possibleConditions(record.getPossibleConditions())
                .homeRemedies(record.getHomeRemedies())
                .dietPlan(record.getDietPlan())
                .exercise(record.getExercise())
                .precautions(record.getPrecautions())
                .disclaimer(record.getDisclaimer())
                .timestamp(record.getTimestamp())
                .build();
    }

    /**
     * Map HealthRecord entity to HealthAnalysisResponse DTO.
     */
    private HealthAnalysisResponse mapToResponse(HealthRecord record) {
        return HealthAnalysisResponse.builder()
                .possibleConditions(record.getPossibleConditions())
                .homeRemedies(record.getHomeRemedies())
                .dietPlan(record.getDietPlan())
                .exercise(record.getExercise())
                .precautions(record.getPrecautions())
                .disclaimer(record.getDisclaimer())
                .build();
    }
}