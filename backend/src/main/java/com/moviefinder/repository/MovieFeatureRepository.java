package com.moviefinder.repository;

import com.moviefinder.model.MovieFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieFeatureRepository extends JpaRepository<MovieFeature, Long> {
    Optional<MovieFeature> findByMovieId(Long movieId);
}
