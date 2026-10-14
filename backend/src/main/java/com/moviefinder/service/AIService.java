package com.moviefinder.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.moviefinder.dto.VibeAnalysisResponse;
import com.moviefinder.model.VibePreference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AIService {

    private static final Logger log = LoggerFactory.getLogger(AIService.class);

    @Value("${spring.ai.openai.api-key:}")
    private String openAiApiKey;

    @Value("${spring.ai.openai.chat.options.model:gpt-4o-mini}")
    private String openAiModel;

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    public AIService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    public VibeAnalysisResponse analyzePrompt(String prompt) {
        if (prompt == null || prompt.trim().isEmpty()) {
            return new VibeAnalysisResponse(
                    new VibePreference(50, 50, 50, 50, 50, 50, 50, 50, 50),
                    "Balanced mood across all genres.",
                    Collections.emptyList()
            );
        }

        // Check if OpenAI API key is configured
        if (openAiApiKey != null && !openAiApiKey.trim().isEmpty() && !openAiApiKey.equals("your_openai_api_key_here")) {
            try {
                return callOpenAiForVibes(prompt);
            } catch (Exception e) {
                log.warn("OpenAI API call failed or timed out. Falling back to built-in semantic analyzer: {}", e.getMessage());
            }
        }

        // Built-in intelligent Semantic NLP Fallback Analyzer
        return analyzeWithBuiltInEngine(prompt);
    }

    private VibeAnalysisResponse callOpenAiForVibes(String userPrompt) throws Exception {
        String systemInstruction = """
            You are an expert movie discovery AI. Your task is to analyze the user's natural language movie request
            and return a JSON object with 9 vibe slider scores from 0 to 100 based on their desire:
            - horror (0-100)
            - romance (0-100)
            - thriller (0-100)
            - comedy (0-100)
            - drama (0-100)
            - action (0-100)
            - mystery (0-100)
            - violence (0-100)
            - darkness (0-100)

            Return ONLY valid JSON matching this schema:
            {
              "horror": number,
              "romance": number,
              "thriller": number,
              "comedy": number,
              "drama": number,
              "action": number,
              "mystery": number,
              "violence": number,
              "darkness": number,
              "explanation": "brief 1-sentence summary of what was matched",
              "keywords": ["keyword1", "keyword2"]
            }
            Do not include markdown fences or any other text.
            """;

        Map<String, Object> requestBody = Map.of(
                "model", openAiModel,
                "messages", List.of(
                        Map.of("role", "system", "content", systemInstruction),
                        Map.of("role", "user", "content", userPrompt)
                ),
                "temperature", 0.3
        );

        String jsonPayload = objectMapper.writeValueAsString(requestBody);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + openAiApiKey.trim())
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .timeout(Duration.ofSeconds(15))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 200) {
            JsonNode root = objectMapper.readTree(response.body());
            String aiContent = root.path("choices").get(0).path("message").path("content").asText();

            // Extract JSON if wrapped in markdown
            Matcher matcher = Pattern.compile("\\{.*\\}", Pattern.DOTALL).matcher(aiContent);
            if (matcher.find()) {
                aiContent = matcher.group();
            }

            JsonNode parsed = objectMapper.readTree(aiContent);
            VibePreference vibes = new VibePreference(
                    parsed.path("horror").asInt(50),
                    parsed.path("romance").asInt(50),
                    parsed.path("thriller").asInt(50),
                    parsed.path("comedy").asInt(50),
                    parsed.path("drama").asInt(50),
                    parsed.path("action").asInt(50),
                    parsed.path("mystery").asInt(50),
                    parsed.path("violence").asInt(50),
                    parsed.path("darkness").asInt(50)
            );

            String explanation = parsed.path("explanation").asText("Matched your prompt vibes.");
            List<String> keywords = new ArrayList<>();
            if (parsed.has("keywords")) {
                parsed.get("keywords").forEach(k -> keywords.add(k.asText()));
            }

            return new VibeAnalysisResponse(vibes, explanation, keywords);
        } else {
            throw new RuntimeException("OpenAI API returned status " + response.statusCode());
        }
    }

    public VibeAnalysisResponse analyzeWithBuiltInEngine(String text) {
        String lower = text.toLowerCase();
        List<String> detectedKeywords = new ArrayList<>();

        // Baseline levels
        int horror = 30;
        int romance = 30;
        int thriller = 40;
        int comedy = 30;
        int drama = 40;
        int action = 35;
        int mystery = 35;
        int violence = 30;
        int darkness = 35;

        // Horror keywords
        if (containsAny(lower, "horror", "scary", "terrifying", "creepy", "spooky", "haunted", "ghost", "demon", "slasher", "monster")) {
            horror = 85;
            darkness = Math.max(darkness, 80);
            detectedKeywords.add("horror/creepy");
        }

        // Romance keywords
        if (containsAny(lower, "romantic", "romance", "love", "couple", "dating", "heartwarming", "sweet", "relationship")) {
            romance = 85;
            detectedKeywords.add("romance/love");
        }

        // Thriller & Suspense
        if (containsAny(lower, "thriller", "suspense", "suspenseful", "edge of your seat", "intense", "gripping", "ticking clock", "heist")) {
            thriller = 90;
            detectedKeywords.add("suspense/thriller");
        }

        // Comedy keywords
        if (containsAny(lower, "funny", "comedy", "hilarious", "laugh", "humor", "goofy", "silly", "satire", "fun")) {
            comedy = 85;
            darkness = Math.min(darkness, 25);
            detectedKeywords.add("comedy/humor");
        }

        // Drama keywords
        if (containsAny(lower, "drama", "emotional", "moving", "tearjerker", "deep", "character study", "realistic", "family struggle")) {
            drama = 85;
            detectedKeywords.add("drama/emotional");
        }

        // Action keywords
        if (containsAny(lower, "action", "fight", "explosion", "chase", "combat", "superhero", "warrior", "adrenaline", "gunfight")) {
            action = 90;
            detectedKeywords.add("action/energy");
        }

        // Mystery keywords
        if (containsAny(lower, "mystery", "detective", "puzzle", "investigation", "twist", "whodunit", "clues", "secret")) {
            mystery = 90;
            thriller = Math.max(thriller, 70);
            detectedKeywords.add("mystery/investigation");
        }

        // Violence keywords (check positive vs negated)
        if (containsAny(lower, "not violent", "not too violent", "low violence", "little violence", "no blood", "no gore", "family friendly", "mild")) {
            violence = 15;
            detectedKeywords.add("low violence preference");
        } else if (containsAny(lower, "violent", "gore", "bloody", "brutal", "carnage", "gritty combat")) {
            violence = 85;
            detectedKeywords.add("high intensity violence");
        }

        // Darkness keywords (check positive vs negated)
        if (containsAny(lower, "dark", "bleak", "gritty", "nihilistic", "noir", "gloomy", "depressing", "macabre")) {
            darkness = 85;
            detectedKeywords.add("dark/noir atmosphere");
        } else if (containsAny(lower, "feel-good", "uplifting", "lighthearted", "wholesome", "bright", "cheerful", "cozy")) {
            darkness = 10;
            comedy = Math.max(comedy, 65);
            detectedKeywords.add("uplifting/feel-good");
        }

        // Sci-Fi / Mind-bending
        if (containsAny(lower, "sci-fi", "science fiction", "space", "time travel", "future", "alien", "dimension", "multiverse", "mind-bending")) {
            mystery = Math.max(mystery, 80);
            thriller = Math.max(thriller, 75);
            detectedKeywords.add("mind-bending/sci-fi");
        }

        // Bollywood / Indian Cinema
        if (containsAny(lower, "bollywood", "hindi", "indian", "desi")) {
            detectedKeywords.add("Bollywood cinema");
        }

        // TV Series / Web Series
        if (containsAny(lower, "tv series", "tv show", "web series", "series", "show", "episodes", "binge", "seasons")) {
            detectedKeywords.add("TV/Web Series");
        }

        VibePreference vibes = new VibePreference(horror, romance, thriller, comedy, drama, action, mystery, violence, darkness);
        String explanation = String.format("Analyzed request: tuned sliders emphasizing %s.",
                detectedKeywords.isEmpty() ? "balanced preferences" : String.join(", ", detectedKeywords));

        return new VibeAnalysisResponse(vibes, explanation, detectedKeywords);
    }

    private boolean containsAny(String input, String... terms) {
        for (String t : terms) {
            if (input.contains(t)) return true;
        }
        return false;
    }
}
