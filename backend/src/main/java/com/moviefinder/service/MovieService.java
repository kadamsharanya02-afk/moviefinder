package com.moviefinder.service;

import com.moviefinder.dto.MovieDto;
import com.moviefinder.dto.MovieSummaryDto;
import com.moviefinder.model.*;
import com.moviefinder.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieRatingRepository movieRatingRepository;
    private final MovieFeatureRepository movieFeatureRepository;
    private final UserMovieRatingRepository userMovieRatingRepository;
    private final UserWatchlistRepository userWatchlistRepository;
    private final AuthService authService;

    public MovieService(MovieRepository movieRepository,
                        MovieRatingRepository movieRatingRepository,
                        MovieFeatureRepository movieFeatureRepository,
                        UserMovieRatingRepository userMovieRatingRepository,
                        UserWatchlistRepository userWatchlistRepository,
                        AuthService authService) {
        this.movieRepository = movieRepository;
        this.movieRatingRepository = movieRatingRepository;
        this.movieFeatureRepository = movieFeatureRepository;
        this.userMovieRatingRepository = userMovieRatingRepository;
        this.userWatchlistRepository = userWatchlistRepository;
        this.authService = authService;
    }

    @Transactional(readOnly = true)
    public List<MovieSummaryDto> getAllMovies() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        return movieRepository.findAll().stream()
                .map(m -> toSummaryDto(m, currentUser))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MovieDto getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Movie not found with id: " + id));
        User currentUser = authService.getCurrentAuthenticatedUser();
        return toDetailDto(movie, currentUser);
    }

    @Transactional(readOnly = true)
    public List<MovieSummaryDto> searchMovies(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllMovies();
        }
        User currentUser = authService.getCurrentAuthenticatedUser();
        return movieRepository.searchMovies(query.trim()).stream()
                .map(m -> toSummaryDto(m, currentUser))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MovieSummaryDto> getTrendingMovies() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        return movieRepository.findTop10ByOrderByReleaseYearDesc().stream()
                .map(m -> toSummaryDto(m, currentUser))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MovieSummaryDto> getPopularMovies() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        return movieRepository.findTop10ByOrderByPopularityDesc().stream()
                .map(m -> toSummaryDto(m, currentUser))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MovieSummaryDto> getTopRatedMovies() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        return movieRepository.findTop10ByOrderByTmdbRatingDesc().stream()
                .map(m -> toSummaryDto(m, currentUser))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MovieSummaryDto getFeaturedMovie() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        // Featured movie: highest popularity / prominent title (e.g. Interstellar or Inception)
        List<Movie> popular = movieRepository.findTop10ByOrderByPopularityDesc();
        if (popular.isEmpty()) {
            return null;
        }
        return toSummaryDto(popular.get(0), currentUser);
    }

    @Transactional(readOnly = true)
    public List<MovieSummaryDto> getBecauseYouWatched() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        if (currentUser == null) {
            return getPopularMovies();
        }

        List<UserMovieRating> userRatings = userMovieRatingRepository.findByUserIdOrderByUpdatedAtDesc(currentUser.getId());
        if (userRatings.isEmpty()) {
            // Check watchlist
            List<UserWatchlist> watchlist = userWatchlistRepository.findByUserIdOrderByAddedAtDesc(currentUser.getId());
            if (!watchlist.isEmpty()) {
                Movie seedMovie = watchlist.get(0).getMovie();
                return getSimilarMovies(seedMovie, currentUser);
            }
            return getPopularMovies();
        }

        Movie lastWatched = userRatings.get(0).getMovie();
        return getSimilarMovies(lastWatched, currentUser);
    }

    private List<MovieSummaryDto> getSimilarMovies(Movie seedMovie, User currentUser) {
        List<Long> genreIds = seedMovie.getGenres().stream().map(Genre::getId).collect(Collectors.toList());
        if (genreIds.isEmpty()) {
            return getPopularMovies();
        }

        return movieRepository.findByGenreIds(genreIds).stream()
                .filter(m -> !m.getId().equals(seedMovie.getId()))
                .limit(8)
                .map(m -> {
                    MovieSummaryDto dto = toSummaryDto(m, currentUser);
                    dto.setExplanation("Because you rated or saved " + seedMovie.getTitle());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public MovieSummaryDto toSummaryDto(Movie movie, User currentUser) {
        MovieSummaryDto dto = new MovieSummaryDto();
        dto.setId(movie.getId());
        dto.setTmdbId(movie.getTmdbId());
        dto.setTitle(movie.getTitle());
        dto.setOverview(movie.getOverview());
        dto.setPosterPath(movie.getPosterPath());
        dto.setBackdropPath(movie.getBackdropPath());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setTmdbRating(movie.getTmdbRating());
        dto.setImdbRating(movie.getImdbRating());
        dto.setGenres(movie.getGenres().stream().map(Genre::getName).collect(Collectors.toList()));

        if (currentUser != null) {
            dto.setInWatchlist(userWatchlistRepository.existsByUserIdAndMovieId(currentUser.getId(), movie.getId()));
            userMovieRatingRepository.findByUserIdAndMovieId(currentUser.getId(), movie.getId())
                    .ifPresent(r -> dto.setUserRating(r.getRating()));
        }

        return dto;
    }

    public MovieDto toDetailDto(Movie movie, User currentUser) {
        MovieDto dto = new MovieDto();
        dto.setId(movie.getId());
        dto.setTmdbId(movie.getTmdbId());
        dto.setTitle(movie.getTitle());
        dto.setOriginalTitle(movie.getOriginalTitle());
        dto.setOverview(movie.getOverview());
        dto.setPosterPath(movie.getPosterPath());
        dto.setBackdropPath(movie.getBackdropPath());
        dto.setReleaseDate(movie.getReleaseDate());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setRuntime(movie.getRuntime());
        dto.setDirector(movie.getDirector());
        dto.setTrailerUrl(movie.getTrailerUrl());
        dto.setTmdbRating(movie.getTmdbRating());
        dto.setTmdbVoteCount(movie.getTmdbVoteCount());
        dto.setPopularity(movie.getPopularity());
        dto.setImdbRating(movie.getImdbRating());
        dto.setRottenTomatoesRating(movie.getRottenTomatoesRating());
        dto.setMetacriticRating(movie.getMetacriticRating());
        dto.setGenres(movie.getGenres().stream().map(Genre::getName).collect(Collectors.toList()));

        // Multi-source rating comparison map
        Map<String, Object> comparison = new LinkedHashMap<>();
        comparison.put("TMDB", movie.getTmdbRating() != null ? String.format("%.1f/10", movie.getTmdbRating()) : "N/A");
        comparison.put("IMDb", movie.getImdbRating() != null ? String.format("%.1f/10", movie.getImdbRating()) : "N/A");
        comparison.put("Rotten Tomatoes", movie.getRottenTomatoesRating() != null ? movie.getRottenTomatoesRating() : "N/A");
        comparison.put("Metacritic", movie.getMetacriticRating() != null ? movie.getMetacriticRating() : "N/A");
        dto.setRatingsComparison(comparison);

        // Movie features vector
        movieFeatureRepository.findByMovieId(movie.getId()).ifPresent(f -> {
            VibePreference vp = new VibePreference(
                    f.getHorrorScore(), f.getRomanceScore(), f.getThrillerScore(),
                    f.getComedyScore(), f.getDramaScore(), f.getActionScore(),
                    f.getMysteryScore(), f.getViolenceScore(), f.getDarknessScore()
            );
            dto.setFeatures(vp);
        });

        if (currentUser != null) {
            dto.setInWatchlist(userWatchlistRepository.existsByUserIdAndMovieId(currentUser.getId(), movie.getId()));
            userMovieRatingRepository.findByUserIdAndMovieId(currentUser.getId(), movie.getId()).ifPresent(r -> {
                dto.setUserRating(r.getRating());
                dto.setUserReview(r.getReview());
            });
        }

        return dto;
    }
}
