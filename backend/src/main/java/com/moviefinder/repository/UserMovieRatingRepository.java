package com.moviefinder.repository;

import com.moviefinder.model.UserMovieRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserMovieRatingRepository extends JpaRepository<UserMovieRating, Long> {
    List<UserMovieRating> findByUserIdOrderByUpdatedAtDesc(Long userId);
    Optional<UserMovieRating> findByUserIdAndMovieId(Long userId, Long movieId);
    boolean existsByUserIdAndMovieId(Long userId, Long movieId);
    long countByUserId(Long userId);
}
