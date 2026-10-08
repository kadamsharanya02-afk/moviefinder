package com.moviefinder.dto;

import com.moviefinder.model.VibePreference;
import java.util.List;

public class VibeAnalysisResponse {

    private VibePreference vibes;
    private String explanation;
    private List<String> detectedKeywords;

    public VibeAnalysisResponse() {}

    public VibeAnalysisResponse(VibePreference vibes, String explanation, List<String> detectedKeywords) {
        this.vibes = vibes;
        this.explanation = explanation;
        this.detectedKeywords = detectedKeywords;
    }

    public VibePreference getVibes() { return vibes; }
    public void setVibes(VibePreference vibes) { this.vibes = vibes; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public List<String> getDetectedKeywords() { return detectedKeywords; }
    public void setDetectedKeywords(List<String> detectedKeywords) { this.detectedKeywords = detectedKeywords; }
}
