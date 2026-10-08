package com.moviefinder.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "movie_ratings")
public class MovieRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false, unique = true)
    private Movie movie;

    @Column(name = "tmdb_rating")
    private Double tmdbRating = 0.0;

    @Column(name = "imdb_rating")
    private Double imdbRating = 0.0;

    @Column(name = "rotten_tomatoes_rating")
    private String rottenTomatoesRating = "N/A";

    @Column(name = "metacritic_rating")
    private String metacriticRating = "N/A";

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public MovieRating() {}

    public MovieRating(Movie movie, Double tmdbRating, Double imdbRating, String rottenTomatoesRating, String metacriticRating) {
        this.movie = movie;
        this.tmdbRating = tmdbRating;
        this.imdbRating = imdbRating;
        this.rottenTomatoesRating = rottenTomatoesRating;
        this.metacriticRating = metacriticRating;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Movie getMovie() { return movie; }
    public void setMovie(Movie movie) { this.movie = movie; }

    public Double getTmdbRating() { return tmdbRating; }
    public void setTmdbRating(Double tmdbRating) { this.tmdbRating = tmdbRating; }

    public Double getImdbRating() { return imdbRating; }
    public void setImdbRating(Double imdbRating) { this.imdbRating = imdbRating; }

    public String getRottenTomatoesRating() { return rottenTomatoesRating; }
    public void setRottenTomatoesRating(String rottenTomatoesRating) { this.rottenTomatoesRating = rottenTomatoesRating; }

    public String getMetacriticRating() { return metacriticRating; }
    public void setMetacriticRating(String metacriticRating) { this.metacriticRating = metacriticRating; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
