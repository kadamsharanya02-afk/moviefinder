# MovieFinder — AI Movie Discovery & Recommendation System

**MovieFinder** is a full-stack movie discovery and recommendation platform featuring a **Netflix-inspired dark cinematic UI/UX**, 9-dimensional mood/vibe sliders, natural-language AI discovery, explainable recommendations, and dynamic personal taste profile calculations.

---

## 🌟 Key Features

1. **Netflix-Inspired Cinematic UI/UX**
   - Deep charcoal/near-black theme (`#0a0a0f`) with crimson accents (`#e50914`).
   - Fullscreen cinematic login/register backdrops with dark vignettes.
   - Dynamic Hero Banner with featured title, synopsis, trailer player, and quick actions.
   - Smooth horizontally scrollable carousels with chevron controls and card hover scaling.

2. **AI Natural-Language Movie Discovery**
   - Describe what you want in everyday language (e.g., *"I want something creepy and romantic with lots of suspense but not too violent."*).
   - Spring AI / Semantic NLP engine parses the prompt into structured 9-dimensional JSON mood vectors (0–100 scale).
   - Sliders dynamically animate to AI-calibrated positions, allowing manual user refinement.

3. **9-Dimensional Mood / Vibe Sliders**
   - Interactive sliders for **Horror**, **Romance**, **Thriller**, **Comedy**, **Drama**, **Action**, **Mystery**, **Violence**, and **Darkness**.
   - Live percentage badges and color-graded progress tracks.
   - Recommendation engine compares user sliders with MySQL `movie_features` vectors using normalized Euclidean distance.

4. **Hybrid Recommendation Engine & "Why this movie?"**
   - Combines 5 weighted factors:
     $$\text{Score} = 0.40 \cdot S_{\text{vibe}} + 0.25 \cdot S_{\text{taste}} + 0.15 \cdot S_{\text{genre}} + 0.15 \cdot S_{\text{rating}} + 0.05 \cdot S_{\text{popularity}}$$
   - Transparent, data-driven explainability on every recommendation card highlighting matched mood vectors and director credentials.

5. **Dynamic Personal Taste Profile (`/profile`)**
   - **NOT hardcoded**: Dynamically recalculated whenever a user rates a movie.
   - Weighted rating algorithm increases genre/vibe affinity based on user satisfaction.
   - Visual percentage charts (e.g., *Sci-Fi: 100%, Adventure: 100%, Drama: 50%*).

6. **Multi-Source Rating Comparison**
   - Side-by-side display of **TMDB**, **IMDb**, **Rotten Tomatoes**, and **Metacritic** scores.
   - Interactive 1–5 star user rating widget with real-time MySQL persistence.

7. **My List / Watchlist (`/my-list`)**
   - Instant 1-click addition/removal of titles from personal watchlist.
   - Protected per-user privacy.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **React Router DOM**
- **Axios** (with JWT Bearer interceptors)
- **Lucide React** (cinematic icons)
- **HTML5 & Modern CSS3** (responsive for desktop, tablet, and mobile)

### Backend
- **Java 21 / 25**
- **Spring Boot 3.3.4**
- **Spring Data JPA & Hibernate**
- **Spring Security & JJWT 0.12.6** (stateless token authentication)
- **Spring AI & OpenAI ChatClient** (with built-in NLP semantic fallback)
- **Maven**

### Database
- **MySQL 8.x / 9.x** (Workbench compatible schema)
- 10 Relational tables with foreign key constraints and cascade rules.

---

## 🗄️ Database Architecture

The application uses 10 normalized tables in `moviefinder_db`:
- `users`: User credentials with BCrypt password hashing.
- `movies`: Movie metadata, poster/backdrop URLs, runtime, and director.
- `genres`: TMDB genre IDs and genre labels.
- `movie_genres`: Many-to-Many junction table.
- `movie_ratings`: Multi-source ratings (TMDB, IMDb, Rotten Tomatoes, Metacritic).
- `user_movie_ratings`: User 1–5 star ratings and reviews.
- `user_preferences`: Stored 9-dimensional mood preferences.
- `movie_features`: 0–100 scores for horror, romance, thriller, comedy, drama, action, mystery, violence, darkness.
- `recommendations`: Persisted AI recommendations and explainability text.
- `user_watchlist`: User saved movies.

The schema DDL is located at [`database/schema.sql`](file:///d:/JAVA/moviefinder/database/schema.sql).  
The initial movie catalog seed script is at [`database/seed_data.sql`](file:///d:/JAVA/moviefinder/database/seed_data.sql).

---

## 🚀 Getting Started

### 1. Prerequisites
- **Java 17, 21, or 25**
- **Maven 3.8+**
- **Node.js 18+ and npm**
- **MySQL Server** running on `localhost:3306`

### 2. Database Setup
Log into MySQL and execute:
```sql
CREATE DATABASE IF NOT EXISTS moviefinder_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Import the schema and seed catalog:
```powershell
Get-Content database/schema.sql | mysql -u root -p moviefinder_db
Get-Content database/seed_data.sql | mysql -u root -p moviefinder_db
```

### 3. Environment Configuration
Copy `.env.example` or set the following environment variables if needed:
- `DB_PASSWORD`: Your MySQL root password (default configured for local dev: `sharanya`).
- `OPENAI_API_KEY`: *(Optional)* Your OpenAI API key for live GPT-4o-mini prompt parsing. If omitted, the built-in intelligent NLP semantic parser is used seamlessly.
- `TMDB_API_KEY`: *(Optional)* TMDB API Key.

### 4. Running the Backend
In the project root or `backend/` directory:
```powershell
cd backend
mvn clean package -DskipTests
java -jar target/moviefinder-backend-1.0.0.jar
```
*Backend runs on `http://localhost:8080`.*

### 5. Running the Frontend
In the `frontend/` directory:
```powershell
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 🔑 Demo Test Account
For instant evaluation without creating a new account:
- **Email:** `demo@moviefinder.com`
- **Password:** `password123`

You can also click **"Use Demo Account"** directly on the Login page, or register any new user.

---

## 📡 REST API Documentation

### Authentication
- `POST /api/auth/register` — Register a new user (`fullName`, `email`, `password`, `confirmPassword`).
- `POST /api/auth/login` — Sign in and obtain JWT token (`email`, `password`, `rememberMe`).
- `GET /api/auth/me` — Retrieve current authenticated user profile.

### Movies
- `GET /api/movies` — List all movies.
- `GET /api/movies/{id}` — Movie details with multi-source ratings, mood DNA, and user watchlist status.
- `GET /api/movies/featured` — Hero section featured movie.
- `GET /api/movies/trending` — Trending movies row.
- `GET /api/movies/popular` — Popular movies row.
- `GET /api/movies/top-rated` — Highest rated movies row.
- `GET /api/movies/because-you-watched` — Recommendations based on recent ratings/saves.
- `GET /api/movies/search?q={query}` — Title, overview, or director search.

### Ratings & Taste Profile
- `POST /api/movies/{id}/rate` — Submit 1–5 star rating (recalculates taste profile dynamically).
- `GET /api/movies/{id}/ratings` — Fetch all ratings for a movie.
- `GET /api/user/profile` — User profile, activity counts, and dynamic **Your Movie Taste** breakdown.
- `GET /api/user/preferences` — Current user mood slider weights.
- `POST /api/user/preferences` — Update mood slider weights.

### AI & Recommendations
- `POST /api/ai/analyze` — Analyzes natural-language requests into structured 0–100 mood vectors.
- `POST /api/recommendations/vibe` — Hybrid recommendation engine by 9-dimensional mood vectors.
- `GET /api/recommendations` — Personalized recommendations based on user profile.

### Watchlist ("My List")
- `GET /api/watchlist` — Get all saved movies for current user.
- `POST /api/watchlist/{movieId}` — Add movie to watchlist.
- `DELETE /api/watchlist/{movieId}` — Remove movie from watchlist.
- `GET /api/watchlist/check/{movieId}` — Check if movie is saved.

---

## 🛡️ Security & Privacy
- Passwords hashed using **BCrypt**.
- APIs secured using **stateless JWT tokens** passed via the `Authorization: Bearer <token>` header.
- Users can only access and modify their own ratings, watchlist, and taste profile.
- API keys are handled securely via environment variables and never exposed to the frontend client.
