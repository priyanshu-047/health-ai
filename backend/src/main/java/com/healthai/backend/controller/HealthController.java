package com.healthai.backend.controller;

import com.healthai.backend.dto.HealthAnalysisRequest;
import com.healthai.backend.dto.HealthAnalysisResponse;
import com.healthai.backend.dto.HealthRecordResponse;
import com.healthai.backend.service.HealthAnalysisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

/**
 * REST controller for health analysis endpoints.
 */
@Slf4j
@RestController
@RequestMapping("/health")
@Tag(name = "Health Analysis", description = "APIs for health analysis using AI")
public class HealthController {

    private final HealthAnalysisService healthAnalysisService;

    public HealthController(HealthAnalysisService healthAnalysisService) {
        this.healthAnalysisService = healthAnalysisService;
    }

    @Operation(
            summary = "Analyze health symptoms",
            description = "Accepts user health inputs (symptoms, age, gender, lifestyle) and returns AI-generated health suggestions."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Analysis successful",
                    content = @Content(schema = @Schema(implementation = HealthAnalysisResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(value = "/analyze", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public Mono<HealthAnalysisResponse> analyzeHealth(@Valid @RequestBody HealthAnalysisRequest request) {
        log.info("Received health analysis request for symptoms: {}", request.getSymptoms());
        return healthAnalysisService.analyzeHealth(request);
    }

    @Operation(
            summary = "Get analysis history",
            description = "Retrieves all previous health analysis records sorted by timestamp descending."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "History retrieved successfully",
                    content = @Content(schema = @Schema(implementation = HealthRecordResponse.class)))
    })
    @GetMapping(value = "/history", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public Flux<HealthRecordResponse> getHealthHistory() {
        log.info("Fetching health analysis history");
        return healthAnalysisService.getAllHealthRecords();
    }

    @Operation(
            summary = "Save health analysis manually",
            description = "Endpoint to manually save a health analysis record (optional)."
    )
    @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<String> saveHealthAnalysis(@Valid @RequestBody HealthAnalysisRequest request) {
        log.info("Manual save request for symptoms: {}", request.getSymptoms());
        // For now, just delegate to analyzeHealth and return the record ID
        return healthAnalysisService.analyzeHealth(request)
                .map(response -> "Health analysis saved successfully");
    }
}