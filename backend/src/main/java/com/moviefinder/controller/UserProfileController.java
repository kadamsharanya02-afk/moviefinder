package com.moviefinder.controller;

import com.moviefinder.dto.UserProfileDto;
import com.moviefinder.model.UserPreference;
import com.moviefinder.model.VibePreference;
import com.moviefinder.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            UserProfileDto profile = userProfileService.getUserProfile();
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/preferences")
    public ResponseEntity<?> getUserPreferences() {
        try {
            UserProfileDto profile = userProfileService.getUserProfile();
            return ResponseEntity.ok(profile.getVibePreferences());
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/preferences")
    public ResponseEntity<?> updateUserPreferences(@RequestBody VibePreference preferences) {
        try {
            UserPreference updated = userProfileService.updatePreferences(preferences);
            return ResponseEntity.ok(Map.of(
                    "message", "Preferences updated successfully",
                    "updatedAt", updated.getUpdatedAt()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
