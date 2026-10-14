package com.moviefinder.service;

import com.moviefinder.dto.MovieSummaryDto;
import com.moviefinder.dto.RecommendationResponse;
import com.moviefinder.dto.VibeSearchRequest;
import com.moviefinder.model.*;
import com.moviefinder.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationEngineService {

    private final MovieRepository movieRepository;
    private final MovieFeatureRepository movieFeatureRepository;
    private final UserPreferenceRepository userPreferenceRepository;
    private final UserMovieRatingRepository userMovieRatingRepository;
    private final RecommendationRepository recommendationRepository;
    private final MovieService movieService;
    private final AuthService authService;

    public RecommendationEngineService(MovieRepository movieRepository,
                                       MovieFeatureRepository movieFeatureRepository,
                                       UserPreferenceRepository userPreferenceRepository,
                                       UserMovieRatingRepository userMovieRatingRepository,
                                       RecommendationRepository recommendationRepository,
                                       MovieService movieService,
                                       AuthService authService) {
        this.movieRepository = movieRepository;
        this.movieFeatureRepository = movieFeatureRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.userMovieRatingRepository = userMovieRatingRepository;
        this.recommendationRepository = recommendationRepository;
        this.movieService = movieService;
        this.authService = authService;
    }

    @Transactional
    public RecommendationResponse getRecommendationsByVibes(VibeSearchRequest request) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        List<Movie> allMovies = movieRepository.findAll();
        Map<Long, MovieFeature> featureMap = movieFeatureRepository.findAll().stream()
                .collect(Collectors.toMap(f -> f.getMovie().getId(), f -> f));

        UserPreference userPref = currentUser != null
                ? userPreferenceRepository.findByUserId(currentUser.getId()).orElse(null)
                : null;

        String promptLower = request.getPrompt() != null ? request.getPrompt().toLowerCase() : "";
        boolean promptWantsBollywood = promptLower.contains("bollywood") || promptLower.contains("hindi") || promptLower.contains("indian") || promptLower.contains("desi");
        boolean promptWantsSeries = promptLower.contains("series") || promptLower.contains("show") || promptLower.contains("season") || promptLower.contains("episodes");

        List<ScoredMovie> scoredMovies = new ArrayList<>();

        for (Movie movie : allMovies) {
            // Optional Filter by Content Type (MOVIE vs TV_SERIES)
            if (request.getContentType() != null && !request.getContentType().equalsIgnoreCase("ALL")) {
                if (movie.getContentType() != null && !movie.getContentType().equalsIgnoreCase(request.getContentType())) {
                    continue;
                }
            }
            // Optional Filter by Industry (Bollywood vs Hollywood)
            if (request.getIndustry() != null && !request.getIndustry().equalsIgnoreCase("ALL")) {
                if (movie.getIndustry() != null && !movie.getIndustry().equalsIgnoreCase(request.getIndustry())) {
                    continue;
                }
            }

            MovieFeature mf = featureMap.get(movie.getId());
            if (mf == null) continue;

            // 1. Vibe Similarity Score (0 - 100)
            double vibeScore = calculateVibeSimilarity(request, mf);

            // 2. User Historical Taste Match (0 - 100)
            double userTasteScore = calculateUserTasteScore(userPref, mf);

            // 3. Genre Match Score (0 - 100)
            double genreScore = calculateGenreScore(movie, currentUser);

            // 4. Rating Quality Score (0 - 100)
            double ratingScore = calculateRatingQuality(movie);

            // 5. Popularity Factor (0 - 100)
            double popScore = Math.min(100.0, (movie.getPopularity() != null ? movie.getPopularity() : 50.0) * 0.7);

            // Combined Weighted Final Recommendation Score
            // Vibe Match: 40%, User Taste: 25%, Genre Match: 15%, Rating Quality: 15%, Popularity: 5%
            double finalScore = (0.40 * vibeScore) +
                                (0.25 * userTasteScore) +
                                (0.15 * genreScore) +
                                (0.15 * ratingScore) +
                                (0.05 * popScore);

            // Boost for explicit intent matches (Bollywood / TV Series)
            if (promptWantsBollywood && "Bollywood".equalsIgnoreCase(movie.getIndustry())) {
                finalScore = Math.min(99.0, finalScore + 18.0);
            }
            if (promptWantsSeries && "TV_SERIES".equalsIgnoreCase(movie.getContentType())) {
                finalScore = Math.min(99.0, finalScore + 18.0);
            }

            String explanation = buildExplanation(movie, mf, request, userPref, vibeScore, finalScore);

            scoredMovies.add(new ScoredMovie(movie, finalScore, vibeScore, explanation));
        }

        // Sort descending by final recommendation score
        scoredMovies.sort((a, b) -> Double.compare(b.finalScore, a.finalScore));

        List<MovieSummaryDto> results = scoredMovies.stream()
                .limit(12)
                .map(sm -> {
                    MovieSummaryDto dto = movieService.toSummaryDto(sm.movie, currentUser);
                    dto.setMatchScore(Math.round(sm.finalScore * 10.0) / 10.0);
                    dto.setExplanation(sm.explanation);
                    return dto;
                })
                .collect(Collectors.toList());

        // Save top recommendations to MySQL for logged-in user
        if (currentUser != null) {
            try {
                recommendationRepository.deleteByUserId(currentUser.getId());
                for (int i = 0; i < Math.min(6, results.size()); i++) {
                    MovieSummaryDto item = results.get(i);
                    Movie m = movieRepository.findById(item.getId()).orElse(null);
                    if (m != null) {
                        recommendationRepository.save(new Recommendation(
                                currentUser, m, item.getMatchScore(),
                                scoredMovies.get(i).vibeScore, item.getExplanation()
                        ));
                    }
                }
            } catch (Exception e) {
                // Log and continue
            }
        }

        Map<String, Integer> tasteMap = new LinkedHashMap<>();
        tasteMap.put("Horror", request.getHorror());
        tasteMap.put("Romance", request.getRomance());
        tasteMap.put("Thriller", request.getThriller());
        tasteMap.put("Comedy", request.getComedy());
        tasteMap.put("Drama", request.getDrama());
        tasteMap.put("Action", request.getAction());
        tasteMap.put("Mystery", request.getMystery());
        tasteMap.put("Violence", request.getViolence());
        tasteMap.put("Darkness", request.getDarkness());

        String summary = String.format("Found %d movies closely matching your mood profile.", results.size());
        return new RecommendationResponse(results, tasteMap, summary);
    }

    private double calculateVibeSimilarity(VibeSearchRequest u, MovieFeature m) {
        // Euclidean distance across 9 dimensions
        double sumSq = 0.0;
        sumSq += Math.pow(u.getHorror() - m.getHorrorScore(), 2);
        sumSq += Math.pow(u.getRomance() - m.getRomanceScore(), 2);
        sumSq += Math.pow(u.getThriller() - m.getThrillerScore(), 2);
        sumSq += Math.pow(u.getComedy() - m.getComedyScore(), 2);
        sumSq += Math.pow(u.getDrama() - m.getDramaScore(), 2);
        sumSq += Math.pow(u.getAction() - m.getActionScore(), 2);
        sumSq += Math.pow(u.getMystery() - m.getMysteryScore(), 2);
        sumSq += Math.pow(u.getViolence() - m.getViolenceScore(), 2);
        sumSq += Math.pow(u.getDarkness() - m.getDarknessScore(), 2);

        // Maximum possible distance = sqrt(9 * 100^2) = 300
        double dist = Math.sqrt(sumSq);
        double maxDist = Math.sqrt(9 * 10000.0);
        double similarity = 100.0 * (1.0 - (dist / maxDist));
        return Math.max(0.0, Math.min(100.0, similarity));
    }

    private double calculateUserTasteScore(UserPreference pref, MovieFeature m) {
        if (pref == null) return 70.0; // Neutral baseline for unauthenticated or new users

        double sumSq = 0.0;
        sumSq += Math.pow(pref.getHorrorPref() - m.getHorrorScore(), 2);
        sumSq += Math.pow(pref.getRomancePref() - m.getRomanceScore(), 2);
        sumSq += Math.pow(pref.getThrillerPref() - m.getThrillerScore(), 2);
        sumSq += Math.pow(pref.getComedyPref() - m.getComedyScore(), 2);
        sumSq += Math.pow(pref.getDramaPref() - m.getDramaScore(), 2);
        sumSq += Math.pow(pref.getActionPref() - m.getActionScore(), 2);
        sumSq += Math.pow(pref.getMysteryPref() - m.getMysteryScore(), 2);
        sumSq += Math.pow(pref.getViolencePref() - m.getViolenceScore(), 2);
        sumSq += Math.pow(pref.getDarknessPref() - m.getDarknessScore(), 2);

        double dist = Math.sqrt(sumSq);
        double maxDist = Math.sqrt(9 * 10000.0);
        return Math.max(0.0, Math.min(100.0, 100.0 * (1.0 - (dist / maxDist))));
    }

    private double calculateGenreScore(Movie movie, User user) {
        if (user == null) return 75.0;
        List<UserMovieRating> userRatings = userMovieRatingRepository.findByUserIdOrderByUpdatedAtDesc(user.getId());
        if (userRatings.isEmpty()) return 75.0;

        Set<String> userTopGenres = userRatings.stream()
                .filter(r -> r.getRating() >= 4)
                .flatMap(r -> r.getMovie().getGenres().stream())
                .map(Genre::getName)
                .collect(Collectors.toSet());

        if (userTopGenres.isEmpty()) return 75.0;

        long matchCount = movie.getGenres().stream()
                .map(Genre::getName)
                .filter(userTopGenres::contains)
                .count();

        return matchCount > 0 ? Math.min(100.0, 60.0 + (matchCount * 20.0)) : 40.0;
    }

    private double calculateRatingQuality(Movie movie) {
        double tmdb = (movie.getTmdbRating() != null ? movie.getTmdbRating() : 7.0) * 10.0;
        double imdb = (movie.getImdbRating() != null ? movie.getImdbRating() : 7.0) * 10.0;
        return (tmdb * 0.4) + (imdb * 0.6);
    }

    private String buildExplanation(Movie movie, MovieFeature mf, VibeSearchRequest u, UserPreference userPref, double vibeScore, double finalScore) {
        List<String> matchedHighlights = new ArrayList<>();

        // Check which vibes align strongly
        if (u.getThriller() >= 60 && mf.getThrillerScore() >= 65) {
            matchedHighlights.add("high suspense and thriller pace");
        }
        if (u.getHorror() >= 60 && mf.getHorrorScore() >= 65) {
            matchedHighlights.add("creepy atmospheric tension");
        }
        if (u.getRomance() >= 60 && mf.getRomanceScore() >= 65) {
            matchedHighlights.add("romantic emotional depth");
        }
        if (u.getMystery() >= 60 && mf.getMysteryScore() >= 65) {
            matchedHighlights.add("intricate mystery puzzle");
        }
        if (u.getAction() >= 60 && mf.getActionScore() >= 65) {
            matchedHighlights.add("high-octane action sequence");
        }
        if (u.getComedy() >= 60 && mf.getComedyScore() >= 60) {
            matchedHighlights.add("clever humor and wit");
        }
        if (u.getDarkness() >= 65 && mf.getDarknessScore() >= 70) {
            matchedHighlights.add("dark, gritty tone");
        }
        if (u.getViolence() <= 30 && mf.getViolenceScore() <= 35) {
            matchedHighlights.add("restrained violence level");
        }

        StringBuilder sb = new StringBuilder();
        sb.append(String.format("%.0f%% Match: ", finalScore));

        if (!matchedHighlights.isEmpty()) {
            sb.append("Strong alignment with your desired ");
            sb.append(String.join(" and ", matchedHighlights.subList(0, Math.min(2, matchedHighlights.size()))));
            sb.append(". ");
        } else {
            sb.append("Well-balanced fit for your current vibe preferences. ");
        }

        if (movie.getDirector() != null && !movie.getDirector().isEmpty()) {
            sb.append(String.format("Directed by %s", movie.getDirector()));
        }

        if (movie.getImdbRating() != null && movie.getImdbRating() >= 8.0) {
            sb.append(String.format(", holding an impressive %.1f IMDb rating.", movie.getImdbRating()));
        } else {
            sb.append(".");
        }

        return sb.toString();
    }

    private static class ScoredMovie {
        final Movie movie;
        final double finalScore;
        final double vibeScore;
        final String explanation;

        ScoredMovie(Movie movie, double finalScore, double vibeScore, String explanation) {
            this.movie = movie;
            this.finalScore = finalScore;
            this.vibeScore = vibeScore;
            this.explanation = explanation;
        }
    }
}
