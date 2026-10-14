package com.moviefinder.repository;

import com.moviefinder.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<Movie> findByTmdbId(Long tmdbId);

    @Query("SELECT m FROM Movie m WHERE LOWER(m.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(m.director) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(m.overview) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Movie> searchMovies(@Param("query") String query);

    List<Movie> findTop10ByOrderByTmdbRatingDesc();

    List<Movie> findTop10ByOrderByPopularityDesc();

    List<Movie> findTop10ByOrderByReleaseYearDesc();

    @Query("SELECT DISTINCT m FROM Movie m JOIN m.genres g WHERE g.id IN :genreIds ORDER BY m.tmdbRating DESC")
    List<Movie> findByGenreIds(@Param("genreIds") List<Long> genreIds);

    List<Movie> findByIndustryIgnoreCaseOrderByTmdbRatingDesc(String industry);

    List<Movie> findByContentTypeIgnoreCaseOrderByTmdbRatingDesc(String contentType);
}
