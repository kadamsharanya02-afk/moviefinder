package com.moviefinder.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movie_features")
public class MovieFeature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false, unique = true)
    private Movie movie;

    @Column(name = "horror_score", nullable = false)
    private Integer horrorScore = 0;

    @Column(name = "romance_score", nullable = false)
    private Integer romanceScore = 0;

    @Column(name = "thriller_score", nullable = false)
    private Integer thrillerScore = 0;

    @Column(name = "comedy_score", nullable = false)
    private Integer comedyScore = 0;

    @Column(name = "drama_score", nullable = false)
    private Integer dramaScore = 0;

    @Column(name = "action_score", nullable = false)
    private Integer actionScore = 0;

    @Column(name = "mystery_score", nullable = false)
    private Integer mysteryScore = 0;

    @Column(name = "violence_score", nullable = false)
    private Integer violenceScore = 0;

    @Column(name = "darkness_score", nullable = false)
    private Integer darknessScore = 0;

    public MovieFeature() {}

    public MovieFeature(Movie movie, Integer horrorScore, Integer romanceScore, Integer thrillerScore,
                        Integer comedyScore, Integer dramaScore, Integer actionScore,
                        Integer mysteryScore, Integer violenceScore, Integer darknessScore) {
        this.movie = movie;
        this.horrorScore = horrorScore;
        this.romanceScore = romanceScore;
        this.thrillerScore = thrillerScore;
        this.comedyScore = comedyScore;
        this.dramaScore = dramaScore;
        this.actionScore = actionScore;
        this.mysteryScore = mysteryScore;
        this.violenceScore = violenceScore;
        this.darknessScore = darknessScore;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Movie getMovie() { return movie; }
    public void setMovie(Movie movie) { this.movie = movie; }

    public Integer getHorrorScore() { return horrorScore; }
    public void setHorrorScore(Integer horrorScore) { this.horrorScore = horrorScore; }

    public Integer getRomanceScore() { return romanceScore; }
    public void setRomanceScore(Integer romanceScore) { this.romanceScore = romanceScore; }

    public Integer getThrillerScore() { return thrillerScore; }
    public void setThrillerScore(Integer thrillerScore) { this.thrillerScore = thrillerScore; }

    public Integer getComedyScore() { return comedyScore; }
    public void setComedyScore(Integer comedyScore) { this.comedyScore = comedyScore; }

    public Integer getDramaScore() { return dramaScore; }
    public void setDramaScore(Integer dramaScore) { this.dramaScore = dramaScore; }

    public Integer getActionScore() { return actionScore; }
    public void setActionScore(Integer actionScore) { this.actionScore = actionScore; }

    public Integer getMysteryScore() { return mysteryScore; }
    public void setMysteryScore(Integer mysteryScore) { this.mysteryScore = mysteryScore; }

    public Integer getViolenceScore() { return violenceScore; }
    public void setViolenceScore(Integer violenceScore) { this.violenceScore = violenceScore; }

    public Integer getDarknessScore() { return darknessScore; }
    public void setDarknessScore(Integer darknessScore) { this.darknessScore = darknessScore; }
}
