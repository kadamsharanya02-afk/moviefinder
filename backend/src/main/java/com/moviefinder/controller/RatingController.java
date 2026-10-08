package com.moviefinder.controller;

import com.moviefinder.dto.RatingRequest;
import com.moviefinder.model.UserMovieRating;
import com.moviefinder.service.RatingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/{id}/rate")
    public ResponseEntity<?> rateMovie(@PathVariable Long id, @Valid @RequestBody RatingRequest request) {
        try {
            UserMovieRating rating = ratingService.rateMovie(id, request);
            return ResponseEntity.ok(Map.of(
                    "message", "Rating submitted successfully",
                    "rating", rating.getRating(),
                    "movieId", id
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/{id}/ratings")
    public ResponseEntity<List<UserMovieRating>> getMovieRatings(@PathVariable Long id) {
        return ResponseEntity.ok(ratingService.getMovieRatings(id));
    }
}
