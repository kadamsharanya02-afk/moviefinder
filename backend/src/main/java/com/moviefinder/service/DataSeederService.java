package com.moviefinder.service;

import com.moviefinder.dto.RegisterRequest;
import com.moviefinder.repository.MovieRepository;
import com.moviefinder.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
public class DataSeederService {

    private static final Logger log = LoggerFactory.getLogger(DataSeederService.class);

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final AuthService authService;

    public DataSeederService(UserRepository userRepository,
                             MovieRepository movieRepository,
                             AuthService authService) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.authService = authService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedInitialData() {
        log.info("MovieFinder initialized. Database status: {} movies available.", movieRepository.count());

        // Ensure default demo account exists for immediate testing
        if (!userRepository.existsByEmail("demo@moviefinder.com")) {
            try {
                authService.register(new RegisterRequest(
                        "Demo User",
                        "demo@moviefinder.com",
                        "password123",
                        "password123"
                ));
                log.info("Demo user created: demo@moviefinder.com / password123");
            } catch (Exception e) {
                log.warn("Could not create default demo user: {}", e.getMessage());
            }
        }
    }
}
