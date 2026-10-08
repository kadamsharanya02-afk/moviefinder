package com.moviefinder.service;

import com.moviefinder.dto.MovieSummaryDto;
import com.moviefinder.dto.UserProfileDto;
import com.moviefinder.model.*;
import com.moviefinder.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserProfileService {

    private final UserRepository userRepository;
    private final UserPreferenceRepository userPreferenceRepository;
    private final UserMovieRatingRepository userMovieRatingRepository;
    private final UserWatchlistRepository userWatchlistRepository;
    private final MovieFeatureRepository movieFeatureRepository;
    private final MovieService movieService;
    private final AuthService authService;

    public UserProfileService(UserRepository userRepository,
                              UserPreferenceRepository userPreferenceRepository,
                              UserMovieRatingRepository userMovieRatingRepository,
                              UserWatchlistRepository userWatchlistRepository,
                              MovieFeatureRepository movieFeatureRepository,
                              MovieService movieService,
                              AuthService authService) {
        this.userRepository = userRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.userMovieRatingRepository = userMovieRatingRepository;
        this.userWatchlistRepository = userWatchlistRepository;
        this.movieFeatureRepository = movieFeatureRepository;
        this.movieService = movieService;
        this.authService = authService;
    }

    @Transactional(readOnly = true)
    public UserProfileDto getUserProfile() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        if (currentUser == null) {
            throw new IllegalStateException("Authentication required");
        }

        UserProfileDto dto = new UserProfileDto();
        dto.setId(currentUser.getId());
        dto.setEmail(currentUser.getEmail());
        dto.setFullName(currentUser.getFullName());
        dto.setMemberSince(currentUser.getCreatedAt());

        long ratingCount = userMovieRatingRepository.countByUserId(currentUser.getId());
        long watchlistCount = userWatchlistRepository.countByUserId(currentUser.getId());
        dto.setTotalRatings((int) ratingCount);
        dto.setTotalWatchlist((int) watchlistCount);

        // Calculate dynamic genre preferences from rated movies & watchlist
        Map<String, Integer> genreTaste = calculateGenrePreferences(currentUser);
        dto.setGenrePreferences(genreTaste);

        // Vibe preferences from user_preferences table
        Map<String, Integer> vibeTaste = calculateVibePreferences(currentUser);
        dto.setVibePreferences(vibeTaste);

        // Recent ratings
        List<UserMovieRating> recentRatings = userMovieRatingRepository.findByUserIdOrderByUpdatedAtDesc(currentUser.getId());
        List<MovieSummaryDto> recentDtos = recentRatings.stream()
                .limit(6)
                .map(r -> {
                    MovieSummaryDto s = movieService.toSummaryDto(r.getMovie(), currentUser);
                    s.setUserRating(r.getRating());
                    return s;
                })
                .collect(Collectors.toList());
        dto.setRecentRatings(recentDtos);

        // Watchlist preview
        List<UserWatchlist> watchlist = userWatchlistRepository.findByUserIdOrderByAddedAtDesc(currentUser.getId());
        List<MovieSummaryDto> watchlistDtos = watchlist.stream()
                .limit(6)
                .map(w -> movieService.toSummaryDto(w.getMovie(), currentUser))
                .collect(Collectors.toList());
        dto.setWatchlist(watchlistDtos);

        return dto;
    }

    private Map<String, Integer> calculateGenrePreferences(User user) {
        List<UserMovieRating> ratings = userMovieRatingRepository.findByUserIdOrderByUpdatedAtDesc(user.getId());
        List<UserWatchlist> watchlist = userWatchlistRepository.findByUserIdOrderByAddedAtDesc(user.getId());

        Map<String, Double> genrePoints = new HashMap<>();
        Map<String, Integer> genreCounts = new HashMap<>();

        // Add points from ratings
        for (UserMovieRating r : ratings) {
            double multiplier = r.getRating() >= 4 ? 1.5 : (r.getRating() == 3 ? 1.0 : 0.4);
            for (Genre g : r.getMovie().getGenres()) {
                genrePoints.put(g.getName(), genrePoints.getOrDefault(g.getName(), 0.0) + (r.getRating() * 20.0 * multiplier));
                genreCounts.put(g.getName(), genreCounts.getOrDefault(g.getName(), 0) + 1);
            }
        }

        // Add points from watchlist (interest signal)
        for (UserWatchlist w : watchlist) {
            for (Genre g : w.getMovie().getGenres()) {
                genrePoints.put(g.getName(), genrePoints.getOrDefault(g.getName(), 0.0) + 60.0);
                genreCounts.put(g.getName(), genreCounts.getOrDefault(g.getName(), 0) + 1);
            }
        }

        if (genrePoints.isEmpty()) {
            // Default initial taste baseline if brand new user
            Map<String, Integer> defaultBaseline = new LinkedHashMap<>();
            defaultBaseline.put("Sci-Fi", 50);
            defaultBaseline.put("Thriller", 50);
            defaultBaseline.put("Drama", 50);
            defaultBaseline.put("Action", 50);
            defaultBaseline.put("Comedy", 50);
            return defaultBaseline;
        }

        // Calculate normalized percentage (0-100%)
        double maxScore = genrePoints.values().stream().max(Double::compare).orElse(1.0);
        if (maxScore <= 0) maxScore = 1.0;

        final double finalMax = maxScore;
        return genrePoints.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(8)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> (int) Math.min(100, Math.round((e.getValue() / finalMax) * 100.0)),
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }

    private Map<String, Integer> calculateVibePreferences(User user) {
        UserPreference pref = userPreferenceRepository.findByUserId(user.getId())
                .orElse(new UserPreference(user));

        Map<String, Integer> map = new LinkedHashMap<>();
        map.put("Horror", pref.getHorrorPref());
        map.put("Romance", pref.getRomancePref());
        map.put("Thriller", pref.getThrillerPref());
        map.put("Comedy", pref.getComedyPref());
        map.put("Drama", pref.getDramaPref());
        map.put("Action", pref.getActionPref());
        map.put("Mystery", pref.getMysteryPref());
        map.put("Violence", pref.getViolencePref());
        map.put("Darkness", pref.getDarknessPref());
        return map;
    }

    @Transactional
    public UserPreference updatePreferences(VibePreference newPrefs) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        if (currentUser == null) {
            throw new IllegalStateException("Authentication required");
        }

        UserPreference pref = userPreferenceRepository.findByUserId(currentUser.getId())
                .orElse(new UserPreference(currentUser));

        pref.setHorrorPref(newPrefs.getHorror());
        pref.setRomancePref(newPrefs.getRomance());
        pref.setThrillerPref(newPrefs.getThriller());
        pref.setComedyPref(newPrefs.getComedy());
        pref.setDramaPref(newPrefs.getDrama());
        pref.setActionPref(newPrefs.getAction());
        pref.setMysteryPref(newPrefs.getMystery());
        pref.setViolencePref(newPrefs.getViolence());
        pref.setDarknessPref(newPrefs.getDarkness());

        return userPreferenceRepository.save(pref);
    }
}
