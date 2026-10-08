package com.moviefinder.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class UserProfileDto {

    private Long id;
    private String email;
    private String fullName;
    private LocalDateTime memberSince;
    private int totalRatings;
    private int totalWatchlist;
    private Map<String, Integer> genrePreferences; // Sci-Fi: 92%, etc.
    private Map<String, Integer> vibePreferences; // Horror: 80%, etc.
    private List<MovieSummaryDto> recentRatings;
    private List<MovieSummaryDto> watchlist;

    public UserProfileDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public LocalDateTime getMemberSince() { return memberSince; }
    public void setMemberSince(LocalDateTime memberSince) { this.memberSince = memberSince; }

    public int getTotalRatings() { return totalRatings; }
    public void setTotalRatings(int totalRatings) { this.totalRatings = totalRatings; }

    public int getTotalWatchlist() { return totalWatchlist; }
    public void setTotalWatchlist(int totalWatchlist) { this.totalWatchlist = totalWatchlist; }

    public Map<String, Integer> getGenrePreferences() { return genrePreferences; }
    public void setGenrePreferences(Map<String, Integer> genrePreferences) { this.genrePreferences = genrePreferences; }

    public Map<String, Integer> getVibePreferences() { return vibePreferences; }
    public void setVibePreferences(Map<String, Integer> vibePreferences) { this.vibePreferences = vibePreferences; }

    public List<MovieSummaryDto> getRecentRatings() { return recentRatings; }
    public void setRecentRatings(List<MovieSummaryDto> recentRatings) { this.recentRatings = recentRatings; }

    public List<MovieSummaryDto> getWatchlist() { return watchlist; }
    public void setWatchlist(List<MovieSummaryDto> watchlist) { this.watchlist = watchlist; }
}
