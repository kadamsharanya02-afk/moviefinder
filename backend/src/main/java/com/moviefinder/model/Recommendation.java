package com.moviefinder.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @Column(name = "recommendation_score", nullable = false)
    private Double recommendationScore;

    @Column(name = "vibe_match_score", nullable = false)
    private Double vibeMatchScore;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String explanation;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Recommendation() {}

    public Recommendation(User user, Movie movie, Double recommendationScore, Double vibeMatchScore, String explanation) {
        this.user = user;
        this.movie = movie;
        this.recommendationScore = recommendationScore;
        this.vibeMatchScore = vibeMatchScore;
        this.explanation = explanation;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Movie getMovie() { return movie; }
    public void setMovie(Movie movie) { this.movie = movie; }

    public Double getRecommendationScore() { return recommendationScore; }
    public void setRecommendationScore(Double recommendationScore) { this.recommendationScore = recommendationScore; }

    public Double getVibeMatchScore() { return vibeMatchScore; }
    public void setVibeMatchScore(Double vibeMatchScore) { this.vibeMatchScore = vibeMatchScore; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
