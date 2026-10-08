package com.moviefinder.service;

import com.moviefinder.dto.MovieSummaryDto;
import com.moviefinder.model.Movie;
import com.moviefinder.model.User;
import com.moviefinder.model.UserWatchlist;
import com.moviefinder.repository.MovieRepository;
import com.moviefinder.repository.UserWatchlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WatchlistService {

    private final UserWatchlistRepository userWatchlistRepository;
    private final MovieRepository movieRepository;
    private final AuthService authService;
    private final MovieService movieService;

    public WatchlistService(UserWatchlistRepository userWatchlistRepository,
                            MovieRepository movieRepository,
                            AuthService authService,
                            MovieService movieService) {
        this.userWatchlistRepository = userWatchlistRepository;
        this.movieRepository = movieRepository;
        this.authService = authService;
        this.movieService = movieService;
    }

    @Transactional
    public boolean addToWatchlist(Long movieId) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        if (currentUser == null) {
            throw new IllegalStateException("Authentication required");
        }

        if (userWatchlistRepository.existsByUserIdAndMovieId(currentUser.getId(), movieId)) {
            return false; // Already in list
        }

        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalArgumentException("Movie not found with id: " + movieId));

        userWatchlistRepository.save(new UserWatchlist(currentUser, movie));
        return true;
    }

    @Transactional
    public boolean removeFromWatchlist(Long movieId) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        if (currentUser == null) {
            throw new IllegalStateException("Authentication required");
        }

        if (!userWatchlistRepository.existsByUserIdAndMovieId(currentUser.getId(), movieId)) {
            return false;
        }

        userWatchlistRepository.deleteByUserIdAndMovieId(currentUser.getId(), movieId);
        return true;
    }

    @Transactional(readOnly = true)
    public List<MovieSummaryDto> getUserWatchlist() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        if (currentUser == null) {
            throw new IllegalStateException("Authentication required");
        }

        return userWatchlistRepository.findByUserIdOrderByAddedAtDesc(currentUser.getId()).stream()
                .map(w -> {
                    MovieSummaryDto dto = movieService.toSummaryDto(w.getMovie(), currentUser);
                    dto.setInWatchlist(true);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public boolean isInWatchlist(Long movieId) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        if (currentUser == null) return false;
        return userWatchlistRepository.existsByUserIdAndMovieId(currentUser.getId(), movieId);
    }
}
