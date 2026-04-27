package com.healthai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for health analysis response from AI.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthAnalysisResponse {

    private List<String> possibleConditions;
    private List<String> homeRemedies;
    private List<String> dietPlan;
    private List<String> exercise;
    private List<String> precautions;
    private String disclaimer;
}