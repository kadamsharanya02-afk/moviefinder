-- MovieFinder Bollywood & TV Series Seed Data
USE moviefinder_db;

-- 1. Insert Bollywood Movies & TV Series
INSERT INTO movies (id, tmdb_id, title, original_title, overview, poster_path, backdrop_path, release_date, release_year, runtime, director, trailer_url, tmdb_rating, tmdb_vote_count, popularity, imdb_rating, rotten_tomatoes_rating, metacritic_rating, content_type, industry, seasons) VALUES
-- Bollywood Movies (IDs 25 to 40)
(25, 20453, '3 Idiots', '3 Idiots', 'Two friends embark on a quest for a lost buddy. On this journey, they reminisce about their college days and their friend who inspired them to think differently, even as the rest of the world called them "idiots".', '/66A9MqXOyVFCssoloscw79z89ew.jpg', '/u2iqA7eP3kFzFhE5B9hS8E8LhYw.jpg', '2009-12-25', 2009, 170, 'Rajkumar Hirani', 'https://www.youtube.com/watch?v=K0eDlFX9GMc', 8.0, 2200, 82.5, 8.4, '100%', '80/100', 'MOVIE', 'Bollywood', NULL),

(26, 360814, 'Dangal', 'Dangal', 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.', '/p50XqE3kI3GZ6iT33kG3u4n4vLq.jpg', '/b1L8Z9rG1A0wE1E2V4Y1E5B9hS8.jpg', '2016-12-23', 2016, 161, 'Nitesh Tiwari', 'https://www.youtube.com/watch?v=x_7YlGv9u1g', 8.0, 1650, 75.3, 8.3, '88%', '79/100', 'MOVIE', 'Bollywood', NULL),

(27, 119864, 'Gangs of Wasseypur', 'Gangs of Wasseypur', 'A clash between Sultan and Shahid Khan leads to the expulsion of Khan from Wasseypur, and ignites a deadly blood feud spanning three generations.', '/b7H8k8dG9H4V5W2R1T6Y0U8I7O6.jpg', '/x8L9K1J2H3G4F5D6S7A8P9O0I1U.jpg', '2012-06-22', 2012, 321, 'Anurag Kashyap', 'https://www.youtube.com/watch?v=j-7sPsmP6m0', 8.1, 980, 68.4, 8.2, '97%', '89/100', 'MOVIE', 'Bollywood', NULL),

(28, 538858, 'Tumbbad', 'Tumbbad', 'A mythological story about a goddess who created the universe. The plot revolves around the consequences when humans greedily seek untold gold from her cursed first-born, Hastar.', '/m7L2G8W1X9V3T6R0P5Q4Z7Y2B1N.jpg', '/z9Y8X7W6V5U4T3S2R1Q0P9O8N7M.jpg', '2018-10-12', 2018, 104, 'Rahi Anil Barve, Anand Gandhi', 'https://www.youtube.com/watch?v=sN75MPxgvX8', 8.2, 890, 72.8, 8.2, '86%', '82/100', 'MOVIE', 'Bollywood', NULL),

(29, 534780, 'Andhadhun', 'Andhadhun', 'A series of mysterious events change the life of a blind pianist who must now report a crime that should have never happened in front of him.', '/dy3A6h172pwsRUX32ZZjX18fD6y.jpg', '/e3Y7L8T9K1J2H3G4F5D6S7A8P9O.jpg', '2018-10-05', 2018, 139, 'Sriram Raghavan', 'https://www.youtube.com/watch?v=2iVYI99VGaw', 8.1, 1100, 74.0, 8.2, '100%', '85/100', 'MOVIE', 'Bollywood', NULL),

(30, 12293, 'Sholay', 'Sholay', 'After his family is murdered by a ruthless bandit named Gabbar Singh, a former police officer enlists two small-time crooks to capture him.', '/7y79kL6L8V0B1N2M3C4X5Z6A7S8.jpg', '/1A2B3C4D5E6F7G8H9I0J1K2L3M4.jpg', '1975-08-15', 1975, 204, 'Ramesh Sippy', 'https://www.youtube.com/watch?v=ZZMmG3Kwnk8', 7.8, 1400, 69.5, 8.1, '94%', '80/100', 'MOVIE', 'Bollywood', NULL),

(31, 19404, 'Dilwale Dulhania Le Jayenge', 'Dilwale Dulhania Le Jayenge', 'Raj and Simran meet on a European train trip and fall in love. When Raj learns Simran is promised to another, he travels to Punjab to win over her family.', '/2CAL2433ZeIihfX1Hb2139CX0pW.jpg', '/67r4dJ3f4v5e6w7q8a9s0d1f2g3.jpg', '1995-10-20', 1995, 189, 'Aditya Chopra', 'https://www.youtube.com/watch?v=c25GKl5VNeY', 8.6, 4200, 86.4, 8.0, '100%', '85/100', 'MOVIE', 'Bollywood', NULL),

(32, 61129, 'Zindagi Na Milegi Dobara', 'Zindagi Na Milegi Dobara', 'Three childhood friends embark on a bachelor trip to Spain, facing fears through extreme sports and discovering life and friendship.', '/l2Hq4Q4V1B0N8M7C6X5Z3A2S1D4.jpg', '/p9O8I7U6Y5T4R3E2W1Q0Z9X8C7V.jpg', '2011-07-15', 2011, 155, 'Zoya Akhtar', 'https://www.youtube.com/watch?v=FJrpcDgC3zU', 7.9, 1350, 71.0, 8.2, '91%', '78/100', 'MOVIE', 'Bollywood', NULL),

(33, 1966, 'Lagaan', 'Lagaan: Once Upon a Time in India', 'The people of a small Victorian Indian village stake their future on a game of cricket against their British rulers to avoid an oppressive land tax.', '/fT1e2W3Q4R5T6Y7U8I9O0P1A2S3.jpg', '/k1L2M3N4O5P6Q7R8S9T0U1V2W3X.jpg', '2001-06-15', 2001, 224, 'Ashutosh Gowariker', 'https://www.youtube.com/watch?v=oSIGQ0YkFxs', 8.0, 1400, 66.8, 8.1, '95%', '84/100', 'MOVIE', 'Bollywood', NULL),

(34, 341013, 'Drishyam', 'Drishyam', 'A desperate family man takes extreme, calculated measures to shield his family from the law after an accidental death.', '/4pL2K3J1H0G9F8D7S6A5P4O3I2U.jpg', '/8Y7X6W5V4U3T2S1R0Q9P8O7N6M5.jpg', '2015-07-31', 2015, 163, 'Nishikant Kamat', 'https://www.youtube.com/watch?v=AuuX2j14NBg', 8.2, 1250, 76.5, 8.2, '88%', '80/100', 'MOVIE', 'Bollywood', NULL),

(35, 531219, 'Stree', 'Stree', 'In the town of Chanderi, men live in terror of an evil spirit named Stree who abducts men during annual festivities.', '/t9Y8X7W6V5U4T3S2R1Q0P9O8N7L.jpg', '/5T4R3E2W1Q0Z9X8C7V6B5N4M3L2.jpg', '2018-08-31', 2018, 128, 'Amar Kaushik', 'https://www.youtube.com/watch?v=gzeaGcLLl_A', 7.5, 850, 72.1, 7.5, '83%', '75/100', 'MOVIE', 'Bollywood', NULL),

(36, 254472, 'Queen', 'Queen', 'A shy Delhi girl from a traditional household embarks on a solo European honeymoon after her fiance calls off the wedding.', '/r1T2Y3U4I5O6P7A8S9D0F1G2H3J.jpg', '/q1W2E3R4T5Y6U7I8O9P0A1S2D3F.jpg', '2014-03-07', 2014, 144, 'Vikas Bahl', 'https://www.youtube.com/watch?v=KGC6vl3lzf0', 8.0, 940, 65.2, 8.1, '90%', '81/100', 'MOVIE', 'Bollywood', NULL),

(37, 297222, 'PK', 'PK', 'An innocent alien stranded on Earth questions religious dogmas and superstitions with childlike wonder, curiosity, and warmth.', '/8L0P9O8I7U6Y5T4R3E2W1Q0Z9X8.jpg', '/4E3W2Q1Z0X9C8V7B6N5M4L3K2J1.jpg', '2014-12-19', 2014, 153, 'Rajkumar Hirani', 'https://www.youtube.com/watch?v=SOXWc32k4zA', 7.9, 1780, 73.4, 8.1, '92%', '79/100', 'MOVIE', 'Bollywood', NULL),

(38, 348892, 'Bajrangi Bhaijaan', 'Bajrangi Bhaijaan', 'An Indian devotee with a pure heart embarks on a peril-filled journey to take a lost mute Pakistani girl back across the border.', '/9K8J7H6G5F4D3S2A1P0O9I8U7Y6.jpg', '/1Q2W3E4R5T6Y7U8I9O0P1A2S3D4.jpg', '2015-07-17', 2015, 163, 'Kabir Khan', 'https://www.youtube.com/watch?v=4nwAnoq30nI', 7.9, 1450, 71.9, 8.1, '86%', '76/100', 'MOVIE', 'Bollywood', NULL),

(39, 86829, 'Kahaani', 'Kahaani', 'A pregnant woman travels to Kolkata during Durga Puja to hunt for her missing husband, unravelling a web of espionage and deceit.', '/7U6Y5T4R3E2W1Q0Z9X8C7V6B5N4.jpg', '/5M4L3K2J1H0G9F8D7S6A5P4O3I2.jpg', '2012-03-09', 2012, 122, 'Sujoy Ghosh', 'https://www.youtube.com/watch?v=j1wTrwcdHH8', 7.9, 780, 64.0, 8.1, '88%', '80/100', 'MOVIE', 'Bollywood', NULL),

(40, 592834, 'Chhichhore', 'Chhichhore', 'A tragic event reunites college hostel mates who reminisce about their underdog days to teach a valuable lesson on life and success.', '/3D4F5G6H7J8K9L0P1O2I3U4Y5T6.jpg', '/2S3D4F5G6H7J8K9L0P1O2I3U4Y5.jpg', '2019-09-06', 2019, 143, 'Nitesh Tiwari', 'https://www.youtube.com/watch?v=tsxemFX0KDg', 7.8, 820, 67.5, 8.3, '84%', '77/100', 'MOVIE', 'Bollywood', NULL),

-- TV Series & Web Shows (IDs 41 to 50)
(41, 79140, 'Sacred Games', 'Sacred Games', 'A link in their pasts leads an honest police officer to a fugitive gang boss whose cryptic warning spurs a quest to save Mumbai from destruction.', '/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg', '/ba4Cpvnw3gU51vGwtVbs2h2bCfl.jpg', '2018-07-06', 2018, 50, 'Anurag Kashyap, Vikramaditya Motwane', 'https://www.youtube.com/watch?v=28j8h0RRsf4', 8.2, 1900, 88.0, 8.5, '92%', '85/100', 'TV_SERIES', 'Bollywood', '2 Seasons'),

(42, 84105, 'Mirzapur', 'Mirzapur', 'A wedding incident ignites a brutal chain reaction across Mirzapur, controlled by ruthless crime lord Akhandanand Tripathi.', '/6yoghtyTpznpBik8EngEmJskVUO.jpg', '/x8L9K1J2H3G4F5D6S7A8P9O0I1U.jpg', '2018-11-16', 2018, 55, 'Karan Anshuman, Gurmmeet Singh', 'https://www.youtube.com/watch?v=ZNeGF-PvVHY', 8.4, 2400, 94.2, 8.5, '88%', '80/100', 'TV_SERIES', 'Bollywood', '3 Seasons'),

(43, 93437, 'The Family Man', 'The Family Man', 'A middle-class man secretly works for a special counter-terrorism unit while protecting his family from secrets and impending threats.', '/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg', '/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg', '2019-09-20', 2019, 45, 'Raj & DK', 'https://www.youtube.com/watch?v=ng-O3mGzL2s', 8.5, 2800, 91.5, 8.7, '96%', '88/100', 'TV_SERIES', 'Bollywood', '2 Seasons'),

(44, 101869, 'Panchayat', 'Panchayat', 'An engineering graduate takes up a job as a secretary in a remote village Panchayat office, navigating quaint rural politics and life lessons.', '/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg', '/5kAGb5Y1E5aN6K0h51HhR5GjM0s.jpg', '2020-04-03', 2020, 35, 'Deepak Kumar Mishra', 'https://www.youtube.com/watch?v=mojZJ7oeD_g', 8.6, 1700, 82.0, 8.9, '94%', '87/100', 'TV_SERIES', 'Bollywood', '3 Seasons'),

(45, 111363, 'Scam 1992', 'Scam 1992: The Harshad Mehta Story', 'Set in 1980s & 90s Bombay, follows the meteoric rise and catastrophic fall of Harshad Mehta, orchestrator of India''s biggest financial scam.', '/7fn624j5lj3xTme2SgiLCeuedmO.jpg', '/hZkgoQYus5vegHoetLkCJzb17zJ.jpg', '2020-10-09', 2020, 55, 'Hansal Mehta', 'https://www.youtube.com/watch?v=ISORfez27og', 8.7, 2100, 89.0, 9.3, '95%', '90/100', 'TV_SERIES', 'Bollywood', '1 Season'),

(46, 1396, 'Breaking Bad', 'Breaking Bad', 'A high school chemistry teacher diagnosed with terminal lung cancer turns to manufacturing methamphetamine to secure his family''s financial future.', '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg', '2008-01-20', 2008, 47, 'Vince Gilligan', 'https://www.youtube.com/watch?v=HhesaQXLuRY', 8.9, 14500, 140.2, 9.5, '96%', '96/100', 'TV_SERIES', 'Hollywood', '5 Seasons'),

(47, 66732, 'Stranger Things', 'Stranger Things', 'When a boy vanishes, a small Indiana town uncovers a supernatural mystery involving secret government experiments and an unusual girl with telekinesis.', '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg', '2016-07-15', 2016, 50, 'The Duffer Brothers', 'https://www.youtube.com/watch?v=b9EkMc79ZSU', 8.6, 16800, 132.5, 8.7, '92%', '84/100', 'TV_SERIES', 'Hollywood', '4 Seasons'),

(48, 70523, 'Dark', 'Dark', 'A missing child sets four families on a frantic hunt for answers, unraveling a mind-bending time-travel conspiracy spanning three generations.', '/apGTo06Z9X1j78yMhMvN4FqH9cQ.jpg', '/7d6Zje0939Pvvn0NM8Q3668p01m.jpg', '2017-12-01', 2017, 60, 'Baran bo Odar', 'https://www.youtube.com/watch?v=rrwycJ08PSA', 8.6, 8200, 98.4, 8.7, '95%', '86/100', 'TV_SERIES', 'Hollywood', '3 Seasons'),

(49, 1399, 'Game of Thrones', 'Game of Thrones', 'Nine noble families wage bitter war for control over the Iron Throne of Westeros, while an ancient supernatural menace returns from the frozen north.', '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg', '/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg', '2011-04-17', 2011, 60, 'David Benioff, D.B. Weiss', 'https://www.youtube.com/watch?v=KPLWWIOCOOQ', 8.4, 22400, 155.0, 9.2, '89%', '86/100', 'TV_SERIES', 'Hollywood', '8 Seasons'),

(50, 46648, 'True Detective', 'True Detective', 'An anthology crime drama series exploring police investigations that unravel dark personal and professional secrets within and outside the law.', '/cuV2O53rOT2wbImHaHgppBtQiIO.jpg', '/ba4Cpvnw3gU51vGwtVbs2h2bCfl.jpg', '2014-01-12', 2014, 58, 'Nic Pizzolatto, Cary Joji Fukunaga', 'https://www.youtube.com/watch?v=fVQUcaO4AvE', 8.3, 4800, 90.1, 8.9, '88%', '87/100', 'TV_SERIES', 'Hollywood', '4 Seasons')
ON DUPLICATE KEY UPDATE title=VALUES(title), content_type=VALUES(content_type), industry=VALUES(industry), seasons=VALUES(seasons);

-- 2. Link Movie Genres
INSERT INTO movie_genres (movie_id, genre_id) VALUES
-- 3 Idiots: Comedy(4), Drama(7)
(25, 4), (25, 7),
-- Dangal: Action(1), Drama(7), History(10)
(26, 1), (26, 7), (26, 10),
-- Gangs of Wasseypur: Action(1), Crime(5), Drama(7), Thriller(17)
(27, 1), (27, 5), (27, 7), (27, 17),
-- Tumbbad: Fantasy(9), Horror(11), Mystery(13), Drama(7)
(28, 9), (28, 11), (28, 13), (28, 7),
-- Andhadhun: Crime(5), Mystery(13), Thriller(17), Comedy(4)
(29, 5), (29, 13), (29, 17), (29, 4),
-- Sholay: Action(1), Adventure(2), Comedy(4), Drama(7)
(30, 1), (30, 2), (30, 4), (30, 7),
-- DDLJ: Drama(7), Romance(14), Comedy(4)
(31, 7), (31, 14), (31, 4),
-- ZNMD: Adventure(2), Comedy(4), Drama(7), Romance(14)
(32, 2), (32, 4), (32, 7), (32, 14),
-- Lagaan: Adventure(2), Drama(7), History(10)
(33, 2), (33, 7), (33, 10),
-- Drishyam: Crime(5), Drama(7), Mystery(13), Thriller(17)
(34, 5), (34, 7), (34, 13), (34, 17),
-- Stree: Comedy(4), Horror(11)
(35, 4), (35, 11),
-- Queen: Comedy(4), Drama(7)
(36, 4), (36, 7),
-- PK: Comedy(4), Drama(7), Sci-Fi(15)
(37, 4), (37, 7), (37, 15),
-- Bajrangi Bhaijaan: Action(1), Adventure(2), Comedy(4), Drama(7)
(38, 1), (38, 2), (38, 4), (38, 7),
-- Kahaani: Mystery(13), Thriller(17), Drama(7)
(39, 13), (39, 17), (39, 7),
-- Chhichhore: Comedy(4), Drama(7)
(40, 4), (40, 7),
-- Sacred Games: Crime(5), Drama(7), Mystery(13), Thriller(17)
(41, 5), (41, 7), (41, 13), (41, 17),
-- Mirzapur: Action(1), Crime(5), Drama(7), Thriller(17)
(42, 1), (42, 5), (42, 7), (42, 17),
-- The Family Man: Action(1), Comedy(4), Drama(7), Thriller(17)
(43, 1), (43, 4), (43, 7), (43, 17),
-- Panchayat: Comedy(4), Drama(7)
(44, 4), (44, 7),
-- Scam 1992: Crime(5), Drama(7), History(10)
(45, 5), (45, 7), (45, 10),
-- Breaking Bad: Crime(5), Drama(7), Thriller(17)
(46, 5), (46, 7), (46, 17),
-- Stranger Things: Drama(7), Fantasy(9), Horror(11), Mystery(13), Sci-Fi(15)
(47, 7), (47, 9), (47, 11), (47, 13), (47, 15),
-- Dark: Drama(7), Mystery(13), Sci-Fi(15), Thriller(17)
(48, 7), (48, 13), (48, 15), (48, 17),
-- Game of Thrones: Action(1), Adventure(2), Drama(7), Fantasy(9)
(49, 1), (49, 2), (49, 7), (49, 9),
-- True Detective: Crime(5), Drama(7), Mystery(13), Thriller(17)
(50, 5), (50, 7), (50, 13), (50, 17)
ON DUPLICATE KEY UPDATE movie_id=VALUES(movie_id);

-- 3. Movie Ratings Comparison
INSERT INTO movie_ratings (movie_id, tmdb_rating, imdb_rating, rotten_tomatoes_rating, metacritic_rating) VALUES
(25, 8.0, 8.4, '100%', '80/100'),
(26, 8.0, 8.3, '88%', '79/100'),
(27, 8.1, 8.2, '97%', '89/100'),
(28, 8.2, 8.2, '86%', '82/100'),
(29, 8.1, 8.2, '100%', '85/100'),
(30, 7.8, 8.1, '94%', '80/100'),
(31, 8.6, 8.0, '100%', '85/100'),
(32, 7.9, 8.2, '91%', '78/100'),
(33, 8.0, 8.1, '95%', '84/100'),
(34, 8.2, 8.2, '88%', '80/100'),
(35, 7.5, 7.5, '83%', '75/100'),
(36, 8.0, 8.1, '90%', '81/100'),
(37, 7.9, 8.1, '92%', '79/100'),
(38, 7.9, 8.1, '86%', '76/100'),
(39, 7.9, 8.1, '88%', '80/100'),
(40, 7.8, 8.3, '84%', '77/100'),
(41, 8.2, 8.5, '92%', '85/100'),
(42, 8.4, 8.5, '88%', '80/100'),
(43, 8.5, 8.7, '96%', '88/100'),
(44, 8.6, 8.9, '94%', '87/100'),
(45, 8.7, 9.3, '95%', '90/100'),
(46, 8.9, 9.5, '96%', '96/100'),
(47, 8.6, 8.7, '92%', '84/100'),
(48, 8.6, 8.7, '95%', '86/100'),
(49, 8.4, 9.2, '89%', '86/100'),
(50, 8.3, 8.9, '88%', '87/100')
ON DUPLICATE KEY UPDATE tmdb_rating=VALUES(tmdb_rating), imdb_rating=VALUES(imdb_rating);

-- 4. Movie Feature Vectors (9-dimensional mood vectors, 0-100)
-- (movie_id, horror, romance, thriller, comedy, drama, action, mystery, violence, darkness)
INSERT INTO movie_features (movie_id, horror_score, romance_score, thriller_score, comedy_score, drama_score, action_score, mystery_score, violence_score, darkness_score) VALUES
(25, 0, 60, 15, 95, 92, 10, 40, 10, 20), -- 3 Idiots
(26, 0, 10, 35, 45, 96, 75, 10, 25, 25), -- Dangal
(27, 20, 30, 92, 65, 90, 88, 60, 95, 90), -- Gangs of Wasseypur
(28, 95, 10, 88, 5, 85, 50, 92, 75, 96),  -- Tumbbad
(29, 15, 25, 96, 60, 75, 40, 98, 65, 75),  -- Andhadhun
(30, 10, 50, 75, 70, 88, 90, 30, 70, 60),  -- Sholay
(31, 0, 99, 5, 75, 85, 20, 5, 15, 10),     -- DDLJ
(32, 0, 75, 20, 88, 85, 30, 15, 0, 15),    -- ZNMD
(33, 0, 50, 55, 40, 95, 60, 20, 20, 30),   -- Lagaan
(34, 10, 20, 95, 15, 88, 35, 95, 45, 70),  -- Drishyam
(35, 80, 45, 75, 92, 40, 35, 85, 30, 65),  -- Stree
(36, 0, 60, 5, 90, 88, 10, 15, 0, 10),     -- Queen
(37, 0, 65, 20, 96, 85, 20, 45, 10, 15),   -- PK
(38, 0, 40, 45, 70, 96, 65, 25, 30, 25),   -- Bajrangi Bhaijaan
(39, 25, 20, 98, 10, 85, 40, 99, 65, 82),  -- Kahaani
(40, 0, 50, 20, 92, 94, 25, 15, 10, 25),   -- Chhichhore
(41, 35, 20, 98, 20, 92, 82, 95, 94, 95),  -- Sacred Games
(42, 20, 25, 95, 40, 90, 90, 70, 98, 92),  -- Mirzapur
(43, 10, 30, 94, 75, 88, 88, 85, 70, 65),  -- The Family Man
(44, 0, 45, 10, 98, 90, 10, 20, 5, 10),    -- Panchayat
(45, 0, 20, 90, 35, 98, 25, 80, 15, 60),   -- Scam 1992
(46, 25, 20, 98, 30, 98, 75, 88, 92, 94),  -- Breaking Bad
(47, 88, 45, 92, 50, 85, 80, 95, 65, 82),  -- Stranger Things
(48, 60, 40, 96, 5, 94, 45, 99, 60, 98),   -- Dark
(49, 40, 50, 90, 25, 98, 95, 80, 98, 92),  -- Game of Thrones
(50, 55, 20, 96, 10, 95, 65, 98, 85, 98)   -- True Detective
ON DUPLICATE KEY UPDATE horror_score=VALUES(horror_score), romance_score=VALUES(romance_score), thriller_score=VALUES(thriller_score);
