package com.moviefinder.controller;

import com.moviefinder.dto.RecommendationResponse;
import com.moviefinder.dto.VibeSearchRequest;
import com.moviefinder.model.User;
import com.moviefinder.model.UserPreference;
import com.moviefinder.repository.UserPreferenceRepository;
import com.moviefinder.service.AuthService;
import com.moviefinder.service.RecommendationEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationEngineService recommendationEngineService;
    private final AuthService authService;
    private final UserPreferenceRepository userPreferenceRepository;

    public RecommendationController(RecommendationEngineService recommendationEngineService,
                                    AuthService authService,
                                    UserPreferenceRepository userPreferenceRepository) {
        this.recommendationEngineService = recommendationEngineService;
        this.authService = authService;
        this.userPreferenceRepository = userPreferenceRepository;
    }

    @PostMapping("/vibe")
    public ResponseEntity<RecommendationResponse> getVibeRecommendations(@RequestBody VibeSearchRequest request) {
        RecommendationResponse response = recommendationEngineService.getRecommendationsByVibes(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<RecommendationResponse> getPersonalRecommendations() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        VibeSearchRequest request = new VibeSearchRequest();

        if (currentUser != null) {
            UserPreference pref = userPreferenceRepository.findByUserId(currentUser.getId()).orElse(null);
            if (pref != null) {
                request.setHorror(pref.getHorrorPref());
                request.setRomance(pref.getRomancePref());
                request.setThriller(pref.getThrillerPref());
                request.setComedy(pref.getComedyPref());
                request.setDrama(pref.getDramaPref());
                request.setAction(pref.getActionPref());
                request.setMystery(pref.getMysteryPref());
                request.setViolence(pref.getViolencePref());
                request.setDarkness(pref.getDarknessPref());
            }
        }

        RecommendationResponse response = recommendationEngineService.getRecommendationsByVibes(request);
        return ResponseEntity.ok(response);
    }
}
