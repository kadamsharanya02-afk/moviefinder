package com.moviefinder.service;

import com.moviefinder.dto.AuthRequest;
import com.moviefinder.dto.AuthResponse;
import com.moviefinder.dto.RegisterRequest;
import com.moviefinder.model.User;
import com.moviefinder.model.UserPreference;
import com.moviefinder.repository.UserPreferenceRepository;
import com.moviefinder.repository.UserRepository;
import com.moviefinder.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserPreferenceRepository userPreferenceRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository,
                       UserPreferenceRepository userPreferenceRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new IllegalArgumentException("Email already registered: " + request.getEmail());
        }

        User user = new User(
                request.getEmail().trim().toLowerCase(),
                passwordEncoder.encode(request.getPassword()),
                request.getFullName().trim()
        );

        User savedUser = userRepository.save(user);

        // Initialize user preferences with default balanced vibe vector
        UserPreference preference = new UserPreference(savedUser);
        userPreferenceRepository.save(preference);

        String token = jwtUtils.generateToken(savedUser.getEmail(), savedUser.getId());
        return new AuthResponse(token, savedUser.getId(), savedUser.getEmail(), savedUser.getFullName(), savedUser.getRole());
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail().trim().toLowerCase(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + request.getEmail()));

        String token = jwtUtils.generateToken(user.getEmail(), user.getId());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole());
    }

    public User getCurrentAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return null;
        }
        String email = auth.getName();
        return userRepository.findByEmail(email).orElse(null);
    }
}
