package com.moviefinder.model;

import jakarta.persistence.*;

@Entity
@Table(name = "genres")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tmdb_genre_id", unique = true)
    private Integer tmdbGenreId;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    public Genre() {}

    public Genre(Integer tmdbGenreId, String name) {
        this.tmdbGenreId = tmdbGenreId;
        this.name = name;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getTmdbGenreId() { return tmdbGenreId; }
    public void setTmdbGenreId(Integer tmdbGenreId) { this.tmdbGenreId = tmdbGenreId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
