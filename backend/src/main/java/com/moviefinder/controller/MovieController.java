package com.moviefinder.controller;

import com.moviefinder.dto.MovieDto;
import com.moviefinder.dto.MovieSummaryDto;
import com.moviefinder.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public ResponseEntity<List<MovieSummaryDto>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDto> getMovieById(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<MovieSummaryDto>> searchMovies(@RequestParam(value = "q", required = false) String query) {
        return ResponseEntity.ok(movieService.searchMovies(query));
    }

    @GetMapping("/trending")
    public ResponseEntity<List<MovieSummaryDto>> getTrendingMovies() {
        return ResponseEntity.ok(movieService.getTrendingMovies());
    }

    @GetMapping("/popular")
    public ResponseEntity<List<MovieSummaryDto>> getPopularMovies() {
        return ResponseEntity.ok(movieService.getPopularMovies());
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<MovieSummaryDto>> getTopRatedMovies() {
        return ResponseEntity.ok(movieService.getTopRatedMovies());
    }

    @GetMapping("/featured")
    public ResponseEntity<MovieSummaryDto> getFeaturedMovie() {
        return ResponseEntity.ok(movieService.getFeaturedMovie());
    }

    @GetMapping("/because-you-watched")
    public ResponseEntity<List<MovieSummaryDto>> getBecauseYouWatched() {
        return ResponseEntity.ok(movieService.getBecauseYouWatched());
    }
}
