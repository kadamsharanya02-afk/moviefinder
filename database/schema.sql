-- MovieFinder - MySQL Workbench Compatible Schema
-- Database: moviefinder_db

CREATE DATABASE IF NOT EXISTS moviefinder_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE moviefinder_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Movies Table
CREATE TABLE IF NOT EXISTS movies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tmdb_id BIGINT UNIQUE,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255),
    overview TEXT,
    poster_path VARCHAR(255),
    backdrop_path VARCHAR(255),
    release_date VARCHAR(50),
    release_year INT,
    runtime INT,
    director VARCHAR(150),
    trailer_url VARCHAR(255),
    tmdb_rating DOUBLE DEFAULT 0.0,
    tmdb_vote_count INT DEFAULT 0,
    popularity DOUBLE DEFAULT 0.0,
    imdb_rating DOUBLE DEFAULT 0.0,
    rotten_tomatoes_rating VARCHAR(20) DEFAULT 'N/A',
    metacritic_rating VARCHAR(20) DEFAULT 'N/A',
    content_type VARCHAR(50) DEFAULT 'MOVIE',
    industry VARCHAR(50) DEFAULT 'Hollywood',
    seasons VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Genres Table
CREATE TABLE IF NOT EXISTS genres (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tmdb_genre_id INT UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 4. Movie Genres Table
CREATE TABLE IF NOT EXISTS movie_genres (
    movie_id BIGINT NOT NULL,
    genre_id BIGINT NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    CONSTRAINT fk_mg_movie FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
    CONSTRAINT fk_mg_genre FOREIGN KEY (genre_id) REFERENCES genres (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Movie Ratings Table
CREATE TABLE IF NOT EXISTS movie_ratings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT NOT NULL UNIQUE,
    tmdb_rating DOUBLE DEFAULT 0.0,
    imdb_rating DOUBLE DEFAULT 0.0,
    rotten_tomatoes_rating VARCHAR(20) DEFAULT 'N/A',
    metacritic_rating VARCHAR(20) DEFAULT 'N/A',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_mr_movie FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. User Movie Ratings Table
CREATE TABLE IF NOT EXISTS user_movie_ratings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uk_user_movie_rating UNIQUE (user_id, movie_id),
    CONSTRAINT fk_umr_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_umr_movie FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    horror_pref INT DEFAULT 50 CHECK (horror_pref BETWEEN 0 AND 100),
    romance_pref INT DEFAULT 50 CHECK (romance_pref BETWEEN 0 AND 100),
    thriller_pref INT DEFAULT 50 CHECK (thriller_pref BETWEEN 0 AND 100),
    comedy_pref INT DEFAULT 50 CHECK (comedy_pref BETWEEN 0 AND 100),
    drama_pref INT DEFAULT 50 CHECK (drama_pref BETWEEN 0 AND 100),
    action_pref INT DEFAULT 50 CHECK (action_pref BETWEEN 0 AND 100),
    mystery_pref INT DEFAULT 50 CHECK (mystery_pref BETWEEN 0 AND 100),
    violence_pref INT DEFAULT 50 CHECK (violence_pref BETWEEN 0 AND 100),
    darkness_pref INT DEFAULT 50 CHECK (darkness_pref BETWEEN 0 AND 100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_up_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. Movie Features Table
CREATE TABLE IF NOT EXISTS movie_features (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT NOT NULL UNIQUE,
    horror_score INT NOT NULL DEFAULT 0 CHECK (horror_score BETWEEN 0 AND 100),
    romance_score INT NOT NULL DEFAULT 0 CHECK (romance_score BETWEEN 0 AND 100),
    thriller_score INT NOT NULL DEFAULT 0 CHECK (thriller_score BETWEEN 0 AND 100),
    comedy_score INT NOT NULL DEFAULT 0 CHECK (comedy_score BETWEEN 0 AND 100),
    drama_score INT NOT NULL DEFAULT 0 CHECK (drama_score BETWEEN 0 AND 100),
    action_score INT NOT NULL DEFAULT 0 CHECK (action_score BETWEEN 0 AND 100),
    mystery_score INT NOT NULL DEFAULT 0 CHECK (mystery_score BETWEEN 0 AND 100),
    violence_score INT NOT NULL DEFAULT 0 CHECK (violence_score BETWEEN 0 AND 100),
    darkness_score INT NOT NULL DEFAULT 0 CHECK (darkness_score BETWEEN 0 AND 100),
    CONSTRAINT fk_mf_movie FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    recommendation_score DOUBLE NOT NULL,
    vibe_match_score DOUBLE NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rec_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_rec_movie FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 10. User Watchlist Table
CREATE TABLE IF NOT EXISTS user_watchlist (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_user_watchlist UNIQUE (user_id, movie_id),
    CONSTRAINT fk_uw_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_uw_movie FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE
) ENGINE=InnoDB;
