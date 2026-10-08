-- MovieFinder Seed Data
-- Database: moviefinder_db

USE moviefinder_db;

-- 1. Insert Genres
INSERT INTO genres (tmdb_genre_id, name) VALUES
(28, 'Action'),
(12, 'Adventure'),
(16, 'Animation'),
(35, 'Comedy'),
(80, 'Crime'),
(99, 'Documentary'),
(18, 'Drama'),
(10751, 'Family'),
(14, 'Fantasy'),
(36, 'History'),
(27, 'Horror'),
(10402, 'Music'),
(9648, 'Mystery'),
(10749, 'Romance'),
(878, 'Sci-Fi'),
(10770, 'TV Movie'),
(53, 'Thriller'),
(10752, 'War'),
(37, 'Western')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. Insert Iconic Movies
INSERT INTO movies (id, tmdb_id, title, original_title, overview, poster_path, backdrop_path, release_date, release_year, runtime, director, trailer_url, tmdb_rating, tmdb_vote_count, popularity, imdb_rating, rotten_tomatoes_rating, metacritic_rating) VALUES
(1, 157336, 'Interstellar', 'Interstellar', 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.', '/gEU2QniE6EwfVDxCzsxUmZ0cT6r.jpg', '/xJHokMbljvjADYdit5fK5VQsXEG.jpg', '2014-11-05', 2014, 169, 'Christopher Nolan', 'https://www.youtube.com/watch?v=zSWdZVtXT7E', 8.4, 34200, 145.2, 8.7, '73%', '74/100'),
(2, 27205, 'Inception', 'Inception', 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to be impossible: inception.', '/o274zXzLgKeqM2qYpvdz254R3eA.jpg', '/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg', '2010-07-15', 2010, 148, 'Christopher Nolan', 'https://www.youtube.com/watch?v=YoHD9XEInc0', 8.4, 36000, 138.5, 8.8, '87%', '74/100'),
(3, 155, 'The Dark Knight', 'The Dark Knight', 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.', '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', '/dqK9Hag1054tghRQSqLSfrkvQnA.jpg', '2008-07-16', 2008, 152, 'Christopher Nolan', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 8.5, 32100, 120.4, 9.0, '94%', '84/100'),
(4, 680, 'Pulp Fiction', 'Pulp Fiction', 'A burger-loving hit man, his philosophical partner, a drug-addled gangster''s moll and a washed-up boxer converge in four tales of violence and redemption.', '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg', '1994-09-10', 1994, 154, 'Quentin Tarantino', 'https://www.youtube.com/watch?v=s7EdQ4FqbhY', 8.5, 27500, 115.3, 8.9, '92%', '95/100'),
(5, 496243, 'Parasite', 'Gisaengchung', 'All unemployed, Ki-taek''s family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.', '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', '/hiKmpZMGZsrkA3cdEv9aOsIbwsC.jpg', '2019-05-30', 2019, 132, 'Bong Joon-ho', 'https://www.youtube.com/watch?v=5xH0RzeSojI', 8.5, 17800, 95.8, 8.5, '99%', '96/100'),
(6, 694, 'The Shining', 'The Shining', 'Jack Torrance accepts a caretaker job at the Overlook Hotel, where he, his wife Wendy and their psychic son Danny settle down for the winter. But as a blizzard isolates the hotel, mysterious paranormal forces drive Jack into madness.', '/b6qUsq0ZT10Ci9q9vx97YJ4vRw5.jpg', '/mmd1HnuvAzFc4iJY9Mp73WURCeU.jpg', '1980-05-23', 1980, 144, 'Stanley Kubrick', 'https://www.youtube.com/watch?v=S01444vdBcw', 8.2, 17000, 85.4, 8.4, '83%', '66/100'),
(7, 313369, 'La La Land', 'La La Land', 'Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but after a chance encounter the pair fall passionately in love.', '/uDO8zWDhfWwoFdKS4fzkVJt0Rf0.jpg', '/qJeU7KM4A7q565X31y4tZdt70g6.jpg', '2016-12-01', 2016, 128, 'Damien Chazelle', 'https://www.youtube.com/watch?v=0pdq8C7vUxs', 7.9, 16200, 78.6, 8.0, '91%', '94/100'),
(8, 419430, 'Get Out', 'Get Out', 'Chris and his girlfriend Rose have reached the meet-the-parents milestone of dating, she invites him for a weekend getaway upstate with Missy and Dean. At first, Chris reads the family''s overly accommodating behavior as nervous attempts to deal with their interracial relationship, but as the weekend progresses, a series of increasingly disturbing discoveries lead him to a truth that he could have never imagined.', '/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg', '/vZ7F7EjzUo35xj0q6sZqmz7y5aB.jpg', '2017-02-24', 2017, 104, 'Jordan Peele', 'https://www.youtube.com/watch?v=DzfpyUB60YY', 7.6, 16800, 82.1, 7.8, '98%', '85/100'),
(9, 120467, 'The Grand Budapest Hotel', 'The Grand Budapest Hotel', 'The Grand Budapest Hotel tells of a legendary concierge at a famous European resort between the wars, and his friendship with a young employee who becomes his trusted protégé.', '/eWdyYQreja1JGCapXCVflQOXWqN.jpg', '/5kAGb5Y1E5aN6K0h51HhR5GjM0s.jpg', '2014-02-26', 2014, 99, 'Wes Anderson', 'https://www.youtube.com/watch?v=1Fg5iWmQjwk', 8.0, 14100, 71.3, 8.1, '92%', '88/100'),
(10, 76341, 'Mad Max: Fury Road', 'Mad Max: Fury Road', 'An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life.', '/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg', '/nlCHUW2Y9XAgje1dtzyY4ioFcT1.jpg', '2015-05-13', 2015, 120, 'George Miller', 'https://www.youtube.com/watch?v=hEJnMQG9ev8', 7.6, 21900, 94.6, 8.1, '97%', '90/100'),
(11, 550, 'Fight Club', 'Fight Club', 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.', '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', '/hZkgoQYus5vegHoetLkCJzb17zJ.jpg', '1999-10-15', 1999, 139, 'David Fincher', 'https://www.youtube.com/watch?v=qtRKDV93gkQ', 8.4, 28700, 110.2, 8.8, '79%', '67/100'),
(12, 324857, 'Spider-Man: Into the Spider-Verse', 'Spider-Man: Into the Spider-Verse', 'Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson ''Kingpin'' Fisk uses a super collider, others from across the multiverse are transported to his dimension.', '/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg', '/7d6Zje0939Pvvn0NM8Q3668p01m.jpg', '2018-12-01', 2018, 117, 'Bob Persichetti, Peter Ramsey', 'https://www.youtube.com/watch?v=tg52up16eq0', 8.4, 15100, 125.7, 8.4, '97%', '87/100'),
(13, 348, 'Alien', 'Alien', 'During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When three crew members explore the source, they inadvertently take on board a deadly extraterrestrial.', '/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg', '/AmR3JG1DYG5edMAWMfl2aV776cf.jpg', '1979-05-25', 1979, 117, 'Ridley Scott', 'https://www.youtube.com/watch?v=jQ5lPt9edzQ', 8.1, 14200, 89.4, 8.5, '98%', '89/100'),
(14, 76, 'Before Sunrise', 'Before Sunrise', 'On a train from Budapest to Vienna, Jesse meets Celine. A conversation between the two blossoms into a genuine connection, leading them to spend a night roaming Vienna together before parting.', '/5008FY75q9ioL0Tsmv6X9XhS5Wk.jpg', '/9x2RkQkX7pGqA2hB1bK1nJ8cKzP.jpg', '1995-01-27', 1995, 105, 'Richard Linklater', 'https://www.youtube.com/watch?v=9v6X-D8lUw8', 8.0, 4200, 42.1, 8.1, '100%', '77/100'),
(15, 244786, 'Whiplash', 'Whiplash', 'Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, testing the limits of his sanity and physical endurance.', '/7fn624j5lj3xTme2SgiLCeuedmO.jpg', '/6bbZ6XyvgfjhC0LNMRvZUhOpbwb.jpg', '2014-10-10', 2014, 107, 'Damien Chazelle', 'https://www.youtube.com/watch?v=7d_jQycdQGo', 8.4, 14800, 84.7, 8.5, '94%', '88/100'),
(16, 807, 'Se7en', 'Se7en', 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.', '/6yoghtyTpznpBik8EngEmJskVUO.jpg', '/ba4Cpvnw3gU51vGwtVbs2h2bCfl.jpg', '1995-09-22', 1995, 127, 'David Fincher', 'https://www.youtube.com/watch?v=znmZoVkCjpI', 8.4, 20300, 98.4, 8.6, '83%', '65/100'),
(17, 545611, 'Everything Everywhere All at Once', 'Everything Everywhere All at Once', 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what is important to her by connecting with the lives she could have led in other universes.', '/w3LxiVYPqrlxqPYSENY0hu3jKhQ.jpg', '/ss0Os3uWbkyiKSpUhy1CJtV6nhi.jpg', '2022-03-24', 2022, 139, 'Daniel Kwan, Daniel Scheinert', 'https://www.youtube.com/watch?v=wxN1T1uxQ2g', 7.8, 6400, 92.5, 7.8, '94%', '81/100'),
(18, 152601, 'Her', 'Her', 'In the near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.', '/eCOtqtfvn7mxGl6nfmq4bLGVI4B.jpg', '/7w4821v0V4e4Wv1yA5vG0m3X4PZ.jpg', '2013-12-18', 2013, 126, 'Spike Jonze', 'https://www.youtube.com/watch?v=ne6p6Hd4fMw', 7.9, 13600, 67.2, 8.0, '95%', '91/100'),
(19, 493922, 'Hereditary', 'Hereditary', 'When Ellen, the matriarch of the Graham family, passes away, her daughter''s family begins to unravel cryptic and increasingly terrifying secrets about their ancestry.', '/hhrEojflFzZ1fJk0w4m3e4wZ0bJ.jpg', '/cUGk8G0cK9d8r7V1xT3bN0qW7vG.jpg', '2018-06-07', 2018, 127, 'Ari Aster', 'https://www.youtube.com/watch?v=V6wWKNij_1M', 7.3, 7300, 75.3, 7.3, '90%', '87/100'),
(20, 274, 'The Silence of the Lambs', 'The Silence of the Lambs', 'Clarice Starling is a top student at the FBI''s training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism.', '/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg', '/mfwq2nMBzArzQ7Y9R1v0uL1y6z.jpg', '1991-02-01', 1991, 118, 'Jonathan Demme', 'https://www.youtube.com/watch?v=W6Mm8Sbe__o', 8.3, 15800, 88.0, 8.6, '95%', '86/100'),
(21, 335984, 'Blade Runner 2049', 'Blade Runner 2049', 'Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what''s left of society into chaos.', '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', '/sAtoMqDVhNDQBc3QJL3RF6hlxGq.jpg', '2017-10-04', 2017, 164, 'Denis Villeneuve', 'https://www.youtube.com/watch?v=gCcx85zbxz4', 7.6, 13100, 89.2, 8.0, '88%', '81/100'),
(22, 546554, 'Knives Out', 'Knives Out', 'When renowned crime novelist Harlan Thrombey is found dead at his estate, the inquisitive Detective Benoit Blanc is mysteriously enlisted to investigate. From Harlan''s dysfunctional family to his devoted staff, Blanc sifts through a web of red herrings and self-serving lies.', '/pThyQovXQrw2m0s9x82twj48Jq4.jpg', '/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg', '2019-11-27', 2019, 130, 'Rian Johnson', 'https://www.youtube.com/watch?v=qGqiHJTsRkQ', 7.9, 12000, 82.5, 7.9, '97%', '82/100'),
(23, 129, 'Spirited Away', 'Sen to Chihiro no Kamikakushi', 'A young girl, Chihiro, becomes trapped in a strange world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.', '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', '/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg', '2001-07-20', 2001, 125, 'Hayao Miyazaki', 'https://www.youtube.com/watch?v=ByXuk9QqQkk', 8.5, 16100, 91.4, 8.6, '97%', '96/100'),
(24, 8363, 'Superbad', 'Superbad', 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.', '/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg', '/m5Bq3mO6O1P0zJk1h7L5J5bA6e1.jpg', '2007-08-17', 2007, 113, 'Greg Mottola', 'https://www.youtube.com/watch?v=4eaZ_48ZYog', 7.2, 7200, 54.3, 7.6, '88%', '76/100')
ON DUPLICATE KEY UPDATE title=VALUES(title), overview=VALUES(overview), poster_path=VALUES(poster_path), backdrop_path=VALUES(backdrop_path);

-- 3. Link Movie Genres
INSERT INTO movie_genres (movie_id, genre_id) VALUES
-- Interstellar: Sci-Fi(15), Drama(7), Adventure(2)
(1, 15), (1, 7), (1, 2),
-- Inception: Action(1), Sci-Fi(15), Adventure(2)
(2, 1), (2, 15), (2, 2),
-- Dark Knight: Action(1), Crime(5), Drama(7), Thriller(17)
(3, 1), (3, 5), (3, 7), (3, 17),
-- Pulp Fiction: Thriller(17), Crime(5)
(4, 17), (4, 5),
-- Parasite: Comedy(4), Thriller(17), Drama(7)
(5, 4), (5, 17), (5, 7),
-- The Shining: Horror(11), Thriller(17)
(6, 11), (6, 17),
-- La La Land: Comedy(4), Drama(7), Romance(14), Music(12)
(7, 4), (7, 7), (7, 14), (7, 12),
-- Get Out: Mystery(13), Thriller(17), Horror(11)
(8, 13), (8, 17), (8, 11),
-- Grand Budapest Hotel: Comedy(4), Drama(7)
(9, 4), (9, 7),
-- Mad Max: Action(1), Adventure(2), Sci-Fi(15)
(10, 1), (10, 2), (10, 15),
-- Fight Club: Drama(7), Thriller(17)
(11, 7), (11, 17),
-- Spider-Man Spider-Verse: Action(1), Adventure(2), Animation(3), Sci-Fi(15)
(12, 1), (12, 2), (12, 3), (12, 15),
-- Alien: Horror(11), Sci-Fi(15)
(13, 11), (13, 15),
-- Before Sunrise: Drama(7), Romance(14)
(14, 7), (14, 14),
-- Whiplash: Drama(7), Music(12)
(15, 7), (15, 12),
-- Se7en: Crime(5), Mystery(13), Thriller(17)
(16, 5), (16, 13), (16, 17),
-- EEAAO: Action(1), Adventure(2), Sci-Fi(15)
(17, 1), (17, 2), (17, 15),
-- Her: Romance(14), Sci-Fi(15), Drama(7)
(18, 14), (18, 15), (18, 7),
-- Hereditary: Horror(11), Mystery(13), Thriller(17)
(19, 11), (19, 13), (19, 17),
-- Silence of the Lambs: Crime(5), Drama(7), Thriller(17), Horror(11)
(20, 5), (20, 7), (20, 17), (20, 11),
-- Blade Runner 2049: Sci-Fi(15), Drama(7), Mystery(13)
(21, 15), (21, 7), (21, 13),
-- Knives Out: Comedy(4), Crime(5), Mystery(13)
(22, 4), (22, 5), (22, 13),
-- Spirited Away: Animation(3), Family(8), Fantasy(9)
(23, 3), (23, 8), (23, 9),
-- Superbad: Comedy(4)
(24, 4)
ON DUPLICATE KEY UPDATE movie_id=VALUES(movie_id);

-- 4. Movie Ratings Comparison
INSERT INTO movie_ratings (movie_id, tmdb_rating, imdb_rating, rotten_tomatoes_rating, metacritic_rating) VALUES
(1, 8.4, 8.7, '73%', '74/100'),
(2, 8.4, 8.8, '87%', '74/100'),
(3, 8.5, 9.0, '94%', '84/100'),
(4, 8.5, 8.9, '92%', '95/100'),
(5, 8.5, 8.5, '99%', '96/100'),
(6, 8.2, 8.4, '83%', '66/100'),
(7, 7.9, 8.0, '91%', '94/100'),
(8, 7.6, 7.8, '98%', '85/100'),
(9, 8.0, 8.1, '92%', '88/100'),
(10, 7.6, 8.1, '97%', '90/100'),
(11, 8.4, 8.8, '79%', '67/100'),
(12, 8.4, 8.4, '97%', '87/100'),
(13, 8.1, 8.5, '98%', '89/100'),
(14, 8.0, 8.1, '100%', '77/100'),
(15, 8.4, 8.5, '94%', '88/100'),
(16, 8.4, 8.6, '83%', '65/100'),
(17, 7.8, 7.8, '94%', '81/100'),
(18, 7.9, 8.0, '95%', '91/100'),
(19, 7.3, 7.3, '90%', '87/100'),
(20, 8.3, 8.6, '95%', '86/100'),
(21, 7.6, 8.0, '88%', '81/100'),
(22, 7.9, 7.9, '97%', '82/100'),
(23, 8.5, 8.6, '97%', '96/100'),
(24, 7.2, 7.6, '88%', '76/100')
ON DUPLICATE KEY UPDATE tmdb_rating=VALUES(tmdb_rating), imdb_rating=VALUES(imdb_rating);

-- 5. Movie Feature Vectors (0-100 scales for all 9 dimensions)
-- (movie_id, horror, romance, thriller, comedy, drama, action, mystery, violence, darkness)
INSERT INTO movie_features (movie_id, horror_score, romance_score, thriller_score, comedy_score, drama_score, action_score, mystery_score, violence_score, darkness_score) VALUES
(1, 15, 45, 82, 10, 90, 65, 88, 20, 60), -- Interstellar
(2, 10, 35, 92, 12, 75, 88, 94, 45, 65), -- Inception
(3, 20, 25, 94, 15, 85, 95, 80, 75, 90), -- The Dark Knight
(4, 15, 20, 88, 70, 70, 75, 60, 90, 80), -- Pulp Fiction
(5, 40, 15, 95, 65, 90, 30, 85, 65, 85), -- Parasite
(6, 96, 10, 90, 5, 75, 30, 88, 70, 95),  -- The Shining
(7, 0, 98, 10, 65, 80, 5, 10, 0, 15),     -- La La Land
(8, 92, 45, 95, 35, 70, 40, 96, 60, 88),  -- Get Out
(9, 5, 55, 40, 95, 65, 35, 65, 25, 20),   -- Grand Budapest
(10, 25, 10, 85, 10, 60, 98, 30, 88, 70), -- Mad Max
(11, 20, 30, 90, 45, 85, 70, 85, 85, 92), -- Fight Club
(12, 5, 25, 70, 75, 70, 95, 50, 25, 25),  -- Spider-Verse
(13, 98, 5, 94, 5, 60, 75, 85, 85, 95),   -- Alien
(14, 0, 98, 5, 40, 88, 0, 15, 0, 5),      -- Before Sunrise
(15, 10, 15, 92, 10, 95, 20, 35, 30, 65), -- Whiplash
(16, 75, 15, 98, 10, 85, 60, 96, 92, 98), -- Se7en
(17, 10, 55, 75, 88, 85, 90, 65, 45, 35), -- Everything Everywhere
(18, 5, 95, 20, 45, 90, 5, 30, 5, 30),    -- Her
(19, 98, 10, 92, 5, 85, 20, 92, 80, 98),  -- Hereditary
(20, 94, 15, 98, 10, 85, 50, 94, 82, 95), -- Silence of the Lambs
(21, 15, 55, 78, 5, 88, 70, 90, 55, 85),  -- Blade Runner 2049
(22, 10, 20, 75, 85, 65, 35, 96, 30, 35), -- Knives Out
(23, 10, 45, 55, 50, 75, 45, 80, 10, 25), -- Spirited Away
(24, 0, 45, 20, 98, 50, 20, 10, 15, 10)   -- Superbad
ON DUPLICATE KEY UPDATE horror_score=VALUES(horror_score), romance_score=VALUES(romance_score), thriller_score=VALUES(thriller_score);
