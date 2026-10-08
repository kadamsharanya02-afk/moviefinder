package com.moviefinder.dto;

import com.moviefinder.model.VibePreference;
import java.util.List;
import java.util.Map;

public class MovieDto {

    private Long id;
    private Long tmdbId;
    private String title;
    private String originalTitle;
    private String overview;
    private String posterPath;
    private String backdropPath;
    private String releaseDate;
    private Integer releaseYear;
    private Integer runtime;
    private String director;
    private String trailerUrl;
    private Double tmdbRating;
    private Integer tmdbVoteCount;
    private Double popularity;
    private Double imdbRating;
    private String rottenTomatoesRating;
    private String metacriticRating;
    private List<String> genres;
    private Map<String, Object> ratingsComparison;
    private VibePreference features;
    private boolean inWatchlist;
    private Integer userRating;
    private String userReview;

    public MovieDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTmdbId() { return tmdbId; }
    public void setTmdbId(Long tmdbId) { this.tmdbId = tmdbId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getOriginalTitle() { return originalTitle; }
    public void setOriginalTitle(String originalTitle) { this.originalTitle = originalTitle; }

    public String getOverview() { return overview; }
    public void setOverview(String overview) { this.overview = overview; }

    public String getPosterPath() { return posterPath; }
    public void setPosterPath(String posterPath) { this.posterPath = posterPath; }

    public String getBackdropPath() { return backdropPath; }
    public void setBackdropPath(String backdropPath) { this.backdropPath = backdropPath; }

    public String getReleaseDate() { return releaseDate; }
    public void setReleaseDate(String releaseDate) { this.releaseDate = releaseDate; }

    public Integer getReleaseYear() { return releaseYear; }
    public void setReleaseYear(Integer releaseYear) { this.releaseYear = releaseYear; }

    public Integer getRuntime() { return runtime; }
    public void setRuntime(Integer runtime) { this.runtime = runtime; }

    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }

    public String getTrailerUrl() { return trailerUrl; }
    public void setTrailerUrl(String trailerUrl) { this.trailerUrl = trailerUrl; }

    public Double getTmdbRating() { return tmdbRating; }
    public void setTmdbRating(Double tmdbRating) { this.tmdbRating = tmdbRating; }

    public Integer getTmdbVoteCount() { return tmdbVoteCount; }
    public void setTmdbVoteCount(Integer tmdbVoteCount) { this.tmdbVoteCount = tmdbVoteCount; }

    public Double getPopularity() { return popularity; }
    public void setPopularity(Double popularity) { this.popularity = popularity; }

    public Double getImdbRating() { return imdbRating; }
    public void setImdbRating(Double imdbRating) { this.imdbRating = imdbRating; }

    public String getRottenTomatoesRating() { return rottenTomatoesRating; }
    public void setRottenTomatoesRating(String rottenTomatoesRating) { this.rottenTomatoesRating = rottenTomatoesRating; }

    public String getMetacriticRating() { return metacriticRating; }
    public void setMetacriticRating(String metacriticRating) { this.metacriticRating = metacriticRating; }

    public List<String> getGenres() { return genres; }
    public void setGenres(List<String> genres) { this.genres = genres; }

    public Map<String, Object> getRatingsComparison() { return ratingsComparison; }
    public void setRatingsComparison(Map<String, Object> ratingsComparison) { this.ratingsComparison = ratingsComparison; }

    public VibePreference getFeatures() { return features; }
    public void setFeatures(VibePreference features) { this.features = features; }

    public boolean isInWatchlist() { return inWatchlist; }
    public void setInWatchlist(boolean inWatchlist) { this.inWatchlist = inWatchlist; }

    public Integer getUserRating() { return userRating; }
    public void setUserRating(Integer userRating) { this.userRating = userRating; }

    public String getUserReview() { return userReview; }
    public void setUserReview(String userReview) { this.userReview = userReview; }
}
