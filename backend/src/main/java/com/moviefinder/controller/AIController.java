package com.moviefinder.controller;

import com.moviefinder.dto.VibeAnalysisResponse;
import com.moviefinder.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<VibeAnalysisResponse> analyzeNaturalLanguagePrompt(@RequestBody Map<String, String> payload) {
        String prompt = payload.getOrDefault("prompt", "");
        VibeAnalysisResponse response = aiService.analyzePrompt(prompt);
        return ResponseEntity.ok(response);
    }
}
