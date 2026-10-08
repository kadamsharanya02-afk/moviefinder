package com.moviefinder.controller;

import com.moviefinder.dto.MovieSummaryDto;
import com.moviefinder.service.WatchlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping
    public ResponseEntity<List<MovieSummaryDto>> getWatchlist() {
        return ResponseEntity.ok(watchlistService.getUserWatchlist());
    }

    @PostMapping("/{movieId}")
    public ResponseEntity<?> addToWatchlist(@PathVariable Long movieId) {
        try {
            boolean added = watchlistService.addToWatchlist(movieId);
            return ResponseEntity.ok(Map.of(
                    "success", added,
                    "message", added ? "Movie added to your list" : "Movie already in your list",
                    "movieId", movieId
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<?> removeFromWatchlist(@PathVariable Long movieId) {
        try {
            boolean removed = watchlistService.removeFromWatchlist(movieId);
            return ResponseEntity.ok(Map.of(
                    "success", removed,
                    "message", removed ? "Movie removed from your list" : "Movie not found in your list",
                    "movieId", movieId
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/check/{movieId}")
    public ResponseEntity<Map<String, Boolean>> checkWatchlist(@PathVariable Long movieId) {
        boolean inList = watchlistService.isInWatchlist(movieId);
        return ResponseEntity.ok(Map.of("inWatchlist", inList));
    }
}
