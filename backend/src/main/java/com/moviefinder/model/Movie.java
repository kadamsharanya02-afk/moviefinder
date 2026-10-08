package com.moviefinder.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tmdb_id", unique = true)
    private Long tmdbId;

    @Column(nullable = false)
    private String title;

    @Column(name = "original_title")
    private String originalTitle;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @Column(name = "poster_path")
    private String posterPath;

    @Column(name = "backdrop_path")
    private String backdropPath;

    @Column(name = "release_date")
    private String releaseDate;

    @Column(name = "release_year")
    private Integer releaseYear;

    private Integer runtime;

    private String director;

    @Column(name = "trailer_url")
    private String trailerUrl;

    @Column(name = "tmdb_rating")
    private Double tmdbRating = 0.0;

    @Column(name = "tmdb_vote_count")
    private Integer tmdbVoteCount = 0;

    private Double popularity = 0.0;

    @Column(name = "imdb_rating")
    private Double imdbRating = 0.0;

    @Column(name = "rotten_tomatoes_rating")
    private String rottenTomatoesRating = "N/A";

    @Column(name = "metacritic_rating")
    private String metacriticRating = "N/A";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "movie_genres",
        joinColumns = @JoinColumn(name = "movie_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();

    public Movie() {}

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Set<Genre> getGenres() { return genres; }
    public void setGenres(Set<Genre> genres) { this.genres = genres; }
}
