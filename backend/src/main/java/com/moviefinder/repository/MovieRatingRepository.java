package com.moviefinder.repository;

import com.moviefinder.model.MovieRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRatingRepository extends JpaRepository<MovieRating, Long> {
    Optional<MovieRating> findByMovieId(Long movieId);
}
