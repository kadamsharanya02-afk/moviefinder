package com.moviefinder.dto;

import java.util.List;

public class MovieSummaryDto {

    private Long id;
    private Long tmdbId;
    private String title;
    private String overview;
    private String posterPath;
    private String backdropPath;
    private Integer releaseYear;
    private Double tmdbRating;
    private Double imdbRating;
    private List<String> genres;
    private Double matchScore;
    private String explanation;
    private boolean inWatchlist;
    private Integer userRating;

    public MovieSummaryDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTmdbId() { return tmdbId; }
    public void setTmdbId(Long tmdbId) { this.tmdbId = tmdbId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getOverview() { return overview; }
    public void setOverview(String overview) { this.overview = overview; }

    public String getPosterPath() { return posterPath; }
    public void setPosterPath(String posterPath) { this.posterPath = posterPath; }

    public String getBackdropPath() { return backdropPath; }
    public void setBackdropPath(String backdropPath) { this.backdropPath = backdropPath; }

    public Integer getReleaseYear() { return releaseYear; }
    public void setReleaseYear(Integer releaseYear) { this.releaseYear = releaseYear; }

    public Double getTmdbRating() { return tmdbRating; }
    public void setTmdbRating(Double tmdbRating) { this.tmdbRating = tmdbRating; }

    public Double getImdbRating() { return imdbRating; }
    public void setImdbRating(Double imdbRating) { this.imdbRating = imdbRating; }

    public List<String> getGenres() { return genres; }
    public void setGenres(List<String> genres) { this.genres = genres; }

    public Double getMatchScore() { return matchScore; }
    public void setMatchScore(Double matchScore) { this.matchScore = matchScore; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public boolean isInWatchlist() { return inWatchlist; }
    public void setInWatchlist(boolean inWatchlist) { this.inWatchlist = inWatchlist; }

    public Integer getUserRating() { return userRating; }
    public void setUserRating(Integer userRating) { this.userRating = userRating; }
}
