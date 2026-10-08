package com.moviefinder.service;

import com.moviefinder.dto.RatingRequest;
import com.moviefinder.model.*;
import com.moviefinder.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingService {

    private final UserMovieRatingRepository userMovieRatingRepository;
    private final MovieRepository movieRepository;
    private final MovieFeatureRepository movieFeatureRepository;
    private final UserPreferenceRepository userPreferenceRepository;
    private final AuthService authService;

    public RatingService(UserMovieRatingRepository userMovieRatingRepository,
                         MovieRepository movieRepository,
                         MovieFeatureRepository movieFeatureRepository,
                         UserPreferenceRepository userPreferenceRepository,
                         AuthService authService) {
        this.userMovieRatingRepository = userMovieRatingRepository;
        this.movieRepository = movieRepository;
        this.movieFeatureRepository = movieFeatureRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.authService = authService;
    }

    @Transactional
    public UserMovieRating rateMovie(Long movieId, RatingRequest request) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        if (currentUser == null) {
            throw new IllegalStateException("Authentication required to rate movies");
        }

        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalArgumentException("Movie not found with id: " + movieId));

        UserMovieRating userRating = userMovieRatingRepository
                .findByUserIdAndMovieId(currentUser.getId(), movieId)
                .orElse(new UserMovieRating(currentUser, movie, request.getRating(), request.getReview()));

        userRating.setRating(request.getRating());
        userRating.setReview(request.getReview());
        userRating.setUpdatedAt(LocalDateTime.now());
        UserMovieRating saved = userMovieRatingRepository.save(userRating);

        // Recalculate dynamic personal taste profile based on ratings history
        recalculateUserPreferences(currentUser);

        return saved;
    }

    @Transactional(readOnly = true)
    public List<UserMovieRating> getMovieRatings(Long movieId) {
        return userMovieRatingRepository.findAll().stream()
                .filter(r -> r.getMovie().getId().equals(movieId))
                .toList();
    }

    @Transactional
    public void recalculateUserPreferences(User user) {
        List<UserMovieRating> ratings = userMovieRatingRepository.findByUserIdOrderByUpdatedAtDesc(user.getId());
        if (ratings.isEmpty()) {
            return;
        }

        double totalWeight = 0.0;
        double totalHorror = 0.0;
        double totalRomance = 0.0;
        double totalThriller = 0.0;
        double totalComedy = 0.0;
        double totalDrama = 0.0;
        double totalAction = 0.0;
        double totalMystery = 0.0;
        double totalViolence = 0.0;
        double totalDarkness = 0.0;

        for (UserMovieRating umr : ratings) {
            MovieFeature feature = movieFeatureRepository.findByMovieId(umr.getMovie().getId()).orElse(null);
            if (feature == null) continue;

            // Rating weights: 5->1.5, 4->1.2, 3->1.0, 2->0.5, 1->0.2
            double weight = switch (umr.getRating()) {
                case 5 -> 1.5;
                case 4 -> 1.2;
                case 3 -> 1.0;
                case 2 -> 0.5;
                default -> 0.2;
            };

            totalWeight += weight;
            totalHorror += feature.getHorrorScore() * weight;
            totalRomance += feature.getRomanceScore() * weight;
            totalThriller += feature.getThrillerScore() * weight;
            totalComedy += feature.getComedyScore() * weight;
            totalDrama += feature.getDramaScore() * weight;
            totalAction += feature.getActionScore() * weight;
            totalMystery += feature.getMysteryScore() * weight;
            totalViolence += feature.getViolenceScore() * weight;
            totalDarkness += feature.getDarknessScore() * weight;
        }

        if (totalWeight > 0) {
            UserPreference preference = userPreferenceRepository.findByUserId(user.getId())
                    .orElse(new UserPreference(user));

            preference.setHorrorPref((int) Math.round(totalHorror / totalWeight));
            preference.setRomancePref((int) Math.round(totalRomance / totalWeight));
            preference.setThrillerPref((int) Math.round(totalThriller / totalWeight));
            preference.setComedyPref((int) Math.round(totalComedy / totalWeight));
            preference.setDramaPref((int) Math.round(totalDrama / totalWeight));
            preference.setActionPref((int) Math.round(totalAction / totalWeight));
            preference.setMysteryPref((int) Math.round(totalMystery / totalWeight));
            preference.setViolencePref((int) Math.round(totalViolence / totalWeight));
            preference.setDarknessPref((int) Math.round(totalDarkness / totalWeight));
            preference.setUpdatedAt(LocalDateTime.now());

            userPreferenceRepository.save(preference);
        }
    }
}
