package com.moviefinder.repository;

import com.moviefinder.model.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByUserIdOrderByRecommendationScoreDesc(Long userId);
    void deleteByUserId(Long userId);
}
