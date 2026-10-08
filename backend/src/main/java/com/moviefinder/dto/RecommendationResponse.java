package com.moviefinder.dto;

import java.util.List;
import java.util.Map;

public class RecommendationResponse {

    private List<MovieSummaryDto> recommendations;
    private Map<String, Integer> tasteProfile;
    private String querySummary;

    public RecommendationResponse() {}

    public RecommendationResponse(List<MovieSummaryDto> recommendations, Map<String, Integer> tasteProfile, String querySummary) {
        this.recommendations = recommendations;
        this.tasteProfile = tasteProfile;
        this.querySummary = querySummary;
    }

    public List<MovieSummaryDto> getRecommendations() { return recommendations; }
    public void setRecommendations(List<MovieSummaryDto> recommendations) { this.recommendations = recommendations; }

    public Map<String, Integer> getTasteProfile() { return tasteProfile; }
    public void setTasteProfile(Map<String, Integer> tasteProfile) { this.tasteProfile = tasteProfile; }

    public String getQuerySummary() { return querySummary; }
    public void setQuerySummary(String querySummary) { this.querySummary = querySummary; }
}
