import { useState, useRef, useCallback, useEffect } from "react";

const EASY_QUESTIONS = [
{ q: "Who directed Get Out?", options: ["Jordan Peele", "Spike Lee", "Barry Jenkins", "Steve McQueen"], answer: "Jordan Peele", cat: "director", detail: "Jordan Peele's 2017 horror debut" },
  { q: "Who directed Jaws?", options: ["Steven Spielberg", "Ridley Scott", "John Carpenter", "William Friedkin"], answer: "Steven Spielberg", cat: "director", detail: "The 1975 blockbuster that invented the summer movie" },
  { q: "Who directed The Shining?", options: ["Stanley Kubrick", "David Lynch", "Roman Polanski", "Wes Craven"], answer: "Stanley Kubrick", cat: "director", detail: "Kubrick's 1980 horror masterpiece" },
  { q: "Who directed Parasite?", options: ["Bong Joon-ho", "Park Chan-wook", "Hirokazu Kore-eda", "Wong Kar-wai"], answer: "Bong Joon-ho", cat: "director", detail: "First non-English film to win Best Picture" },
  { q: "Who directed The Grand Budapest Hotel?", options: ["Wes Anderson", "Noah Baumbach", "Sofia Coppola", "Edgar Wright"], answer: "Wes Anderson", cat: "director", detail: "Anderson's 2014 pastel caper" },
  { q: "Who directed Pulp Fiction?", options: ["Quentin Tarantino", "Guy Ritchie", "Martin Scorsese", "Robert Rodriguez"], answer: "Quentin Tarantino", cat: "director", detail: "Tarantino's 1994 Palme d'Or winner" },
  { q: "Who directed Lady Bird?", options: ["Greta Gerwig", "Sofia Coppola", "Chloé Zhao", "Kathryn Bigelow"], answer: "Greta Gerwig", cat: "director", detail: "Gerwig's 2017 Sacramento coming-of-age" },
  { q: "Who directed Black Panther?", options: ["Ryan Coogler", "Jordan Peele", "Spike Lee", "Barry Jenkins"], answer: "Ryan Coogler", cat: "director", detail: "Coogler's 2018 cultural phenomenon" },
  { q: "Who directed Eternal Sunshine of the Spotless Mind?", options: ["Michel Gondry", "Spike Jonze", "Charlie Kaufman", "Wes Anderson"], answer: "Michel Gondry", cat: "director", detail: "Gondry's 2004 memory-erasing romance" },
  { q: "Who directed Moonlight?", options: ["Barry Jenkins", "Jordan Peele", "Steve McQueen", "Ryan Coogler"], answer: "Barry Jenkins", cat: "director", detail: "Best Picture winner 2017" },
  { q: "Who played Forrest Gump in Forrest Gump?", options: ["Tom Hanks", "Margot Robbie", "Ralph Fiennes", "Adrien Brody"], answer: "Tom Hanks", cat: "cast", detail: "Tom Hanks in Forrest Gump" },
  { q: "Who played Jack Dawson in Titanic?", options: ["Leonardo DiCaprio", "Tony Leung", "Javier Bardem", "Andy Serkis"], answer: "Leonardo DiCaprio", cat: "cast", detail: "Leonardo DiCaprio in Titanic" },
  { q: "Who played Tyler Durden in Fight Club?", options: ["Brad Pitt", "Sigourney Weaver", "Morgan Freeman", "Tony Leung"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt in Fight Club" },
  { q: "Who played the Joker in The Dark Knight?", options: ["Heath Ledger", "Daniel Radcliffe", "Yves Montand", "Tom Hanks"], answer: "Heath Ledger", cat: "cast", detail: "Heath Ledger in The Dark Knight" },
  { q: "Who played Neo in The Matrix?", options: ["Keanu Reeves", "Song Kang-ho", "Matt Damon", "Hugh Jackman"], answer: "Keanu Reeves", cat: "cast", detail: "Keanu Reeves in The Matrix" },
  { q: "Who played Wolverine in the X-Men films?", options: ["Hugh Jackman", "Lamberto Maggiorani", "Brad Pitt", "Adrien Brody"], answer: "Hugh Jackman", cat: "cast", detail: "Hugh Jackman in the X-Men films" },
  { q: "Who played Iron Man in the MCU?", options: ["Robert Downey Jr.", "Song Kang-ho", "Tom Cruise", "Ben Kingsley"], answer: "Robert Downey Jr.", cat: "cast", detail: "Robert Downey Jr. in the MCU" },
  { q: "Who played Indiana Jones in Raiders of the Lost Ark?", options: ["Harrison Ford", "Russell Crowe", "Dustin Hoffman", "Peter Finch"], answer: "Harrison Ford", cat: "cast", detail: "Harrison Ford in Raiders of the Lost Ark" },
  { q: "Who played Captain Jack Sparrow in Pirates of the Caribbean?", options: ["Johnny Depp", "Yves Montand", "Uma Thurman", "Bernard Lee"], answer: "Johnny Depp", cat: "cast", detail: "Johnny Depp in Pirates of the Caribbean" },
  { q: "Who played the Terminator in The Terminator?", options: ["Arnold Schwarzenegger", "Max Schreck", "Christian Bale", "Jodie Foster"], answer: "Arnold Schwarzenegger", cat: "cast", detail: "Arnold Schwarzenegger in The Terminator" },
  { q: "Who played Harry Potter in the Harry Potter films?", options: ["Daniel Radcliffe", "Heath Ledger", "Cillian Murphy", "Margot Robbie"], answer: "Daniel Radcliffe", cat: "cast", detail: "Daniel Radcliffe in the Harry Potter films" },
  { q: "Who played Gandalf in The Lord of the Rings?", options: ["Ian McKellen", "Takashi Shimura", "Brad Pitt", "Toshiro Mifune"], answer: "Ian McKellen", cat: "cast", detail: "Ian McKellen in The Lord of the Rings" },
  { q: "Who played Batman in The Dark Knight?", options: ["Christian Bale", "Natalie Portman", "Takashi Shimura", "Bruno Ganz"], answer: "Christian Bale", cat: "cast", detail: "Christian Bale in The Dark Knight" },
  { q: "Who played Ethan Hunt in Mission: Impossible?", options: ["Tom Cruise", "Daniel Radcliffe", "Hugh Jackman", "Jean Seberg"], answer: "Tom Cruise", cat: "cast", detail: "Tom Cruise in Mission: Impossible" },
  { q: "Who played Ripley in Alien?", options: ["Sigourney Weaver", "Cillian Murphy", "Ian McKellen", "Song Kang-ho"], answer: "Sigourney Weaver", cat: "cast", detail: "Sigourney Weaver in Alien" },
  { q: "\"I'm gonna make him an offer he can't refuse.\"", options: ["The Godfather", "The Godfather Part II", "Network", "The Sixth Sense"], answer: "The Godfather", cat: "quote", detail: "Brando as Don Corleone" },
  { q: "\"I see dead people.\"", options: ["The Sixth Sense", "The Karate Kid", "Fight Club", "Scarface"], answer: "The Sixth Sense", cat: "quote", detail: "Haley Joel Osment's whisper" },
  { q: "\"To infinity and beyond!\"", options: ["Toy Story", "Terminator 2", "The Karate Kid", "Apollo 13"], answer: "Toy Story", cat: "quote", detail: "Buzz Lightyear's catchphrase" },
  { q: "\"Say hello to my little friend!\"", options: ["Scarface", "Casablanca", "Dirty Dancing", "Citizen Kane"], answer: "Scarface", cat: "quote", detail: "Pacino as Tony Montana" },
  { q: "\"Here's looking at you, kid.\"", options: ["Casablanca", "Wayne's World", "The Maltese Falcon", "Finding Nemo"], answer: "Casablanca", cat: "quote", detail: "Bogart to Bergman" },
  { q: "\"You can't handle the truth!\"", options: ["A Few Good Men", "Apollo 13", "Star Wars", "Frankenstein"], answer: "A Few Good Men", cat: "quote", detail: "Jack Nicholson's courtroom" },
  { q: "\"May the Force be with you.\"", options: ["Star Wars", "Apollo 13", "A Few Good Men", "E.T."], answer: "Star Wars", cat: "quote", detail: "The saga's farewell" },
  { q: "\"Houston, we have a problem.\"", options: ["Apollo 13", "The Godfather Part II", "Clerks", "The Godfather"], answer: "Apollo 13", cat: "quote", detail: "Tom Hanks as Jim Lovell" },
  { q: "\"You talking to me?\"", options: ["Taxi Driver", "The Dark Knight", "Top Gun", "Frankenstein"], answer: "Taxi Driver", cat: "quote", detail: "De Niro's mirror monologue" },
  { q: "\"Life is like a box of chocolates.\"", options: ["Forrest Gump", "Avatar", "Annie Hall", "Pulp Fiction"], answer: "Forrest Gump", cat: "quote", detail: "Tom Hanks as Forrest" },
  { q: "\"I'll be back.\"", options: ["The Terminator", "The Shining", "The Godfather", "Jerry Maguire"], answer: "The Terminator", cat: "quote", detail: "Schwarzenegger's signature line" },
  { q: "\"There's no place like home.\"", options: ["The Wizard of Oz", "Dirty Dancing", "Cool Hand Luke", "Fight Club"], answer: "The Wizard of Oz", cat: "quote", detail: "Judy Garland as Dorothy" },
  { q: "\"Why so serious?\"", options: ["The Dark Knight", "Titanic", "Toy Story", "Top Gun"], answer: "The Dark Knight", cat: "quote", detail: "Heath Ledger's Joker" },
  { q: "\"I am your father.\"", options: ["The Empire Strikes Back", "Casablanca", "Star Wars", "Toy Story"], answer: "The Empire Strikes Back", cat: "quote", detail: "Vader's iconic reveal" },
  { q: "\"Just keep swimming.\"", options: ["Finding Nemo", "Wayne's World", "The Silence of the Lambs", "Top Gun"], answer: "Finding Nemo", cat: "quote", detail: "Dory's mantra" },
  { q: "\"You're gonna need a bigger boat.\"", options: ["Jaws", "Goodfellas", "Harry Potter and the Sorcerer's Stone", "Network"], answer: "Jaws", cat: "quote", detail: "Scheider's ad-lib" },
  { q: "\"I'm the king of the world!\"", options: ["Titanic", "The Wizard of Oz", "Scarface", "The Dark Knight"], answer: "Titanic", cat: "quote", detail: "DiCaprio on the bow" },
  { q: "\"My precious.\"", options: ["The Lord of the Rings: The Two Towers", "Scarface", "Taxi Driver", "Pulp Fiction"], answer: "The Lord of the Rings: The Two Towers", cat: "quote", detail: "Gollum's obsession" },
  { q: "\"Here's Johnny!\"", options: ["The Shining", "Wayne's World", "Frankenstein", "Gone with the Wind"], answer: "The Shining", cat: "quote", detail: "Nicholson through the door" },
  { q: "\"Hasta la vista, baby.\"", options: ["Terminator 2", "Toy Story", "Forrest Gump", "Dirty Dancing"], answer: "Terminator 2", cat: "quote", detail: "Schwarzenegger's T-800" },
  { q: "\"E.T. phone home.\"", options: ["E.T.", "Forrest Gump", "The Silence of the Lambs", "The Shining"], answer: "E.T.", cat: "quote", detail: "The alien's plea" },
  { q: "\"I am Groot.\"", options: ["Guardians of the Galaxy", "The Terminator", "Forrest Gump", "Blade Runner"], answer: "Guardians of the Galaxy", cat: "quote", detail: "Vin Diesel's three words" },
  { q: "\"To be or not to be — that is the question. Not.\"", options: ["Wayne's World", "Guardians of the Galaxy", "Jaws", "On the Waterfront"], answer: "Wayne's World", cat: "quote", detail: "Mike Myers misquoting Shakespeare" },
  { q: "Who won Best Actor for The Revenant?", options: ["Leonardo DiCaprio", "Tom Hardy", "Michael Fassbender", "Eddie Redmayne"], answer: "Leonardo DiCaprio", cat: "oscar", detail: "DiCaprio's long-awaited first Oscar" },
  { q: "Which film won Best Picture at the 2020 Oscars?", options: ["Parasite", "1917", "Joker", "Once Upon a Time in Hollywood"], answer: "Parasite", cat: "oscar", detail: "First non-English Best Picture" },
  { q: "Which film won the most Oscars ever (11)?", options: ["Titanic", "The Godfather", "Schindler's List", "Forrest Gump"], answer: "Titanic", cat: "oscar", detail: "Tied with Ben-Hur & Return of the King" },
  { q: "Who won Best Actor for The Godfather?", options: ["Marlon Brando", "Al Pacino", "Robert Duvall", "James Caan"], answer: "Marlon Brando", cat: "oscar", detail: "Brando famously refused the award" },
  { q: "What was the first Pixar feature film?", options: ["Toy Story", "A Bug's Life", "Monsters, Inc.", "Finding Nemo"], answer: "Toy Story", cat: "trivia", detail: "Released in 1995" },
  { q: "Which franchise has the most films?", options: ["James Bond", "Star Wars", "Harry Potter", "Fast and the Furious"], answer: "James Bond", cat: "trivia", detail: "Over 25 official Bond films" },
  { q: "What color lightsaber does Luke use in A New Hope?", options: ["Blue", "Green", "Red", "Purple"], answer: "Blue", cat: "trivia", detail: "Green comes in Return of the Jedi" },
  { q: "How many Harry Potter films are there?", options: ["8", "7", "9", "6"], answer: "8", cat: "trivia", detail: "Deathly Hallows split into two" },
  { q: "What is the highest-grossing film ever (unadjusted)?", options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], answer: "Avatar", cat: "trivia", detail: "Reclaimed top after re-releases" },
  { q: "What sport is in Rocky?", options: ["Boxing", "Wrestling", "MMA", "Kickboxing"], answer: "Boxing", cat: "trivia", detail: "Stallone as Rocky Balboa" },
  { q: "What island is Jurassic Park on?", options: ["Isla Nublar", "Isla Sorna", "Skull Island", "Isla Muerta"], answer: "Isla Nublar", cat: "trivia", detail: "Site of the original park" },
  { q: "What fictional country is Black Panther from?", options: ["Wakanda", "Zamunda", "Genovia", "Latveria"], answer: "Wakanda", cat: "trivia", detail: "Technologically advanced African nation" },
  { q: "What is Batman's butler's name?", options: ["Alfred", "Jarvis", "Watson", "Reginald"], answer: "Alfred", cat: "trivia", detail: "Alfred Pennyworth" },
  { q: "What is the name of the ring in Lord of the Rings?", options: ["The One Ring", "The Ring of Power", "The Master Ring", "The Dark Ring"], answer: "The One Ring", cat: "trivia", detail: "One Ring to rule them all" },
  { q: "What kind of animal is Simba in The Lion King?", options: ["Lion", "Tiger", "Cheetah", "Panther"], answer: "Lion", cat: "trivia", detail: "The Lion King (1994)" },
  { q: "What object does the DeLorean need to time travel?", options: ["A flux capacitor", "A warp drive", "A plutonium core", "An arc reactor"], answer: "A flux capacitor", cat: "trivia", detail: "Back to the Future" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["Jaws", "Breathless", "Little Women", "The Beguiled"], answer: "Jaws", cat: "director", detail: "Steven Spielberg directed Jaws" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["Raiders of the Lost Ark", "21 Grams", "The New World", "Persona"], answer: "Raiders of the Lost Ark", cat: "director", detail: "Steven Spielberg directed Raiders of the Lost Ark" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["E.T.", "The Seventh Seal", "Pan's Labyrinth", "Chungking Express"], answer: "E.T.", cat: "director", detail: "Steven Spielberg directed E.T." },
  { q: "Which of these was directed by Steven Spielberg?", options: ["Schindler's List", "Crimson Peak", "Phantom Thread", "The Irishman"], answer: "Schindler's List", cat: "director", detail: "Steven Spielberg directed Schindler's List" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["Jurassic Park", "Wild at Heart", "Babylon", "Fight Club"], answer: "Jurassic Park", cat: "director", detail: "Steven Spielberg directed Jurassic Park" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["Saving Private Ryan", "Badlands", "Slumdog Millionaire", "Nausicaä of the Valley of the Wind"], answer: "Saving Private Ryan", cat: "director", detail: "Steven Spielberg directed Saving Private Ryan" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["Catch Me If You Can", "Rear Window", "The Irishman", "The Shape of Water"], answer: "Catch Me If You Can", cat: "director", detail: "Steven Spielberg directed Catch Me If You Can" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["Munich", "Secret Sunshine", "Rushmore", "The Virgin Suicides"], answer: "Munich", cat: "director", detail: "Steven Spielberg directed Munich" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["Lincoln", "Barbie", "Rope", "Parasite"], answer: "Lincoln", cat: "director", detail: "Steven Spielberg directed Lincoln" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["Bridge of Spies", "Parallel Mothers", "Whiplash", "La La Land"], answer: "Bridge of Spies", cat: "director", detail: "Steven Spielberg directed Bridge of Spies" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["The Post", "The Polar Express", "Adaptation", "Mad Max Beyond Thunderdome"], answer: "The Post", cat: "director", detail: "Steven Spielberg directed The Post" },
  { q: "Which of these was directed by Steven Spielberg?", options: ["West Side Story", "Wild Strawberries", "Babel", "Casino"], answer: "West Side Story", cat: "director", detail: "Steven Spielberg directed West Side Story" },
  { q: "Which of these was directed by Christopher Nolan?", options: ["Memento", "Parallel Mothers", "The Room Next Door", "American Beauty"], answer: "Memento", cat: "director", detail: "Christopher Nolan directed Memento" },
  { q: "Which of these was directed by Christopher Nolan?", options: ["Batman Begins", "Howl's Moving Castle", "Blade Runner", "The Constant Gardener"], answer: "Batman Begins", cat: "director", detail: "Christopher Nolan directed Batman Begins" },
  { q: "Which of these was directed by Christopher Nolan?", options: ["The Dark Knight", "Avatar: The Way of Water", "Snowpiercer", "The Godfather"], answer: "The Dark Knight", cat: "director", detail: "Christopher Nolan directed The Dark Knight" },
  { q: "Which of these was directed by Christopher Nolan?", options: ["Inception", "Jackie Brown", "The Godfather Part II", "Fitzcarraldo"], answer: "Inception", cat: "director", detail: "Christopher Nolan directed Inception" },
  { q: "Which of these was directed by Christopher Nolan?", options: ["Interstellar", "Avatar", "The Hurt Locker", "Priscilla"], answer: "Interstellar", cat: "director", detail: "Christopher Nolan directed Interstellar" },
  { q: "Which of these was directed by Christopher Nolan?", options: ["Dunkirk", "Amores Perros", "2001: A Space Odyssey", "Yi Yi"], answer: "Dunkirk", cat: "director", detail: "Christopher Nolan directed Dunkirk" },
  { q: "Which of these was directed by Christopher Nolan?", options: ["Tenet", "Gangs of New York", "Contempt", "Little Women"], answer: "Tenet", cat: "director", detail: "Christopher Nolan directed Tenet" },
  { q: "Which of these was directed by Christopher Nolan?", options: ["Oppenheimer", "Mother", "Nostalgia", "Gone Girl"], answer: "Oppenheimer", cat: "director", detail: "Christopher Nolan directed Oppenheimer" },
  { q: "Which of these was directed by Christopher Nolan?", options: ["The Prestige", "Aguirre the Wrath of God", "The Piano Teacher", "Casino"], answer: "The Prestige", cat: "director", detail: "Christopher Nolan directed The Prestige" },
  { q: "Which of these was directed by James Cameron?", options: ["The Terminator", "The Darjeeling Limited", "The White Ribbon", "Panic Room"], answer: "The Terminator", cat: "director", detail: "James Cameron directed The Terminator" },
  { q: "Which of these was directed by James Cameron?", options: ["Aliens", "In the Mood for Love", "Taxi Driver", "Days of Heaven"], answer: "Aliens", cat: "director", detail: "James Cameron directed Aliens" },
  { q: "Which of these was directed by James Cameron?", options: ["Terminator 2", "Joint Security Area", "Carlito's Way", "Crouching Tiger Hidden Dragon"], answer: "Terminator 2", cat: "director", detail: "James Cameron directed Terminator 2" },
  { q: "Which of these was directed by James Cameron?", options: ["True Lies", "Point Break", "Edward Scissorhands", "Decision to Leave"], answer: "True Lies", cat: "director", detail: "James Cameron directed True Lies" },
  { q: "Which of these was directed by James Cameron?", options: ["Titanic", "Jackie Brown", "Spartacus", "Natural Born Killers"], answer: "Titanic", cat: "director", detail: "James Cameron directed Titanic" },
  { q: "Which of these was directed by James Cameron?", options: ["Avatar", "The Sacrifice", "Us", "21 Grams"], answer: "Avatar", cat: "director", detail: "James Cameron directed Avatar" },
  { q: "Which of these was directed by James Cameron?", options: ["Avatar: The Way of Water", "Babe", "Birdman", "Letters from Iwo Jima"], answer: "Avatar: The Way of Water", cat: "director", detail: "James Cameron directed Avatar: The Way of Water" },
  { q: "Who played Agent J in Men in Black?", options: ["Will Smith", "Javier Bardem", "Uma Thurman", "Ben Kingsley"], answer: "Will Smith", cat: "cast", detail: "Will Smith in Men in Black" },
  { q: "Who played Mrs. Doubtfire in Mrs. Doubtfire?", options: ["Robin Williams", "Song Kang-ho", "Jean Seberg", "Robert De Niro"], answer: "Robin Williams", cat: "cast", detail: "Robin Williams in Mrs. Doubtfire" },
  { q: "Who played Genie in Aladdin?", options: ["Robin Williams", "Matt Damon", "Robert De Niro", "Margot Robbie"], answer: "Robin Williams", cat: "cast", detail: "Robin Williams in Aladdin" },
  { q: "Who played the Grinch in How the Grinch Stole Christmas?", options: ["Jim Carrey", "Natalie Portman", "Jack Nicholson", "Toshiro Mifune"], answer: "Jim Carrey", cat: "cast", detail: "Jim Carrey in How the Grinch Stole Christmas" },
  { q: "Who played Galadriel in The Lord of the Rings?", options: ["Cate Blanchett", "Charlize Theron", "Max Schreck", "Jean-Pierre Léaud"], answer: "Cate Blanchett", cat: "cast", detail: "Cate Blanchett in The Lord of the Rings" },
  { q: "Who played Miranda Priestly in The Devil Wears Prada?", options: ["Meryl Streep", "Song Kang-ho", "Tom Hanks", "Russell Crowe"], answer: "Meryl Streep", cat: "cast", detail: "Meryl Streep in The Devil Wears Prada" },
  { q: "Who played Rose DeWitt Bukater in Titanic?", options: ["Kate Winslet", "Jean Seberg", "Lamberto Maggiorani", "Sigourney Weaver"], answer: "Kate Winslet", cat: "cast", detail: "Kate Winslet in Titanic" },
  { q: "Who played Sirius Black in Harry Potter and the Prisoner of Azkaban?", options: ["Gary Oldman", "Liam Neeson", "Russell Crowe", "Bruno Ganz"], answer: "Gary Oldman", cat: "cast", detail: "Gary Oldman in Harry Potter and the Prisoner of Azkaban" },
  { q: "Who played James Bond in Dr. No?", options: ["Sean Connery", "Jean-Pierre Léaud", "Natalie Portman", "Heath Ledger"], answer: "Sean Connery", cat: "cast", detail: "Sean Connery in Dr. No" },
  { q: "Who played Edward Cullen in Twilight?", options: ["Robert Pattinson", "Christian Bale", "Anthony Hopkins", "Robert De Niro"], answer: "Robert Pattinson", cat: "cast", detail: "Robert Pattinson in Twilight" },
  { q: "Who played Luke Skywalker in Star Wars?", options: ["Mark Hamill", "Marcello Mastroianni", "Takashi Shimura", "Gael García Bernal"], answer: "Mark Hamill", cat: "cast", detail: "Mark Hamill in Star Wars" },
  { q: "Who played Princess Leia in Star Wars?", options: ["Carrie Fisher", "Marlon Brando", "Anthony Hopkins", "Jodie Foster"], answer: "Carrie Fisher", cat: "cast", detail: "Carrie Fisher in Star Wars" },
  { q: "Who played Donkey in Shrek?", options: ["Eddie Murphy", "Margot Robbie", "Takashi Shimura", "Yves Montand"], answer: "Eddie Murphy", cat: "cast", detail: "Eddie Murphy in Shrek" },
  { q: "Who played John McClane in Die Hard?", options: ["Bruce Willis", "Max Schreck", "Lamberto Maggiorani", "Jean Seberg"], answer: "Bruce Willis", cat: "cast", detail: "Bruce Willis in Die Hard" },
  { q: "Who played Rocky Balboa in Rocky?", options: ["Sylvester Stallone", "Lamberto Maggiorani", "Song Kang-ho", "Jeff Bridges"], answer: "Sylvester Stallone", cat: "cast", detail: "Sylvester Stallone in Rocky" },
  { q: "Who played Black Widow in the MCU?", options: ["Scarlett Johansson", "Natalie Portman", "Rosamund Pike", "Tony Leung"], answer: "Scarlett Johansson", cat: "cast", detail: "Scarlett Johansson in the MCU" },
  { q: "Who played Captain America in the MCU?", options: ["Chris Evans", "Christian Bale", "Song Kang-ho", "Brad Pitt"], answer: "Chris Evans", cat: "cast", detail: "Chris Evans in the MCU" },
  { q: "Who played Thor in the MCU?", options: ["Chris Hemsworth", "Daniel Day-Lewis", "Tom Cruise", "Johnny Depp"], answer: "Chris Hemsworth", cat: "cast", detail: "Chris Hemsworth in the MCU" },
  { q: "Who played Wonder Woman in Wonder Woman?", options: ["Gal Gadot", "Leonardo DiCaprio", "Yves Montand", "Ian McKellen"], answer: "Gal Gadot", cat: "cast", detail: "Gal Gadot in Wonder Woman" },
  { q: "Who played Aquaman in Aquaman?", options: ["Jason Momoa", "Hugh Jackman", "Robert Downey Jr.", "Daniel Radcliffe"], answer: "Jason Momoa", cat: "cast", detail: "Jason Momoa in Aquaman" },
  { q: "Who played Harley Quinn in Suicide Squad?", options: ["Margot Robbie", "Dustin Hoffman", "Peter Finch", "Liam Neeson"], answer: "Margot Robbie", cat: "cast", detail: "Margot Robbie in Suicide Squad" },
  { q: "Who was NOT in The Lord of the Rings: The Fellowship of the Ring?", options: ["Russell Crowe", "Viggo Mortensen", "Orlando Bloom"], answer: "Russell Crowe", cat: "cast", detail: "Russell Crowe was not in The Lord of the Rings: The Fellowship of the Ring" },
  { q: "Who was NOT in The Lord of the Rings: The Fellowship of the Ring?", options: ["Brad Pitt", "Orlando Bloom", "Viggo Mortensen"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt was not in The Lord of the Rings: The Fellowship of the Ring" },
  { q: "Who was NOT in The Lord of the Rings: The Fellowship of the Ring?", options: ["Daniel Craig", "Orlando Bloom", "Viggo Mortensen"], answer: "Daniel Craig", cat: "cast", detail: "Daniel Craig was not in The Lord of the Rings: The Fellowship of the Ring" },
  { q: "Who was NOT in The Lord of the Rings: The Fellowship of the Ring?", options: ["Johnny Depp", "Elijah Wood", "Viggo Mortensen"], answer: "Johnny Depp", cat: "cast", detail: "Johnny Depp was not in The Lord of the Rings: The Fellowship of the Ring" },
  { q: "Who was NOT in Titanic?", options: ["Brad Pitt", "Leonardo DiCaprio", "Billy Zane"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt was not in Titanic" },
  { q: "Who was NOT in Titanic?", options: ["George Clooney", "Leonardo DiCaprio", "Kate Winslet"], answer: "George Clooney", cat: "cast", detail: "George Clooney was not in Titanic" },
  { q: "Who was NOT in Titanic?", options: ["Matt Damon", "Billy Zane", "Leonardo DiCaprio"], answer: "Matt Damon", cat: "cast", detail: "Matt Damon was not in Titanic" },
  { q: "Who was NOT in Titanic?", options: ["Tom Cruise", "Kate Winslet", "Billy Zane"], answer: "Tom Cruise", cat: "cast", detail: "Tom Cruise was not in Titanic" },
  { q: "Who was NOT in The Avengers (2012)?", options: ["Ryan Reynolds", "Scarlett Johansson", "Robert Downey Jr."], answer: "Ryan Reynolds", cat: "cast", detail: "Ryan Reynolds was not in The Avengers (2012)" },
  { q: "Who was NOT in The Avengers (2012)?", options: ["Henry Cavill", "Robert Downey Jr.", "Mark Ruffalo"], answer: "Henry Cavill", cat: "cast", detail: "Henry Cavill was not in The Avengers (2012)" },
  { q: "Who was NOT in The Avengers (2012)?", options: ["Tom Hardy", "Mark Ruffalo", "Scarlett Johansson"], answer: "Tom Hardy", cat: "cast", detail: "Tom Hardy was not in The Avengers (2012)" },
  { q: "Who was NOT in The Avengers (2012)?", options: ["Christian Bale", "Chris Evans", "Mark Ruffalo"], answer: "Christian Bale", cat: "cast", detail: "Christian Bale was not in The Avengers (2012)" },
  { q: "Who was NOT in The Matrix?", options: ["Brad Pitt", "Carrie-Anne Moss", "Laurence Fishburne"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt was not in The Matrix" },
  { q: "Who was NOT in The Matrix?", options: ["Will Smith", "Laurence Fishburne", "Keanu Reeves"], answer: "Will Smith", cat: "cast", detail: "Will Smith was not in The Matrix" },
  { q: "Who was NOT in The Matrix?", options: ["Nicolas Cage", "Laurence Fishburne", "Carrie-Anne Moss"], answer: "Nicolas Cage", cat: "cast", detail: "Nicolas Cage was not in The Matrix" },
  { q: "Who was NOT in The Matrix?", options: ["Tom Cruise", "Laurence Fishburne", "Keanu Reeves"], answer: "Tom Cruise", cat: "cast", detail: "Tom Cruise was not in The Matrix" },
  { q: "Who was NOT in Barbie?", options: ["Gal Gadot", "Margot Robbie", "America Ferrera"], answer: "Gal Gadot", cat: "cast", detail: "Gal Gadot was not in Barbie" },
  { q: "Who was NOT in Barbie?", options: ["Emma Stone", "Will Ferrell", "Margot Robbie"], answer: "Emma Stone", cat: "cast", detail: "Emma Stone was not in Barbie" },
  { q: "Who was NOT in Barbie?", options: ["Timothée Chalamet", "Margot Robbie", "America Ferrera"], answer: "Timothée Chalamet", cat: "cast", detail: "Timothée Chalamet was not in Barbie" },
  { q: "Who was NOT in Barbie?", options: ["Chris Evans", "America Ferrera", "Margot Robbie"], answer: "Chris Evans", cat: "cast", detail: "Chris Evans was not in Barbie" },
  { q: "What is the first rule of Fight Club?", options: ["You do not talk about Fight Club", "Always fight alone", "No shirts", "No shoes"], answer: "You do not talk about Fight Club", cat: "trivia", detail: "Brad Pitt's iconic rule" },
  { q: "What material is the One Ring made of?", options: ["Gold", "Silver", "Mithril", "Iron"], answer: "Gold", cat: "trivia", detail: "A simple gold band with elvish inscription" },
  { q: "In The Wizard of Oz, what color are Dorothy's slippers?", options: ["Ruby red", "Silver", "Gold", "Glass"], answer: "Ruby red", cat: "trivia", detail: "Silver in the book, red for Technicolor" },
  { q: "How many films are in the original Star Wars trilogy?", options: ["3", "4", "6", "2"], answer: "3", cat: "trivia", detail: "A New Hope, Empire, Return of the Jedi" },
  { q: "What's the name of the AI system in The Terminator?", options: ["Skynet", "HAL 9000", "WOPR", "Ultron"], answer: "Skynet", cat: "trivia", detail: "The AI that launched Judgment Day" },
  { q: "What is Indiana Jones afraid of?", options: ["Snakes", "Heights", "Spiders", "The dark"], answer: "Snakes", cat: "trivia", detail: "Why'd it have to be snakes?" },
  { q: "What school does Harry Potter attend?", options: ["Hogwarts", "Beauxbatons", "Durmstrang", "Salem"], answer: "Hogwarts", cat: "trivia", detail: "Hogwarts School of Witchcraft and Wizardry" },
  { q: "What color pill does Neo take in The Matrix?", options: ["Red", "Blue", "Green", "White"], answer: "Red", cat: "trivia", detail: "The red pill reveals the truth" },
  { q: "What is Thanos's goal in Avengers: Infinity War?", options: ["Eliminate half of all life", "Conquer Earth", "Destroy the Avengers", "Rule the universe"], answer: "Eliminate half of all life", cat: "trivia", detail: "The Snap" },
  { q: "What device powers the Iron Man suit?", options: ["Arc reactor", "Infinity Stone", "Vibranium core", "Nuclear cell"], answer: "Arc reactor", cat: "trivia", detail: "Tony Stark's miniaturized power source" },
  { q: "What year does Marty McFly travel to in Back to the Future?", options: ["1955", "1965", "1945", "1975"], answer: "1955", cat: "trivia", detail: "He goes back 30 years" },
  { q: "Which of these was released in the 2010s?", options: ["Her", "Sunset Boulevard", "Lost in Translation", "In the Mood for Love"], answer: "Her", cat: "year", detail: "Her (2013)" },
  { q: "When was Inception released?", options: ["2010", "2011", "2007"], answer: "2010", cat: "year", detail: "Inception (2010)" },
  { q: "Which of these was released in the 2020s?", options: ["Oppenheimer", "Moonrise Kingdom", "Requiem for a Dream", "Casablanca"], answer: "Oppenheimer", cat: "year", detail: "Oppenheimer (2023)" },
  { q: "Which of these was released in the 2010s?", options: ["Gravity", "Rear Window", "Goodfellas", "The Sixth Sense"], answer: "Gravity", cat: "year", detail: "Gravity (2013)" },
  { q: "Which of these came out first?", options: ["Rocky", "Lady Bird", "Everything Everywhere All at Once", "Aliens"], answer: "Rocky", cat: "year", detail: "Rocky (1976)" },
  { q: "Which of these came out first?", options: ["Interstellar", "Sunset Boulevard", "The Departed", "Nomadland"], answer: "Sunset Boulevard", cat: "year", detail: "Sunset Boulevard (1950)" },
  { q: "Which of these came out first?", options: ["Up", "Return of the Jedi", "Blue Velvet", "Juno"], answer: "Return of the Jedi", cat: "year", detail: "Return of the Jedi (1983)" },
  { q: "Which of these was released in the 1990s?", options: ["The Truman Show", "Citizen Kane", "The Incredibles", "The Departed"], answer: "The Truman Show", cat: "year", detail: "The Truman Show (1998)" },
  { q: "Which of these came out first?", options: ["Hugo", "Dune", "Double Indemnity", "Citizen Kane"], answer: "Citizen Kane", cat: "year", detail: "Citizen Kane (1941)" },
  { q: "Which of these came out first?", options: ["Hugo", "La La Land", "Zodiac", "The Wizard of Oz"], answer: "The Wizard of Oz", cat: "year", detail: "The Wizard of Oz (1939)" },
  { q: "Which of these came out first?", options: ["No Country for Old Men", "Past Lives", "The Seventh Seal", "A Star Is Born"], answer: "The Seventh Seal", cat: "year", detail: "The Seventh Seal (1957)" },
  { q: "Which of these came out first?", options: ["Die Hard", "King Kong", "Drive", "The Artist"], answer: "King Kong", cat: "year", detail: "King Kong (1933)" },
  { q: "When was Star Wars released?", options: ["1977", "1979", "1976"], answer: "1977", cat: "year", detail: "Star Wars (1977)" },
  { q: "Which of these was released in the 1990s?", options: ["Heat", "Close Encounters of the Third Kind", "2001: A Space Odyssey", "City of God"], answer: "Heat", cat: "year", detail: "Heat (1995)" },
  { q: "Which of these came out first?", options: ["Mad Max: Fury Road", "Zodiac", "Stalker", "Once Upon a Time in Hollywood"], answer: "Stalker", cat: "year", detail: "Stalker (1979)" },
  { q: "Which of these was released in the 1990s?", options: ["American History X", "Rain Man", "Pan's Labyrinth", "The Power of the Dog"], answer: "American History X", cat: "year", detail: "American History X (1998)" },
  { q: "Which of these was released in the 2000s?", options: ["There Will Be Blood", "The Empire Strikes Back", "The Sixth Sense", "The Third Man"], answer: "There Will Be Blood", cat: "year", detail: "There Will Be Blood (2007)" },
  { q: "Which of these was released in the 1980s?", options: ["Do the Right Thing", "Snow White and the Seven Dwarfs", "A Clockwork Orange", "Requiem for a Dream"], answer: "Do the Right Thing", cat: "year", detail: "Do the Right Thing (1989)" },
  { q: "Which of these was released in the 2010s?", options: ["Django Unchained", "Requiem for a Dream", "Million Dollar Baby", "Amadeus"], answer: "Django Unchained", cat: "year", detail: "Django Unchained (2012)" },
  { q: "Which of these was released in the 2020s?", options: ["Barbie", "The Shape of Water", "The Graduate", "The Matrix"], answer: "Barbie", cat: "year", detail: "Barbie (2023)" },
  { q: "Which of these was released in the 2000s?", options: ["City of God", "Arrival", "Snow White and the Seven Dwarfs", "The Silence of the Lambs"], answer: "City of God", cat: "year", detail: "City of God (2002)" },
  { q: "Which of these came out first?", options: ["Lethal Weapon", "Some Like It Hot", "Top Gun: Maverick", "Do the Right Thing"], answer: "Some Like It Hot", cat: "year", detail: "Some Like It Hot (1959)" },
  { q: "Which of these was released in the 2010s?", options: ["Moonrise Kingdom", "Sunset Boulevard", "Memento", "Total Recall"], answer: "Moonrise Kingdom", cat: "year", detail: "Moonrise Kingdom (2012)" },
  { q: "Which of these came out first?", options: ["A Clockwork Orange", "The Good the Bad and the Ugly", "The Passion of Joan of Arc", "Oppenheimer"], answer: "The Passion of Joan of Arc", cat: "year", detail: "The Passion of Joan of Arc (1928)" },
  { q: "Which of these was released in the 1980s?", options: ["Die Hard", "L.A. Confidential", "Memento", "The Exorcist"], answer: "Die Hard", cat: "year", detail: "Die Hard (1988)" },
  { q: "Which of these came out first?", options: ["Persona", "Top Gun", "The Empire Strikes Back", "Black Swan"], answer: "Persona", cat: "year", detail: "Persona (1966)" },
  { q: "Which of these came out first?", options: ["Raging Bull", "Some Like It Hot", "Slumdog Millionaire", "A Clockwork Orange"], answer: "Some Like It Hot", cat: "year", detail: "Some Like It Hot (1959)" },
  { q: "When was The Dark Knight released?", options: ["2008", "2009", "2010"], answer: "2008", cat: "year", detail: "The Dark Knight (2008)" },
  { q: "Which of these was released in the 2010s?", options: ["Black Swan", "Jurassic Park", "Rear Window", "The Godfather Part II"], answer: "Black Swan", cat: "year", detail: "Black Swan (2010)" },
  { q: "Which of these came out first?", options: ["Past Lives", "Apocalypse Now", "Scarface", "Bonnie and Clyde"], answer: "Bonnie and Clyde", cat: "year", detail: "Bonnie and Clyde (1967)" },
  { q: "Which of these came out first?", options: ["Close Encounters of the Third Kind", "Joker", "Taxi Driver", "Past Lives"], answer: "Taxi Driver", cat: "year", detail: "Taxi Driver (1976)" },
  { q: "Which of these was released in the 2010s?", options: ["Get Out", "Stalker", "The French Connection", "M"], answer: "Get Out", cat: "year", detail: "Get Out (2017)" },
  { q: "Which of these came out first?", options: ["Snow White and the Seven Dwarfs", "Inglourious Basterds", "North by Northwest", "The Wolf of Wall Street"], answer: "Snow White and the Seven Dwarfs", cat: "year", detail: "Snow White and the Seven Dwarfs (1937)" },
  { q: "Which of these came out first?", options: ["Dunkirk", "Iron Man", "Do the Right Thing", "Stalker"], answer: "Stalker", cat: "year", detail: "Stalker (1979)" },
  { q: "Which of these came out first?", options: ["Metropolis", "Up", "Little Miss Sunshine", "Pan's Labyrinth"], answer: "Metropolis", cat: "year", detail: "Metropolis (1927)" },
  { q: "Which of these came out first?", options: ["The Exorcist", "Once Upon a Time in Hollywood", "The Wolf of Wall Street", "Moonrise Kingdom"], answer: "The Exorcist", cat: "year", detail: "The Exorcist (1973)" },
  { q: "Which of these came out first?", options: ["Black Panther", "Breathless", "Slumdog Millionaire", "Oppenheimer"], answer: "Breathless", cat: "year", detail: "Breathless (1960)" },
  { q: "Which of these came out first?", options: ["King Kong", "Alien", "Everything Everywhere All at Once", "Drive"], answer: "King Kong", cat: "year", detail: "King Kong (1933)" },
  { q: "Which of these was released in the 1990s?", options: ["Titanic", "Do the Right Thing", "The Godfather", "Gladiator"], answer: "Titanic", cat: "year", detail: "Titanic (1997)" },
  { q: "Which of these came out first?", options: ["Top Gun", "Ghostbusters", "Solaris", "Alien"], answer: "Solaris", cat: "year", detail: "Solaris (1972)" },
  { q: "Which of these came out first?", options: ["Dune", "The Shape of Water", "Seven Samurai", "Snow White and the Seven Dwarfs"], answer: "Snow White and the Seven Dwarfs", cat: "year", detail: "Snow White and the Seven Dwarfs (1937)" },
  { q: "Which of these was released in the 1990s?", options: ["Saving Private Ryan", "Lady Bird", "Pan's Labyrinth", "It's a Wonderful Life"], answer: "Saving Private Ryan", cat: "year", detail: "Saving Private Ryan (1998)" },
  { q: "Which of these came out first?", options: ["Batman", "The Sting", "The Grand Budapest Hotel", "One Flew Over the Cuckoo's Nest"], answer: "The Sting", cat: "year", detail: "The Sting (1973)" },
  { q: "Which of these came out first?", options: ["Close Encounters of the Third Kind", "Full Metal Jacket", "Rosemary's Baby", "Ben-Hur"], answer: "Ben-Hur", cat: "year", detail: "Ben-Hur (1959)" },
  { q: "When was Jaws released?", options: ["1975", "1976", "1977"], answer: "1975", cat: "year", detail: "Jaws (1975)" },
  { q: "Which of these came out first?", options: ["La La Land", "Inglourious Basterds", "La Dolce Vita", "Ben-Hur"], answer: "Ben-Hur", cat: "year", detail: "Ben-Hur (1959)" },
  { q: "Which of these came out first?", options: ["La La Land", "West Side Story", "The Breakfast Club", "The King's Speech"], answer: "West Side Story", cat: "year", detail: "West Side Story (1961)" },
  { q: "Which of these came out first?", options: ["Manchester by the Sea", "It's a Wonderful Life", "Annie Hall", "The Third Man"], answer: "It's a Wonderful Life", cat: "year", detail: "It's a Wonderful Life (1946)" },
  { q: "Which of these came out first?", options: ["Room", "Nomadland", "To Kill a Mockingbird", "Apocalypse Now"], answer: "To Kill a Mockingbird", cat: "year", detail: "To Kill a Mockingbird (1962)" },
  { q: "Which of these came out first?", options: ["A Clockwork Orange", "Rosemary's Baby", "Drive", "Rear Window"], answer: "Rear Window", cat: "year", detail: "Rear Window (1954)" },
  { q: "Which of these came out first?", options: ["Batman", "Sunset Boulevard", "Rocky", "The Third Man"], answer: "The Third Man", cat: "year", detail: "The Third Man (1949)" },
  { q: "Which of these came out first?", options: ["Wall-E", "Vertigo", "Parasite", "Her"], answer: "Vertigo", cat: "year", detail: "Vertigo (1958)" },
  { q: "Which of these was released in the 1980s?", options: ["Ghostbusters", "2001: A Space Odyssey", "The Wizard of Oz", "Black Swan"], answer: "Ghostbusters", cat: "year", detail: "Ghostbusters (1984)" },
  { q: "Which of these came out first?", options: ["Killers of the Flower Moon", "12 Years a Slave", "The Wizard of Oz", "Drive My Car"], answer: "The Wizard of Oz", cat: "year", detail: "The Wizard of Oz (1939)" },
  { q: "Which of these came out first?", options: ["Indiana Jones and the Last Crusade", "La Dolce Vita", "Minari", "Birdman"], answer: "La Dolce Vita", cat: "year", detail: "La Dolce Vita (1960)" },
  { q: "Which of these came out first?", options: ["Indiana Jones and the Last Crusade", "The Third Man", "Blade Runner", "The Wizard of Oz"], answer: "The Wizard of Oz", cat: "year", detail: "The Wizard of Oz (1939)" },
  { q: "Which of these came out first?", options: ["Rosemary's Baby", "The King's Speech", "Inception", "Ben-Hur"], answer: "Ben-Hur", cat: "year", detail: "Ben-Hur (1959)" },
  { q: "Which of these came out first?", options: ["Moonrise Kingdom", "Dune", "The King's Speech", "The Sting"], answer: "The Sting", cat: "year", detail: "The Sting (1973)" },
  { q: "Which of these came out first?", options: ["Inglourious Basterds", "The King's Speech", "Ben-Hur", "Mad Max: Fury Road"], answer: "Ben-Hur", cat: "year", detail: "Ben-Hur (1959)" },
  { q: "Which of these came out first?", options: ["Wall-E", "Batman", "The Shining", "Iron Man"], answer: "The Shining", cat: "year", detail: "The Shining (1980)" },
  { q: "When was Fight Club released?", options: ["1999", "1998", "2000"], answer: "1999", cat: "year", detail: "Fight Club (1999)" },
  { q: "Which of these was released in the 1980s?", options: ["Blade Runner", "The French Connection", "Batman Begins", "Gravity"], answer: "Blade Runner", cat: "year", detail: "Blade Runner (1982)" },
  { q: "Which of these came out first?", options: ["Star Wars", "The Graduate", "Gone with the Wind", "Close Encounters of the Third Kind"], answer: "Gone with the Wind", cat: "year", detail: "Gone with the Wind (1939)" },
  { q: "Which of these came out first?", options: ["The Dark Knight", "Rain Man", "Batman", "The Wolf of Wall Street"], answer: "Rain Man", cat: "year", detail: "Rain Man (1988)" },
  { q: "Which of these came out first?", options: ["The Sting", "Lethal Weapon", "Joker", "Chinatown"], answer: "The Sting", cat: "year", detail: "The Sting (1973)" },
  { q: "Which of these came out first?", options: ["Dunkirk", "Room", "Toy Story 3", "The Shining"], answer: "The Shining", cat: "year", detail: "The Shining (1980)" },
  { q: "Which of these was released in the 2000s?", options: ["The Lord of the Rings: The Fellowship of the Ring", "Butch Cassidy and the Sundance Kid", "Nosferatu", "Inception"], answer: "The Lord of the Rings: The Fellowship of the Ring", cat: "year", detail: "The Lord of the Rings: The Fellowship of the Ring (2001)" },
  { q: "Which of these came out first?", options: ["Jaws", "M", "Black Swan", "Get Out"], answer: "M", cat: "year", detail: "M (1931)" },
  { q: "Which of these came out first?", options: ["Nosferatu", "Citizen Kane", "Room", "Moonlight"], answer: "Nosferatu", cat: "year", detail: "Nosferatu (1922)" },
  { q: "Which of these came out first?", options: ["Blade Runner", "Birdman", "The Passion of Joan of Arc", "Drive"], answer: "The Passion of Joan of Arc", cat: "year", detail: "The Passion of Joan of Arc (1928)" },
  { q: "Which of these was released in the 2020s?", options: ["The Power of the Dog", "Breathless", "Forrest Gump", "Stalker"], answer: "The Power of the Dog", cat: "year", detail: "The Power of the Dog (2021)" },
  { q: "Which of these came out first?", options: ["Sunset Boulevard", "Ghostbusters", "Annie Hall", "Full Metal Jacket"], answer: "Sunset Boulevard", cat: "year", detail: "Sunset Boulevard (1950)" },
  { q: "Which of these was released in the 1990s?", options: ["Léon: The Professional", "Butch Cassidy and the Sundance Kid", "Stalker", "Gravity"], answer: "Léon: The Professional", cat: "year", detail: "Léon: The Professional (1994)" },
  { q: "Which of these came out first?", options: ["The Tree of Life", "The Deer Hunter", "Full Metal Jacket", "The Thing"], answer: "The Deer Hunter", cat: "year", detail: "The Deer Hunter (1978)" },
  { q: "Which of these came out first?", options: ["Stalker", "Black Panther", "8½", "Raging Bull"], answer: "8½", cat: "year", detail: "8½ (1963)" },
  { q: "Which of these was released in the 1980s?", options: ["The Empire Strikes Back", "Batman Begins", "Room", "Dune"], answer: "The Empire Strikes Back", cat: "year", detail: "The Empire Strikes Back (1980)" },
  { q: "Which of these came out first?", options: ["Butch Cassidy and the Sundance Kid", "North by Northwest", "Star Wars", "The Seventh Seal"], answer: "The Seventh Seal", cat: "year", detail: "The Seventh Seal (1957)" },
  { q: "When was Titanic released?", options: ["1997", "1996", "1994"], answer: "1997", cat: "year", detail: "Titanic (1997)" },
  { q: "Which of these was released in the 2010s?", options: ["Skyfall", "A Clockwork Orange", "The Passion of Joan of Arc", "Psycho"], answer: "Skyfall", cat: "year", detail: "Skyfall (2012)" },
  { q: "Which of these was released in the 2020s?", options: ["Drive My Car", "Independence Day", "Persona", "Ratatouille"], answer: "Drive My Car", cat: "year", detail: "Drive My Car (2021)" },
  { q: "Which of these was released in the 2010s?", options: ["1917", "The Princess Bride", "Unforgiven", "Scream"], answer: "1917", cat: "year", detail: "1917 (2019)" },
  { q: "Which of these came out first?", options: ["Drive", "The Dark Knight Rises", "Skyfall", "Amadeus"], answer: "Amadeus", cat: "year", detail: "Amadeus (1984)" },
  { q: "Which of these came out first?", options: ["Return of the Jedi", "Solaris", "Raging Bull", "Alien"], answer: "Solaris", cat: "year", detail: "Solaris (1972)" },
  { q: "Which of these came out first?", options: ["Spotlight", "Raging Bull", "Interstellar", "The Banshees of Inisherin"], answer: "Raging Bull", cat: "year", detail: "Raging Bull (1980)" },
  { q: "Which of these came out first?", options: ["La Dolce Vita", "Juno", "King Kong", "Stalker"], answer: "King Kong", cat: "year", detail: "King Kong (1933)" },
  { q: "Which of these was released in the 1990s?", options: ["Groundhog Day", "Rain Man", "The French Connection", "Interstellar"], answer: "Groundhog Day", cat: "year", detail: "Groundhog Day (1993)" },
  { q: "Which of these came out first?", options: ["The Banshees of Inisherin", "The Deer Hunter", "Joker", "Lethal Weapon"], answer: "The Deer Hunter", cat: "year", detail: "The Deer Hunter (1978)" },
  { q: "Which of these came out first?", options: ["The 400 Blows", "1917", "Butch Cassidy and the Sundance Kid", "Bicycle Thieves"], answer: "Bicycle Thieves", cat: "year", detail: "Bicycle Thieves (1948)" },
  { q: "Which of these was released in the 2000s?", options: ["Zodiac", "American Beauty", "Snow White and the Seven Dwarfs", "To Kill a Mockingbird"], answer: "Zodiac", cat: "year", detail: "Zodiac (2007)" },
  { q: "Which of these came out first?", options: ["Drive My Car", "Network", "Little Miss Sunshine", "Casino Royale"], answer: "Network", cat: "year", detail: "Network (1976)" },
  { q: "Which of these was released in the 2020s?", options: ["Killers of the Flower Moon", "Casino Royale", "Lady Bird", "Ghostbusters"], answer: "Killers of the Flower Moon", cat: "year", detail: "Killers of the Flower Moon (2023)" },
  { q: "Which of these was released in the 1980s?", options: ["The Empire Strikes Back", "Black Swan", "2001: A Space Odyssey", "Roma"], answer: "The Empire Strikes Back", cat: "year", detail: "The Empire Strikes Back (1980)" },
  { q: "Which of these was released in the 2020s?", options: ["Killers of the Flower Moon", "Aliens", "Star Wars", "Sunset Boulevard"], answer: "Killers of the Flower Moon", cat: "year", detail: "Killers of the Flower Moon (2023)" },
  { q: "Which of these came out first?", options: ["Spotlight", "Network", "The French Connection", "Mad Max: Fury Road"], answer: "The French Connection", cat: "year", detail: "The French Connection (1971)" },
  { q: "Which of these came out first?", options: ["Snow White and the Seven Dwarfs", "Rosemary's Baby", "Psycho", "The French Connection"], answer: "Snow White and the Seven Dwarfs", cat: "year", detail: "Snow White and the Seven Dwarfs (1937)" },
  { q: "Which of these came out first?", options: ["Blade Runner", "Top Gun: Maverick", "Barbie", "Boyhood"], answer: "Blade Runner", cat: "year", detail: "Blade Runner (1982)" },
  { q: "Which of these was released in the 1990s?", options: ["Edward Scissorhands", "Full Metal Jacket", "Bicycle Thieves", "Manchester by the Sea"], answer: "Edward Scissorhands", cat: "year", detail: "Edward Scissorhands (1990)" },
  { q: "Which of these was released in the 1990s?", options: ["Edward Scissorhands", "Bicycle Thieves", "Black Panther", "Dr. Strangelove"], answer: "Edward Scissorhands", cat: "year", detail: "Edward Scissorhands (1990)" },
  { q: "Which of these came out first?", options: ["Network", "Seven Samurai", "M", "Gravity"], answer: "M", cat: "year", detail: "M (1931)" },
  { q: "Which of these was released in the 1980s?", options: ["The Empire Strikes Back", "American Beauty", "The Sixth Sense", "Kill Bill: Vol. 1"], answer: "The Empire Strikes Back", cat: "year", detail: "The Empire Strikes Back (1980)" },,
  { q: "\"Nobody puts Baby in a corner.\"", options: ["Dirty Dancing", "Footloose", "Grease", "Flashdance"], answer: "Dirty Dancing", cat: "quote", detail: "Patrick Swayze's iconic line" },
  { q: "\"You shall not pass!\"", options: ["The Lord of the Rings: The Fellowship of the Ring", "Harry Potter", "The Hobbit", "Narnia"], answer: "The Lord of the Rings: The Fellowship of the Ring", cat: "quote", detail: "Gandalf on the Bridge of Khazad-dûm" },
  { q: "\"I'm also just a girl, standing in front of a boy, asking him to love her.\"", options: ["Notting Hill", "When Harry Met Sally", "Sleepless in Seattle", "Love Actually"], answer: "Notting Hill", cat: "quote", detail: "Julia Roberts to Hugh Grant" },
  { q: "\"My mama always said life was like a box of chocolates.\"", options: ["Forrest Gump", "Rain Man", "The Help", "Big"], answer: "Forrest Gump", cat: "quote", detail: "Tom Hanks as Forrest" },
  { q: "\"Wax on, wax off.\"", options: ["The Karate Kid", "Rocky", "Bloodsport", "Enter the Dragon"], answer: "The Karate Kid", cat: "quote", detail: "Mr. Miyagi's training method" },
  { q: "\"There is no spoon.\"", options: ["The Matrix", "Inception", "Interstellar", "Dark City"], answer: "The Matrix", cat: "quote", detail: "The boy bending the spoon" },
  { q: "\"Ogres are like onions.\"", options: ["Shrek", "Monsters, Inc.", "Toy Story", "Ice Age"], answer: "Shrek", cat: "quote", detail: "Shrek explaining ogre layers" },
  { q: "\"After all this time? Always.\"", options: ["Harry Potter and the Deathly Hallows", "Twilight", "The Notebook", "Pride and Prejudice"], answer: "Harry Potter and the Deathly Hallows", cat: "quote", detail: "Snape's devotion to Lily" },
  { q: "\"With great power comes great responsibility.\"", options: ["Spider-Man", "Batman Begins", "Superman", "Iron Man"], answer: "Spider-Man", cat: "quote", detail: "Uncle Ben's wisdom" },
  { q: "\"Fish are friends, not food.\"", options: ["Finding Nemo", "Shark Tale", "The Little Mermaid", "Moana"], answer: "Finding Nemo", cat: "quote", detail: "Bruce the shark's mantra" },
  { q: "\"It's alive! It's alive!\"", options: ["Frankenstein", "Bride of Frankenstein", "Dracula", "The Mummy"], answer: "Frankenstein", cat: "quote", detail: "Colin Clive as Dr. Frankenstein (1931)" },
  { q: "\"I am Groot.\"", options: ["Guardians of the Galaxy", "Avengers: Infinity War", "Thor", "Ant-Man"], answer: "Guardians of the Galaxy", cat: "quote", detail: "Vin Diesel's three-word role" },
  { q: "\"Inconceivable!\"", options: ["The Princess Bride", "Monty Python and the Holy Grail", "Robin Hood: Men in Tights", "Stardust"], answer: "The Princess Bride", cat: "quote", detail: "Wallace Shawn as Vizzini" },
  { q: "\"That'll do, pig. That'll do.\"", options: ["Babe", "Charlotte's Web", "Toy Story", "Stuart Little"], answer: "Babe", cat: "quote", detail: "Farmer Hoggett's quiet praise" },
  { q: "\"I volunteer as tribute!\"", options: ["The Hunger Games", "Divergent", "The Maze Runner", "Ender's Game"], answer: "The Hunger Games", cat: "quote", detail: "Katniss saving her sister" },
  { q: "\"Roads? Where we're going, we don't need roads.\"", options: ["Back to the Future", "The Matrix", "Star Wars", "Tron"], answer: "Back to the Future", cat: "quote", detail: "Doc Brown before time traveling" },
  { q: "\"I'm having an old friend for dinner.\"", options: ["The Silence of the Lambs", "Psycho", "Se7en", "American Psycho"], answer: "The Silence of the Lambs", cat: "quote", detail: "Hannibal Lecter's chilling sign-off" },
  { q: "\"To the stars, Bowen. To the stars.\"", options: ["Dragonheart", "The NeverEnding Story", "Willow", "Labyrinth"], answer: "Dragonheart", cat: "quote", detail: "Draco the dragon's farewell" },
  { q: "\"Yippee-ki-yay.\"", options: ["Die Hard", "Lethal Weapon", "Rambo", "Total Recall"], answer: "Die Hard", cat: "quote", detail: "Bruce Willis as John McClane" },
  { q: "\"Snap out of it!\"", options: ["Moonstruck", "When Harry Met Sally", "Annie Hall", "Tootsie"], answer: "Moonstruck", cat: "quote", detail: "Cher slapping Nicolas Cage" },
  { q: "What is Indiana Jones afraid of?", options: ["Snakes", "Spiders", "Heights", "Water"], answer: "Snakes", cat: "trivia", detail: "\"I hate snakes!\"" },
  { q: "What type of animal is Simba?", options: ["Lion", "Tiger", "Leopard", "Cheetah"], answer: "Lion", cat: "trivia", detail: "The Lion King" },
  { q: "What planet is Superman from?", options: ["Krypton", "Asgard", "Mars", "Titan"], answer: "Krypton", cat: "trivia", detail: "DC Comics lore" },
  { q: "What do the Ghostbusters drive?", options: ["A hearse (Ecto-1)", "A school bus", "A taxi", "A fire truck"], answer: "A hearse (Ecto-1)", cat: "trivia", detail: "The modified 1959 Cadillac" },
  { q: "How many Infinity Stones are there in the MCU?", options: ["6", "5", "7", "4"], answer: "6", cat: "trivia", detail: "Space, Mind, Reality, Power, Time, Soul" },
  { q: "What is the name of the fictional hotel in The Shining?", options: ["The Overlook Hotel", "The Stanley Hotel", "The Bates Motel", "The Cecil Hotel"], answer: "The Overlook Hotel", cat: "trivia", detail: "Inspired by the Stanley Hotel in Colorado" },
  { q: "What is Nemo's disability in Finding Nemo?", options: ["A small fin", "Blindness in one eye", "A missing tail", "Deafness"], answer: "A small fin", cat: "trivia", detail: "His \"lucky fin\"" },
  { q: "In Toy Story, what is Woody's last name?", options: ["Pride", "Ranger", "Davis", "Sheriff"], answer: "Pride", cat: "trivia", detail: "Sheriff Woody Pride" },
  { q: "What city does Batman protect?", options: ["Gotham City", "Metropolis", "Star City", "Central City"], answer: "Gotham City", cat: "trivia", detail: "The Dark Knight's home" },
  { q: "What floor does the chocolate factory elevator crash through?", options: ["The roof", "The 13th floor", "The basement", "Floor 100"], answer: "The roof", cat: "trivia", detail: "The Great Glass Elevator goes up and out" },
  { q: "What sport does Rocky Balboa box in?", options: ["Boxing", "MMA", "Kickboxing", "Wrestling"], answer: "Boxing", cat: "trivia", detail: "The Italian Stallion" },
  { q: "What does E.T. want to do?", options: ["Phone home", "Eat candy", "Fly a bike", "Build a spaceship"], answer: "Phone home", cat: "trivia", detail: "\"E.T. phone home\"" },
  { q: "What material is Captain America's shield made from?", options: ["Vibranium", "Adamantium", "Titanium", "Uru metal"], answer: "Vibranium", cat: "trivia", detail: "From Wakanda" },
  { q: "What does the DeLorean need to reach to time travel?", options: ["88 mph", "100 mph", "75 mph", "120 mph"], answer: "88 mph", cat: "trivia", detail: "Back to the Future's magic speed" },
  { q: "In The Wizard of Oz, what color are Dorothy's slippers?", options: ["Ruby red", "Silver", "Gold", "Glass"], answer: "Ruby red", cat: "trivia", detail: "Silver in the book, red for Technicolor" },
  { q: "Which director is known for making cameos in his own films?", options: ["Alfred Hitchcock", "Steven Spielberg", "Martin Scorsese", "Stanley Kubrick"], answer: "Alfred Hitchcock", cat: "bts", detail: "Appeared in 40 of his own films" },
  { q: "What was the first fully computer-animated feature film?", options: ["Toy Story", "Shrek", "A Bug's Life", "Monsters, Inc."], answer: "Toy Story", cat: "bts", detail: "Pixar's 1995 breakthrough" },
  { q: "Which actor performed most of his own stunts in the Mission: Impossible films?", options: ["Tom Cruise", "Matt Damon", "Daniel Craig", "Keanu Reeves"], answer: "Tom Cruise", cat: "bts", detail: "Including hanging from planes and climbing buildings" },
  { q: "Which famous film franchise was almost directed by Steven Spielberg?", options: ["James Bond", "Star Trek", "Batman", "Mission: Impossible"], answer: "James Bond", cat: "bts", detail: "Spielberg was turned down, then made Indiana Jones instead" },
  { q: "How many actors have played James Bond in the official films?", options: ["6", "5", "7", "8"], answer: "6", cat: "bts", detail: "Connery, Lazenby, Moore, Dalton, Brosnan, Craig" },
  { q: "Which blockbuster was famously troubled by a malfunctioning mechanical shark?", options: ["Jaws", "Deep Blue Sea", "The Meg", "Open Water"], answer: "Jaws", cat: "bts", detail: "Named \"Bruce\" — the breakdowns made the film better" },
  { q: "What animated studio made Spirited Away?", options: ["Studio Ghibli", "Pixar", "DreamWorks", "Disney"], answer: "Studio Ghibli", cat: "bts", detail: "Hayao Miyazaki's masterpiece" },
  { q: "What technology did Avatar (2009) pioneer?", options: ["Performance capture 3D", "IMAX filming", "Digital color grading", "CGI backgrounds"], answer: "Performance capture 3D", cat: "bts", detail: "Cameron developed new 3D cameras" },
  { q: "Which actor was in a coma makeup chair for hours daily for a film?", options: ["Jim Carrey for The Grinch", "Gary Oldman for Darkest Hour", "John Hurt for The Elephant Man", "Ralph Fiennes for Voldemort"], answer: "Jim Carrey for The Grinch", cat: "bts", detail: "8+ hours daily of prosthetic application" },
  { q: "Which film's production was so chaotic it nearly bankrupted its studio?", options: ["Apocalypse Now", "Waterworld", "Cleopatra", "Heaven's Gate"], answer: "Apocalypse Now", cat: "bts", detail: "Coppola: \"We were in the jungle. There were too many of us.\"" },
  { q: "Who composed the Star Wars score?", options: ["John Williams", "Hans Zimmer", "Howard Shore", "Danny Elfman"], answer: "John Williams", cat: "soundtrack", detail: "Williams's most iconic work" },
  { q: "\"Let It Go\" is from which animated film?", options: ["Frozen", "Tangled", "Moana", "Encanto"], answer: "Frozen", cat: "soundtrack", detail: "Idina Menzel's massive hit" },
  { q: "Who composed the Jaws theme?", options: ["John Williams", "Bernard Herrmann", "Jerry Goldsmith", "Ennio Morricone"], answer: "John Williams", cat: "soundtrack", detail: "Two notes that changed horror" },
  { q: "\"Stayin' Alive\" is associated with which film?", options: ["Saturday Night Fever", "Grease", "Pulp Fiction", "Flashdance"], answer: "Saturday Night Fever", cat: "soundtrack", detail: "The Bee Gees' disco anthem" },
  { q: "Who composed the Harry Potter theme?", options: ["John Williams", "Hans Zimmer", "Howard Shore", "Alexandre Desplat"], answer: "John Williams", cat: "soundtrack", detail: "\"Hedwig's Theme\"" },
  { q: "\"My Heart Will Go On\" is from which film?", options: ["Titanic", "The Notebook", "A Star Is Born", "Ghost"], answer: "Titanic", cat: "soundtrack", detail: "Celine Dion's Oscar-winning ballad" },
  { q: "Which film features \"Bohemian Rhapsody\" during a car sing-along?", options: ["Wayne's World", "Bohemian Rhapsody", "Almost Famous", "Sing Street"], answer: "Wayne's World", cat: "soundtrack", detail: "Mike Myers headbanging in the Mirthmobile" },
  { q: "Who composed The Lord of the Rings soundtrack?", options: ["Howard Shore", "John Williams", "Hans Zimmer", "James Horner"], answer: "Howard Shore", cat: "soundtrack", detail: "Shore won two Oscars for the trilogy" },
  { q: "\"Eye of the Tiger\" was written for which film?", options: ["Rocky III", "Rocky", "Rocky II", "Rocky IV"], answer: "Rocky III", cat: "soundtrack", detail: "Survivor's anthem" },
  { q: "Who composed the iconic Psycho violin screech?", options: ["Bernard Herrmann", "John Williams", "Alfred Newman", "Max Steiner"], answer: "Bernard Herrmann", cat: "soundtrack", detail: "The shower scene's stabbing strings" },
  { q: "What is the highest-grossing film of all time (unadjusted)?", options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], answer: "Avatar", cat: "boxoffice", detail: "Over $2.9 billion worldwide" },
  { q: "Which animated film first crossed $1 billion at the box office?", options: ["Toy Story 3", "Frozen", "Finding Nemo", "Shrek 2"], answer: "Toy Story 3", cat: "boxoffice", detail: "In 2010" },
  { q: "Which franchise has earned the most total box office revenue?", options: ["Marvel Cinematic Universe", "Star Wars", "Harry Potter", "James Bond"], answer: "Marvel Cinematic Universe", cat: "boxoffice", detail: "Over $29 billion combined" },
  { q: "What film held the box office record before Avatar?", options: ["Titanic", "The Lord of the Rings: Return of the King", "Star Wars", "Jurassic Park"], answer: "Titanic", cat: "boxoffice", detail: "Titanic held the record from 1997-2010" },
  { q: "Which horror film was made for $60,000 and grossed $193 million?", options: ["Paranormal Activity", "The Blair Witch Project", "Get Out", "Saw"], answer: "Paranormal Activity", cat: "boxoffice", detail: "One of the most profitable films ever" },
  { q: "Who won Best Actor for Oppenheimer?", options: ["Cillian Murphy", "Robert Downey Jr.", "Matt Damon", "Josh Hartnett"], answer: "Cillian Murphy", cat: "oscar", detail: "Murphy's first Oscar" },
  { q: "Which film won Best Picture in 2024?", options: ["Oppenheimer", "Barbie", "Killers of the Flower Moon", "Poor Things"], answer: "Oppenheimer", cat: "oscar", detail: "Nolan's first Best Picture win" },
  { q: "Who has won the most acting Oscars?", options: ["Katharine Hepburn (4)", "Meryl Streep (3)", "Jack Nicholson (3)", "Daniel Day-Lewis (3)"], answer: "Katharine Hepburn (4)", cat: "oscar", detail: "Won in 1934, 1968, 1969, and 1982" },
  { q: "Which animated film won Best Picture (not just Best Animated)?", options: ["No animated film has won Best Picture", "Toy Story 3", "Up", "Spirited Away"], answer: "No animated film has won Best Picture", cat: "oscar", detail: "Beauty and the Beast came closest as a nominee" },
  { q: "Who is the youngest person to win an acting Oscar?", options: ["Tatum O'Neal (10 years old)", "Anna Paquin (11)", "Shirley Temple", "Haley Joel Osment"], answer: "Tatum O'Neal (10 years old)", cat: "oscar", detail: "Won Supporting Actress for Paper Moon (1974)" },
  { q: "Who plays Jack Sparrow in Pirates of the Caribbean?", options: ["Johnny Depp", "Orlando Bloom", "Geoffrey Rush", "Javier Bardem"], answer: "Johnny Depp", cat: "cast", detail: "Depp's most iconic role" },
  { q: "Who played Wolverine for 17 years?", options: ["Hugh Jackman", "Chris Hemsworth", "Ryan Reynolds", "Ben Affleck"], answer: "Hugh Jackman", cat: "cast", detail: "From X-Men (2000) to Logan (2017)" },
  { q: "Who plays Hermione Granger in the Harry Potter films?", options: ["Emma Watson", "Emma Stone", "Emma Thompson", "Emily Blunt"], answer: "Emma Watson", cat: "cast", detail: "Cast at age 9" },
  { q: "Who played the Joker in The Dark Knight?", options: ["Heath Ledger", "Jack Nicholson", "Joaquin Phoenix", "Jared Leto"], answer: "Heath Ledger", cat: "cast", detail: "Ledger's posthumous Oscar-winning performance" },
  { q: "Who plays Katniss Everdeen in The Hunger Games?", options: ["Jennifer Lawrence", "Emma Stone", "Shailene Woodley", "Saoirse Ronan"], answer: "Jennifer Lawrence", cat: "cast", detail: "Lawrence was 21 when cast" },
  { q: "Who voiced Woody in Toy Story?", options: ["Tom Hanks", "Tim Allen", "Robin Williams", "Billy Crystal"], answer: "Tom Hanks", cat: "cast", detail: "Hanks voiced Woody across all four films" },
  { q: "Who plays Tony Stark / Iron Man?", options: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"], answer: "Robert Downey Jr.", cat: "cast", detail: "The role that launched the MCU" },
  { q: "Who plays Elle Woods in Legally Blonde?", options: ["Reese Witherspoon", "Cameron Diaz", "Drew Barrymore", "Renée Zellweger"], answer: "Reese Witherspoon", cat: "cast", detail: "Witherspoon's breakout comedy role" },
  { q: "Who played Gandalf in The Lord of the Rings?", options: ["Ian McKellen", "Michael Gambon", "Christopher Lee", "Patrick Stewart"], answer: "Ian McKellen", cat: "cast", detail: "McKellen was nominated for the Oscar" },
  { q: "Who plays Black Widow in the MCU?", options: ["Scarlett Johansson", "Gal Gadot", "Brie Larson", "Elizabeth Olsen"], answer: "Scarlett Johansson", cat: "cast", detail: "First appeared in Iron Man 2 (2010)" }
];

const MEDIUM_QUESTIONS = [
{ q: "Who played Travis Bickle in Taxi Driver?", options: ["Robert De Niro", "Peter Finch", "Maria Falconetti", "Cillian Murphy"], answer: "Robert De Niro", cat: "cast", detail: "Robert De Niro in Taxi Driver" },
  { q: "Who played young Vito Corleone in The Godfather Part II?", options: ["Robert De Niro", "Song Kang-ho", "Andy Serkis", "Anthony Hopkins"], answer: "Robert De Niro", cat: "cast", detail: "Robert De Niro in The Godfather Part II" },
  { q: "Who played Jake LaMotta in Raging Bull?", options: ["Robert De Niro", "Hugh Jackman", "Max Schreck", "Joaquin Phoenix"], answer: "Robert De Niro", cat: "cast", detail: "Robert De Niro in Raging Bull" },
  { q: "Who played Tony Montana in Scarface?", options: ["Al Pacino", "Daniel Radcliffe", "Arnold Schwarzenegger", "Ralph Fiennes"], answer: "Al Pacino", cat: "cast", detail: "Al Pacino in Scarface" },
  { q: "Who played Michael Corleone in The Godfather?", options: ["Al Pacino", "Sigourney Weaver", "Bruno Ganz", "Jean-Pierre Léaud"], answer: "Al Pacino", cat: "cast", detail: "Al Pacino in The Godfather" },
  { q: "Who played Hannibal Lecter in The Silence of the Lambs?", options: ["Anthony Hopkins", "Brad Pitt", "Sigourney Weaver", "Lamberto Maggiorani"], answer: "Anthony Hopkins", cat: "cast", detail: "Anthony Hopkins in The Silence of the Lambs" },
  { q: "Who played Maximus in Gladiator?", options: ["Russell Crowe", "Hugh Jackman", "Jean Seberg", "Andy Serkis"], answer: "Russell Crowe", cat: "cast", detail: "Russell Crowe in Gladiator" },
  { q: "Who played the Bride in Kill Bill?", options: ["Uma Thurman", "Joe Pesci", "Joaquin Phoenix", "Arnold Schwarzenegger"], answer: "Uma Thurman", cat: "cast", detail: "Uma Thurman in Kill Bill" },
  { q: "Who played Clarice Starling in The Silence of the Lambs?", options: ["Jodie Foster", "Natalie Portman", "Daniel Radcliffe", "Harrison Ford"], answer: "Jodie Foster", cat: "cast", detail: "Jodie Foster in The Silence of the Lambs" },
  { q: "Who played Anton Chigurh in No Country for Old Men?", options: ["Javier Bardem", "Ian McKellen", "Liam Neeson", "Christian Bale"], answer: "Javier Bardem", cat: "cast", detail: "Javier Bardem in No Country for Old Men" },
  { q: "Who played Patrick Bateman in American Psycho?", options: ["Christian Bale", "Ian McKellen", "Yves Montand", "Arnold Schwarzenegger"], answer: "Christian Bale", cat: "cast", detail: "Christian Bale in American Psycho" },
  { q: "Who played Oskar Schindler in Schindler's List?", options: ["Liam Neeson", "Brad Pitt", "Christoph Waltz", "Jean Seberg"], answer: "Liam Neeson", cat: "cast", detail: "Liam Neeson in Schindler's List" },
  { q: "Who played 'The Dude' Lebowski in The Big Lebowski?", options: ["Jeff Bridges", "Heath Ledger", "Lamberto Maggiorani", "Bernard Lee"], answer: "Jeff Bridges", cat: "cast", detail: "Jeff Bridges in The Big Lebowski" },
  { q: "Who played Raymond Babbitt in Rain Man?", options: ["Dustin Hoffman", "Hugh Jackman", "Sigourney Weaver", "Jean Seberg"], answer: "Dustin Hoffman", cat: "cast", detail: "Dustin Hoffman in Rain Man" },
  { q: "Who played Jack Torrance in The Shining?", options: ["Jack Nicholson", "Klaus Kinski", "Marlon Brando", "Jeff Bridges"], answer: "Jack Nicholson", cat: "cast", detail: "Jack Nicholson in The Shining" },
  { q: "Who played Randle McMurphy in One Flew Over the Cuckoo's Nest?", options: ["Jack Nicholson", "Jean-Pierre Léaud", "Liam Neeson", "Klaus Kinski"], answer: "Jack Nicholson", cat: "cast", detail: "Jack Nicholson in One Flew Over the Cuckoo's Nest" },
  { q: "Who played Furiosa in Mad Max: Fury Road?", options: ["Charlize Theron", "Margot Robbie", "Daniel Day-Lewis", "Anthony Hopkins"], answer: "Charlize Theron", cat: "cast", detail: "Charlize Theron in Mad Max: Fury Road" },
  { q: "Who played Władysław Szpilman in The Pianist?", options: ["Adrien Brody", "Klaus Kinski", "Toshiro Mifune", "Jean-Pierre Léaud"], answer: "Adrien Brody", cat: "cast", detail: "Adrien Brody in The Pianist" },
  { q: "Who played Gollum in The Lord of the Rings?", options: ["Andy Serkis", "Harrison Ford", "Dustin Hoffman", "Leonardo DiCaprio"], answer: "Andy Serkis", cat: "cast", detail: "Andy Serkis in The Lord of the Rings" },
  { q: "Who played Amy Dunne in Gone Girl?", options: ["Rosamund Pike", "Choi Min-sik", "Jodie Foster", "Yves Montand"], answer: "Rosamund Pike", cat: "cast", detail: "Rosamund Pike in Gone Girl" },
  { q: "Who played Red in The Shawshank Redemption?", options: ["Morgan Freeman", "Tom Cruise", "Uma Thurman", "Brad Pitt"], answer: "Morgan Freeman", cat: "cast", detail: "Morgan Freeman in The Shawshank Redemption" },
  { q: "Who played Jason Bourne in the Bourne series?", options: ["Matt Damon", "Lamberto Maggiorani", "Bernard Lee", "Morgan Freeman"], answer: "Matt Damon", cat: "cast", detail: "Matt Damon in the Bourne series" },
  { q: "Who played Will Hunting in Good Will Hunting?", options: ["Matt Damon", "Max Schreck", "Cillian Murphy", "Keanu Reeves"], answer: "Matt Damon", cat: "cast", detail: "Matt Damon in Good Will Hunting" },
  { q: "Who played Bill the Butcher in Gangs of New York?", options: ["Daniel Day-Lewis", "Dustin Hoffman", "Jodie Foster", "Joe Pesci"], answer: "Daniel Day-Lewis", cat: "cast", detail: "Daniel Day-Lewis in Gangs of New York" },
  { q: "Who played J. Robert Oppenheimer in Oppenheimer?", options: ["Cillian Murphy", "Christian Bale", "Marcello Mastroianni", "Klaus Kinski"], answer: "Cillian Murphy", cat: "cast", detail: "Cillian Murphy in Oppenheimer" },
  { q: "Who played Barbie in Barbie?", options: ["Margot Robbie", "Marcello Mastroianni", "Jeff Bridges", "Uma Thurman"], answer: "Margot Robbie", cat: "cast", detail: "Margot Robbie in Barbie" },
  { q: "Who played Hans Landa in Inglourious Basterds?", options: ["Christoph Waltz", "Arnold Schwarzenegger", "Uma Thurman", "Liam Neeson"], answer: "Christoph Waltz", cat: "cast", detail: "Christoph Waltz in Inglourious Basterds" },
  { q: "Who played Amon Göth in Schindler's List?", options: ["Ralph Fiennes", "Ben Kingsley", "Lamberto Maggiorani", "Rosamund Pike"], answer: "Ralph Fiennes", cat: "cast", detail: "Ralph Fiennes in Schindler's List" },
  { q: "Who played Nina Sayers in Black Swan?", options: ["Natalie Portman", "Daniel Radcliffe", "Morgan Freeman", "Klaus Kinski"], answer: "Natalie Portman", cat: "cast", detail: "Natalie Portman in Black Swan" },
  { q: "Who played Arthur Fleck in Joker?", options: ["Joaquin Phoenix", "Song Kang-ho", "Sigourney Weaver", "Takashi Shimura"], answer: "Joaquin Phoenix", cat: "cast", detail: "Joaquin Phoenix in Joker" },
  { q: "\"Rosebud.\"", options: ["Citizen Kane", "Annie Hall", "Wayne's World", "The Empire Strikes Back"], answer: "Citizen Kane", cat: "quote", detail: "Cinema's most famous last word" },
  { q: "\"After all, tomorrow is another day.\"", options: ["Gone with the Wind", "Clerks", "Cool Hand Luke", "The Big Lebowski"], answer: "Gone with the Wind", cat: "quote", detail: "Scarlett's final line" },
  { q: "\"I drink your milkshake!\"", options: ["There Will Be Blood", "On the Waterfront", "Goodfellas", "Guardians of the Galaxy"], answer: "There Will Be Blood", cat: "quote", detail: "Day-Lewis as Plainview" },
  { q: "\"They call it a Royale with cheese.\"", options: ["Pulp Fiction", "Apocalypse Now", "Dirty Dancing", "E.T."], answer: "Pulp Fiction", cat: "quote", detail: "French McDonald's" },
  { q: "\"You had me at hello.\"", options: ["Jerry Maguire", "Midnight Cowboy", "The Sixth Sense", "Star Wars"], answer: "Jerry Maguire", cat: "quote", detail: "Zellweger to Cruise" },
  { q: "\"The first rule of Fight Club is: you do not talk about Fight Club.\"", options: ["Fight Club", "There Will Be Blood", "The Dark Knight", "Annie Hall"], answer: "Fight Club", cat: "quote", detail: "Brad Pitt's rules" },
  { q: "\"I'm walking here!\"", options: ["Midnight Cowboy", "The Lord of the Rings: The Two Towers", "Jaws", "A Few Good Men"], answer: "Midnight Cowboy", cat: "quote", detail: "Hoffman's partly ad-libbed moment" },
  { q: "\"Frankly, my dear, I don't give a damn.\"", options: ["Gone with the Wind", "The Shining", "On the Waterfront", "Casablanca"], answer: "Gone with the Wind", cat: "quote", detail: "Clark Gable's exit line" },
  { q: "\"I feel the need — the need for speed.\"", options: ["Top Gun", "Terminator 2", "Goodfellas", "The Godfather Part II"], answer: "Top Gun", cat: "quote", detail: "Cruise and Edwards" },
  { q: "\"Keep your friends close, but your enemies closer.\"", options: ["The Godfather Part II", "Midnight Cowboy", "Terminator 2", "Gone with the Wind"], answer: "The Godfather Part II", cat: "quote", detail: "Michael Corleone's philosophy" },
  { q: "\"You're a wizard, Harry.\"", options: ["Harry Potter and the Sorcerer's Stone", "Citizen Kane", "The Silence of the Lambs", "On the Waterfront"], answer: "Harry Potter and the Sorcerer's Stone", cat: "quote", detail: "Hagrid's revelation" },
  { q: "\"I see you.\"", options: ["Avatar", "Dirty Dancing", "Gone with the Wind", "Fight Club"], answer: "Avatar", cat: "quote", detail: "Na'vi greeting" },
  { q: "\"That's just, like, your opinion, man.\"", options: ["The Big Lebowski", "Taxi Driver", "The Dark Knight", "The Maltese Falcon"], answer: "The Big Lebowski", cat: "quote", detail: "The Dude abides" },
  { q: "\"It's alive! It's alive!\"", options: ["Frankenstein", "The Terminator", "The Big Lebowski", "The Godfather"], answer: "Frankenstein", cat: "quote", detail: "Colin Clive's ecstasy" },
  { q: "\"Wax on, wax off.\"", options: ["The Karate Kid", "The Godfather", "There Will Be Blood", "Jaws"], answer: "The Karate Kid", cat: "quote", detail: "Mr. Miyagi's training" },
  { q: "\"Show me the money!\"", options: ["Jerry Maguire", "Fight Club", "The Empire Strikes Back", "The Maltese Falcon"], answer: "Jerry Maguire", cat: "quote", detail: "Cuba Gooding Jr. on the phone" },
  { q: "\"As far back as I can remember, I always wanted to be a gangster.\"", options: ["Goodfellas", "Casablanca", "The Godfather", "There Will Be Blood"], answer: "Goodfellas", cat: "quote", detail: "Ray Liotta's opening line" },
  { q: "\"Nobody puts Baby in a corner.\"", options: ["Dirty Dancing", "The Karate Kid", "The Dark Knight", "The Lord of the Rings: The Two Towers"], answer: "Dirty Dancing", cat: "quote", detail: "Patrick Swayze defending Jennifer Grey" },
  { q: "\"I'm not even supposed to be here today!\"", options: ["Clerks", "The Empire Strikes Back", "The Big Lebowski", "The Shining"], answer: "Clerks", cat: "quote", detail: "Dante's refrain" },
  { q: "Which film won Best Picture in 1994?", options: ["Forrest Gump", "Pulp Fiction", "The Shawshank Redemption", "Quiz Show"], answer: "Forrest Gump", cat: "oscar", detail: "Gump over Shawshank & Pulp Fiction" },
  { q: "How many Oscars did Titanic win?", options: ["11", "8", "9", "14"], answer: "11", cat: "oscar", detail: "Tied with Ben-Hur" },
  { q: "Who won Best Actor for Joker (2019)?", options: ["Joaquin Phoenix", "Adam Driver", "Jonathan Pryce", "Antonio Banderas"], answer: "Joaquin Phoenix", cat: "oscar", detail: "Phoenix's first Oscar" },
  { q: "Who won Best Actress for Black Swan?", options: ["Natalie Portman", "Annette Bening", "Nicole Kidman", "Cate Blanchett"], answer: "Natalie Portman", cat: "oscar", detail: "Portman's only Oscar" },
  { q: "Who won Best Director for Gravity?", options: ["Alfonso Cuarón", "Steve McQueen", "Martin Scorsese", "David O. Russell"], answer: "Alfonso Cuarón", cat: "oscar", detail: "Cuarón's first win" },
  { q: "Which film won Best Picture in 2017?", options: ["Moonlight", "La La Land", "Manchester by the Sea", "Fences"], answer: "Moonlight", cat: "oscar", detail: "After the La La Land mix-up" },
  { q: "Who won Best Actress for La La Land?", options: ["Emma Stone", "Meryl Streep", "Natalie Portman", "Isabelle Huppert"], answer: "Emma Stone", cat: "oscar", detail: "Stone as Mia" },
  { q: "Who won Best Actor for The King's Speech?", options: ["Colin Firth", "Geoffrey Rush", "Jesse Eisenberg", "James Franco"], answer: "Colin Firth", cat: "oscar", detail: "Firth as George VI" },
  { q: "Who won Best Actor for Lincoln?", options: ["Daniel Day-Lewis", "Denzel Washington", "Hugh Jackman", "Bradley Cooper"], answer: "Daniel Day-Lewis", cat: "oscar", detail: "Record third Best Actor" },
  { q: "Who won Best Supporting Actor for The Dark Knight?", options: ["Heath Ledger", "Aaron Eckhart", "Gary Oldman", "Morgan Freeman"], answer: "Heath Ledger", cat: "oscar", detail: "Posthumous Oscar" },
  { q: "Who won Best Actress for Monster (2003)?", options: ["Charlize Theron", "Naomi Watts", "Diane Keaton", "Keisha Castle-Hughes"], answer: "Charlize Theron", cat: "oscar", detail: "Theron's transformation" },
  { q: "Which won Best Picture in 2010?", options: ["The Hurt Locker", "Avatar", "Inglourious Basterds", "Up in the Air"], answer: "The Hurt Locker", cat: "oscar", detail: "Beat Avatar" },
  { q: "Which animated film won the first Best Animated Feature Oscar?", options: ["Shrek", "Monsters, Inc.", "Jimmy Neutron", "Ice Age"], answer: "Shrek", cat: "oscar", detail: "Award introduced in 2002" },
  { q: "Who won Best Director for Birdman?", options: ["Alejandro González Iñárritu", "Wes Anderson", "Richard Linklater", "Bennett Miller"], answer: "Alejandro González Iñárritu", cat: "oscar", detail: "Won again next year for The Revenant" },
  { q: "Who won Best Actor for Oppenheimer?", options: ["Cillian Murphy", "Robert Downey Jr.", "Bradley Cooper", "Ryan Gosling"], answer: "Cillian Murphy", cat: "oscar", detail: "Murphy's first Oscar" },
  { q: "Which won Best Picture in 2023?", options: ["Everything Everywhere All at Once", "The Banshees of Inisherin", "Top Gun: Maverick", "The Fabelmans"], answer: "Everything Everywhere All at Once", cat: "oscar", detail: "Won 7 Oscars total" },
  { q: "Which film was shot over 12 years?", options: ["Boyhood", "Avatar", "The Irishman", "Mad Max: Fury Road"], answer: "Boyhood", cat: "trivia", detail: "Linklater 2002–2013" },
  { q: "In The Shining, what room number haunts the Overlook?", options: ["Room 237", "Room 217", "Room 113", "Room 666"], answer: "Room 237", cat: "trivia", detail: "Changed from 217 in King's novel" },
  { q: "What is Rosebud in Citizen Kane?", options: ["A sled", "A horse", "A painting", "A woman's name"], answer: "A sled", cat: "trivia", detail: "Kane's childhood sled" },
  { q: "What is the hotel in The Shining?", options: ["The Overlook Hotel", "The Stanley Hotel", "The Bates Motel", "The Grand Budapest Hotel"], answer: "The Overlook Hotel", cat: "trivia", detail: "Inspired by the Stanley Hotel" },
  { q: "How many films did Kubrick direct?", options: ["13", "10", "16", "8"], answer: "13", cat: "trivia", detail: "Fear and Desire to Eyes Wide Shut" },
  { q: "Which Kubrick film was withdrawn from UK for 27 years?", options: ["A Clockwork Orange", "The Shining", "Eyes Wide Shut", "Full Metal Jacket"], answer: "A Clockwork Orange", cat: "trivia", detail: "Withdrawn until his death" },
  { q: "Which horror was marketed as 'based on true events'?", options: ["The Texas Chain Saw Massacre", "The Exorcist", "A Nightmare on Elm Street", "Friday the 13th"], answer: "The Texas Chain Saw Massacre", cat: "trivia", detail: "Loosely inspired by Ed Gein" },
  { q: "Which film has the most extras in a scene?", options: ["Gandhi", "Ben-Hur", "Braveheart", "Troy"], answer: "Gandhi", cat: "trivia", detail: "~300,000 for the funeral" },
  { q: "What is the ship in Alien?", options: ["Nostromo", "Sulaco", "Prometheus", "Covenant"], answer: "Nostromo", cat: "trivia", detail: "Named after Conrad novel" },
  { q: "What city is Gotham mainly based on?", options: ["New York City", "Chicago", "Los Angeles", "Detroit"], answer: "New York City", cat: "trivia", detail: "Nolan filmed TDK in Chicago though" },
  { q: "What fictional metal is Wolverine's skeleton coated with?", options: ["Adamantium", "Vibranium", "Unobtanium", "Kryptonite"], answer: "Adamantium", cat: "trivia", detail: "Nearly indestructible alloy" },
  { q: "How many Infinity Stones are there in the MCU?", options: ["6", "5", "7", "4"], answer: "6", cat: "trivia", detail: "Space, Mind, Reality, Power, Time, Soul" },
  { q: "What is the name of the computer in 2001: A Space Odyssey?", options: ["HAL 9000", "WOPR", "Skynet", "Mother"], answer: "HAL 9000", cat: "trivia", detail: "I'm sorry, Dave" },
  { q: "Who was NOT in The Departed?", options: ["Al Pacino", "Jack Nicholson", "Matt Damon"], answer: "Al Pacino", cat: "cast", detail: "Al Pacino was not in the cast" },
  { q: "Who was NOT in The Departed?", options: ["Robert De Niro", "Leonardo DiCaprio", "Jack Nicholson"], answer: "Robert De Niro", cat: "cast", detail: "Robert De Niro was not in the cast" },
  { q: "Who was NOT in The Departed?", options: ["Brad Pitt", "Leonardo DiCaprio", "Jack Nicholson"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt was not in the cast" },
  { q: "Who was NOT in The Departed?", options: ["Tom Hanks", "Mark Wahlberg", "Matt Damon"], answer: "Tom Hanks", cat: "cast", detail: "Tom Hanks was not in the cast" },
  { q: "Who was NOT in Pulp Fiction?", options: ["Al Pacino", "Bruce Willis", "Uma Thurman"], answer: "Al Pacino", cat: "cast", detail: "Al Pacino was not in the cast" },
  { q: "Who was NOT in Pulp Fiction?", options: ["Robert De Niro", "Uma Thurman", "Samuel L. Jackson"], answer: "Robert De Niro", cat: "cast", detail: "Robert De Niro was not in the cast" },
  { q: "Who was NOT in Pulp Fiction?", options: ["Jack Nicholson", "Bruce Willis", "Samuel L. Jackson"], answer: "Jack Nicholson", cat: "cast", detail: "Jack Nicholson was not in the cast" },
  { q: "Who was NOT in Pulp Fiction?", options: ["Tom Hanks", "Samuel L. Jackson", "Uma Thurman"], answer: "Tom Hanks", cat: "cast", detail: "Tom Hanks was not in the cast" },
  { q: "Who was NOT in The Shawshank Redemption?", options: ["Jack Nicholson", "Morgan Freeman", "Bob Gunton"], answer: "Jack Nicholson", cat: "cast", detail: "Jack Nicholson was not in the cast" },
  { q: "Who was NOT in The Shawshank Redemption?", options: ["Al Pacino", "Morgan Freeman", "Clancy Brown"], answer: "Al Pacino", cat: "cast", detail: "Al Pacino was not in the cast" },
  { q: "Who was NOT in The Shawshank Redemption?", options: ["Tom Hanks", "Tim Robbins", "Morgan Freeman"], answer: "Tom Hanks", cat: "cast", detail: "Tom Hanks was not in the cast" },
  { q: "Who was NOT in The Shawshank Redemption?", options: ["Robert De Niro", "Bob Gunton", "Morgan Freeman"], answer: "Robert De Niro", cat: "cast", detail: "Robert De Niro was not in the cast" },
  { q: "Who was NOT in Goodfellas?", options: ["Al Pacino", "Joe Pesci", "Robert De Niro"], answer: "Al Pacino", cat: "cast", detail: "Al Pacino was not in the cast" },
  { q: "Who was NOT in Goodfellas?", options: ["Jack Nicholson", "Robert De Niro", "Ray Liotta"], answer: "Jack Nicholson", cat: "cast", detail: "Jack Nicholson was not in the cast" },
  { q: "Who was NOT in Goodfellas?", options: ["Marlon Brando", "Joe Pesci", "Lorraine Bracco"], answer: "Marlon Brando", cat: "cast", detail: "Marlon Brando was not in the cast" },
  { q: "Who was NOT in Goodfellas?", options: ["Dustin Hoffman", "Lorraine Bracco", "Robert De Niro"], answer: "Dustin Hoffman", cat: "cast", detail: "Dustin Hoffman was not in the cast" },
  { q: "Who was NOT in The Godfather?", options: ["Robert De Niro", "Robert Duvall", "Marlon Brando"], answer: "Robert De Niro", cat: "cast", detail: "Robert De Niro was not in the cast" },
  { q: "Who was NOT in The Godfather?", options: ["Jack Nicholson", "James Caan", "Al Pacino"], answer: "Jack Nicholson", cat: "cast", detail: "Jack Nicholson was not in the cast" },
  { q: "Who was NOT in The Godfather?", options: ["Dustin Hoffman", "James Caan", "Al Pacino"], answer: "Dustin Hoffman", cat: "cast", detail: "Dustin Hoffman was not in the cast" },
  { q: "Who was NOT in The Godfather?", options: ["Warren Beatty", "Marlon Brando", "Al Pacino"], answer: "Warren Beatty", cat: "cast", detail: "Warren Beatty was not in the cast" },
  { q: "Who was NOT in Inception?", options: ["Matt Damon", "Leonardo DiCaprio", "Tom Hardy"], answer: "Matt Damon", cat: "cast", detail: "Matt Damon was not in the cast" },
  { q: "Who was NOT in Inception?", options: ["Brad Pitt", "Joseph Gordon-Levitt", "Tom Hardy"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt was not in the cast" },
  { q: "Who was NOT in Inception?", options: ["Christian Bale", "Joseph Gordon-Levitt", "Tom Hardy"], answer: "Christian Bale", cat: "cast", detail: "Christian Bale was not in the cast" },
  { q: "Who was NOT in Inception?", options: ["Ryan Gosling", "Leonardo DiCaprio", "Tom Hardy"], answer: "Ryan Gosling", cat: "cast", detail: "Ryan Gosling was not in the cast" },
  { q: "Who was NOT in The Dark Knight?", options: ["Liam Neeson", "Gary Oldman", "Aaron Eckhart"], answer: "Liam Neeson", cat: "cast", detail: "Liam Neeson was not in the cast" },
  { q: "Who was NOT in The Dark Knight?", options: ["Tom Hardy", "Aaron Eckhart", "Christian Bale"], answer: "Tom Hardy", cat: "cast", detail: "Tom Hardy was not in the cast" },
  { q: "Who was NOT in The Dark Knight?", options: ["Ben Affleck", "Heath Ledger", "Christian Bale"], answer: "Ben Affleck", cat: "cast", detail: "Ben Affleck was not in the cast" },
  { q: "Who was NOT in The Dark Knight?", options: ["Robert Pattinson", "Christian Bale", "Heath Ledger"], answer: "Robert Pattinson", cat: "cast", detail: "Robert Pattinson was not in the cast" },
  { q: "Who was NOT in Ocean's Eleven (2001)?", options: ["Leonardo DiCaprio", "Julia Roberts", "George Clooney"], answer: "Leonardo DiCaprio", cat: "cast", detail: "Leonardo DiCaprio was not in the cast" },
  { q: "Who was NOT in Ocean's Eleven (2001)?", options: ["Tom Hanks", "Julia Roberts", "Brad Pitt"], answer: "Tom Hanks", cat: "cast", detail: "Tom Hanks was not in the cast" },
  { q: "Who was NOT in Ocean's Eleven (2001)?", options: ["Johnny Depp", "Brad Pitt", "Matt Damon"], answer: "Johnny Depp", cat: "cast", detail: "Johnny Depp was not in the cast" },
  { q: "Who was NOT in Ocean's Eleven (2001)?", options: ["Russell Crowe", "Julia Roberts", "George Clooney"], answer: "Russell Crowe", cat: "cast", detail: "Russell Crowe was not in the cast" },
  { q: "Who played Muhammad Ali in Ali?", options: ["Will Smith", "Yves Montand", "Lamberto Maggiorani", "Anthony Hopkins"], answer: "Will Smith", cat: "cast", detail: "Will Smith in Ali" },
  { q: "Who played Mia Dolan in La La Land?", options: ["Emma Stone", "Daniel Day-Lewis", "Leonardo DiCaprio", "Ben Kingsley"], answer: "Emma Stone", cat: "cast", detail: "Emma Stone in La La Land" },
  { q: "Who played Sebastian Wilder in La La Land?", options: ["Ryan Gosling", "Daniel Radcliffe", "Robert Downey Jr.", "Hugh Jackman"], answer: "Ryan Gosling", cat: "cast", detail: "Ryan Gosling in La La Land" },
  { q: "Who played Driver in Drive?", options: ["Ryan Gosling", "Yves Montand", "Anthony Hopkins", "Adrien Brody"], answer: "Ryan Gosling", cat: "cast", detail: "Ryan Gosling in Drive" },
  { q: "Who played Alonzo Harris in Training Day?", options: ["Denzel Washington", "Choi Min-sik", "Marlon Brando", "Song Kang-ho"], answer: "Denzel Washington", cat: "cast", detail: "Denzel Washington in Training Day" },
  { q: "Who played Malcolm X in Malcolm X?", options: ["Denzel Washington", "Margot Robbie", "Cillian Murphy", "Yves Montand"], answer: "Denzel Washington", cat: "cast", detail: "Denzel Washington in Malcolm X" },
  { q: "Who played Jules Winnfield in Pulp Fiction?", options: ["Samuel L. Jackson", "Rosamund Pike", "Jeff Bridges", "Andy Serkis"], answer: "Samuel L. Jackson", cat: "cast", detail: "Samuel L. Jackson in Pulp Fiction" },
  { q: "Who played Sean Maguire in Good Will Hunting?", options: ["Robin Williams", "Adrien Brody", "Ian McKellen", "Morgan Freeman"], answer: "Robin Williams", cat: "cast", detail: "Robin Williams in Good Will Hunting" },
  { q: "Who played Truman Burbank in The Truman Show?", options: ["Jim Carrey", "Lamberto Maggiorani", "Jodie Foster", "Andy Serkis"], answer: "Jim Carrey", cat: "cast", detail: "Jim Carrey in The Truman Show" },
  { q: "Who played Max Rockatansky in Mad Max: Fury Road?", options: ["Tom Hardy", "Uma Thurman", "Bruno Ganz", "Liam Neeson"], answer: "Tom Hardy", cat: "cast", detail: "Tom Hardy in Mad Max: Fury Road" },
  { q: "Who played Bane in The Dark Knight Rises?", options: ["Tom Hardy", "Joaquin Phoenix", "Gael García Bernal", "Heath Ledger"], answer: "Tom Hardy", cat: "cast", detail: "Tom Hardy in The Dark Knight Rises" },
  { q: "Who played Margaret Thatcher in The Iron Lady?", options: ["Meryl Streep", "Christoph Waltz", "Toshiro Mifune", "Jean-Pierre Léaud"], answer: "Meryl Streep", cat: "cast", detail: "Meryl Streep in The Iron Lady" },
  { q: "Who played Dr. Ryan Stone in Gravity?", options: ["Sandra Bullock", "Bruno Ganz", "Christoph Waltz", "Sigourney Weaver"], answer: "Sandra Bullock", cat: "cast", detail: "Sandra Bullock in Gravity" },
  { q: "Who played Marge Gunderson in Fargo?", options: ["Frances McDormand", "Maria Falconetti", "Peter Finch", "Jack Nicholson"], answer: "Frances McDormand", cat: "cast", detail: "Frances McDormand in Fargo" },
  { q: "Who played the White Witch in The Chronicles of Narnia?", options: ["Tilda Swinton", "Matt Damon", "Christian Bale", "Lamberto Maggiorani"], answer: "Tilda Swinton", cat: "cast", detail: "Tilda Swinton in The Chronicles of Narnia" },
  { q: "Who played Aibileen Clark in The Help?", options: ["Viola Davis", "Adrien Brody", "Al Pacino", "Christian Bale"], answer: "Viola Davis", cat: "cast", detail: "Viola Davis in The Help" },
  { q: "Who played Winston Churchill in Darkest Hour?", options: ["Gary Oldman", "Natalie Portman", "Morgan Freeman", "Song Kang-ho"], answer: "Gary Oldman", cat: "cast", detail: "Gary Oldman in Darkest Hour" },
  { q: "Who played Commissioner Gordon in The Dark Knight?", options: ["Gary Oldman", "Max Schreck", "Maria Falconetti", "Joe Pesci"], answer: "Gary Oldman", cat: "cast", detail: "Gary Oldman in The Dark Knight" },
  { q: "Who played Adonis Creed in Creed?", options: ["Michael B. Jordan", "Peter Finch", "Liam Neeson", "Choi Min-sik"], answer: "Michael B. Jordan", cat: "cast", detail: "Michael B. Jordan in Creed" },
  { q: "Who played Erik Killmonger in Black Panther?", options: ["Michael B. Jordan", "Maria Falconetti", "Uma Thurman", "Ian McKellen"], answer: "Michael B. Jordan", cat: "cast", detail: "Michael B. Jordan in Black Panther" },
  { q: "Who played Elio Perlman in Call Me by Your Name?", options: ["Timothée Chalamet", "Toshiro Mifune", "Keanu Reeves", "Christoph Waltz"], answer: "Timothée Chalamet", cat: "cast", detail: "Timothée Chalamet in Call Me by Your Name" },
  { q: "Who played Paul Atreides in Dune?", options: ["Timothée Chalamet", "Peter Finch", "Toshiro Mifune", "Jean-Pierre Léaud"], answer: "Timothée Chalamet", cat: "cast", detail: "Timothée Chalamet in Dune" },
  { q: "Who played Amy March in Little Women?", options: ["Florence Pugh", "Jeff Bridges", "Robert Downey Jr.", "Tony Leung"], answer: "Florence Pugh", cat: "cast", detail: "Florence Pugh in Little Women" },
  { q: "Who played Batman in The Batman?", options: ["Robert Pattinson", "Robert De Niro", "Marcello Mastroianni", "Marlon Brando"], answer: "Robert Pattinson", cat: "cast", detail: "Robert Pattinson in The Batman" },
  { q: "Who played Evelyn Wang in Everything Everywhere All at Once?", options: ["Michelle Yeoh", "Max Schreck", "Jack Nicholson", "Maria Falconetti"], answer: "Michelle Yeoh", cat: "cast", detail: "Michelle Yeoh in Everything Everywhere All at Once" },
  { q: "Who played Waymond Wang in Everything Everywhere All at Once?", options: ["Ke Huy Quan", "Choi Min-sik", "Russell Crowe", "Cillian Murphy"], answer: "Ke Huy Quan", cat: "cast", detail: "Ke Huy Quan in Everything Everywhere All at Once" },
  { q: "Who played Butch Cassidy in Butch Cassidy and the Sundance Kid?", options: ["Paul Newman", "Gael García Bernal", "Yves Montand", "Tony Leung"], answer: "Paul Newman", cat: "cast", detail: "Paul Newman in Butch Cassidy and the Sundance Kid" },
  { q: "Who played Atticus Finch in To Kill a Mockingbird?", options: ["Gregory Peck", "Jean-Pierre Léaud", "Brad Pitt", "Choi Min-sik"], answer: "Gregory Peck", cat: "cast", detail: "Gregory Peck in To Kill a Mockingbird" },
  { q: "Who played Holly Golightly in Breakfast at Tiffany's?", options: ["Audrey Hepburn", "Tom Cruise", "Morgan Freeman", "Tony Leung"], answer: "Audrey Hepburn", cat: "cast", detail: "Audrey Hepburn in Breakfast at Tiffany's" },
  { q: "Who played George Bailey in It's a Wonderful Life?", options: ["James Stewart", "Christian Bale", "Bernard Lee", "Russell Crowe"], answer: "James Stewart", cat: "cast", detail: "James Stewart in It's a Wonderful Life" },
  { q: "Who played Rick Blaine in Casablanca?", options: ["Humphrey Bogart", "Russell Crowe", "Jeff Bridges", "Dustin Hoffman"], answer: "Humphrey Bogart", cat: "cast", detail: "Humphrey Bogart in Casablanca" },
  { q: "Who played Don Lockwood in Singin' in the Rain?", options: ["Gene Kelly", "Uma Thurman", "Robert De Niro", "Hugh Jackman"], answer: "Gene Kelly", cat: "cast", detail: "Gene Kelly in Singin' in the Rain" },
  { q: "Who played Annie Hall in Annie Hall?", options: ["Diane Keaton", "Jean-Pierre Léaud", "Daniel Day-Lewis", "Christoph Waltz"], answer: "Diane Keaton", cat: "cast", detail: "Diane Keaton in Annie Hall" },
  { q: "Who played Benjamin Braddock in The Graduate?", options: ["Dustin Hoffman", "Cillian Murphy", "Adrien Brody", "Peter Finch"], answer: "Dustin Hoffman", cat: "cast", detail: "Dustin Hoffman in The Graduate" },
  { q: "Who played the Sundance Kid in Butch Cassidy and the Sundance Kid?", options: ["Robert Redford", "Marlon Brando", "Jack Nicholson", "Javier Bardem"], answer: "Robert Redford", cat: "cast", detail: "Robert Redford in Butch Cassidy and the Sundance Kid" },
  { q: "Who played the Man with No Name in The Good the Bad and the Ugly?", options: ["Clint Eastwood", "Jeff Bridges", "Daniel Day-Lewis", "Choi Min-sik"], answer: "Clint Eastwood", cat: "cast", detail: "Clint Eastwood in The Good the Bad and the Ugly" },
  { q: "Who played Deirdre Beaubeirdre in Everything Everywhere All at Once?", options: ["Jamie Lee Curtis", "Hugh Jackman", "Javier Bardem", "Adrien Brody"], answer: "Jamie Lee Curtis", cat: "cast", detail: "Jamie Lee Curtis in Everything Everywhere All at Once" },
  { q: "Who played Laurie Strode in Halloween?", options: ["Jamie Lee Curtis", "Johnny Depp", "Toshiro Mifune", "Liam Neeson"], answer: "Jamie Lee Curtis", cat: "cast", detail: "Jamie Lee Curtis in Halloween" },
  { q: "Who played Axel Foley in Beverly Hills Cop?", options: ["Eddie Murphy", "Brad Pitt", "Adrien Brody", "Keanu Reeves"], answer: "Eddie Murphy", cat: "cast", detail: "Eddie Murphy in Beverly Hills Cop" },
  { q: "Who played William Wallace in Braveheart?", options: ["Mel Gibson", "Peter Finch", "Charlize Theron", "Andy Serkis"], answer: "Mel Gibson", cat: "cast", detail: "Mel Gibson in Braveheart" },
  { q: "Who played Batman in Batman v Superman?", options: ["Ben Affleck", "Jean-Pierre Léaud", "Song Kang-ho", "Joe Pesci"], answer: "Ben Affleck", cat: "cast", detail: "Ben Affleck in Batman v Superman" },
  { q: "Who played Batman in Batman (1989)?", options: ["Michael Keaton", "Jean Seberg", "Harrison Ford", "Choi Min-sik"], answer: "Michael Keaton", cat: "cast", detail: "Michael Keaton in Batman (1989)" },
  { q: "Who played Louise Banks in Arrival?", options: ["Amy Adams", "Bruno Ganz", "Jack Nicholson", "Tom Cruise"], answer: "Amy Adams", cat: "cast", detail: "Amy Adams in Arrival" },
  { q: "Who played Poe Dameron in Star Wars: The Force Awakens?", options: ["Oscar Isaac", "Al Pacino", "Arnold Schwarzenegger", "Marlon Brando"], answer: "Oscar Isaac", cat: "cast", detail: "Oscar Isaac in Star Wars: The Force Awakens" },
  { q: "Who played Joel Miller in The Last of Us?", options: ["Pedro Pascal", "Adrien Brody", "Lamberto Maggiorani", "Dustin Hoffman"], answer: "Pedro Pascal", cat: "cast", detail: "Pedro Pascal in The Last of Us" },
  { q: "Who played Lady Bird in Lady Bird?", options: ["Saoirse Ronan", "Ian McKellen", "Song Kang-ho", "Joe Pesci"], answer: "Saoirse Ronan", cat: "cast", detail: "Saoirse Ronan in Lady Bird" },
  { q: "Who played the Green Goblin in Spider-Man?", options: ["Willem Dafoe", "Dustin Hoffman", "Charlize Theron", "Matt Damon"], answer: "Willem Dafoe", cat: "cast", detail: "Willem Dafoe in Spider-Man" },
  { q: "Who played Terence Fletcher in Whiplash?", options: ["J.K. Simmons", "Klaus Kinski", "Lamberto Maggiorani", "Joe Pesci"], answer: "J.K. Simmons", cat: "cast", detail: "J.K. Simmons in Whiplash" },
  { q: "Who played Dr. King Schultz in Django Unchained?", options: ["Christoph Waltz", "Jean Seberg", "Choi Min-sik", "Harrison Ford"], answer: "Christoph Waltz", cat: "cast", detail: "Christoph Waltz in Django Unchained" },
  { q: "Who was NOT in Saving Private Ryan?", options: ["Brad Pitt", "Vin Diesel", "Matt Damon"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt was not in Saving Private Ryan" },
  { q: "Who was NOT in Saving Private Ryan?", options: ["Leonardo DiCaprio", "Vin Diesel", "Tom Hanks"], answer: "Leonardo DiCaprio", cat: "cast", detail: "Leonardo DiCaprio was not in Saving Private Ryan" },
  { q: "Who was NOT in Saving Private Ryan?", options: ["George Clooney", "Vin Diesel", "Tom Sizemore"], answer: "George Clooney", cat: "cast", detail: "George Clooney was not in Saving Private Ryan" },
  { q: "Who was NOT in Saving Private Ryan?", options: ["Mel Gibson", "Tom Hanks", "Vin Diesel"], answer: "Mel Gibson", cat: "cast", detail: "Mel Gibson was not in Saving Private Ryan" },
  { q: "Who was NOT in Fight Club?", options: ["Leonardo DiCaprio", "Jared Leto", "Helena Bonham Carter"], answer: "Leonardo DiCaprio", cat: "cast", detail: "Leonardo DiCaprio was not in Fight Club" },
  { q: "Who was NOT in Fight Club?", options: ["Matt Damon", "Jared Leto", "Helena Bonham Carter"], answer: "Matt Damon", cat: "cast", detail: "Matt Damon was not in Fight Club" },
  { q: "Who was NOT in Fight Club?", options: ["George Clooney", "Jared Leto", "Edward Norton"], answer: "George Clooney", cat: "cast", detail: "George Clooney was not in Fight Club" },
  { q: "Who was NOT in Fight Club?", options: ["Johnny Depp", "Brad Pitt", "Jared Leto"], answer: "Johnny Depp", cat: "cast", detail: "Johnny Depp was not in Fight Club" },
  { q: "Who was NOT in Kill Bill: Vol. 1?", options: ["Angelina Jolie", "Daryl Hannah", "Uma Thurman"], answer: "Angelina Jolie", cat: "cast", detail: "Angelina Jolie was not in Kill Bill: Vol. 1" },
  { q: "Who was NOT in Kill Bill: Vol. 1?", options: ["Charlize Theron", "Vivica A. Fox", "Lucy Liu"], answer: "Charlize Theron", cat: "cast", detail: "Charlize Theron was not in Kill Bill: Vol. 1" },
  { q: "Who was NOT in Kill Bill: Vol. 1?", options: ["Cate Blanchett", "Vivica A. Fox", "Uma Thurman"], answer: "Cate Blanchett", cat: "cast", detail: "Cate Blanchett was not in Kill Bill: Vol. 1" },
  { q: "Who was NOT in Kill Bill: Vol. 1?", options: ["Natalie Portman", "Uma Thurman", "Lucy Liu"], answer: "Natalie Portman", cat: "cast", detail: "Natalie Portman was not in Kill Bill: Vol. 1" },
  { q: "Who was NOT in Inglourious Basterds?", options: ["Leonardo DiCaprio", "Mélanie Laurent", "Christoph Waltz"], answer: "Leonardo DiCaprio", cat: "cast", detail: "Leonardo DiCaprio was not in Inglourious Basterds" },
  { q: "Who was NOT in Inglourious Basterds?", options: ["Matt Damon", "Mélanie Laurent", "Michael Fassbender"], answer: "Matt Damon", cat: "cast", detail: "Matt Damon was not in Inglourious Basterds" },
  { q: "Who was NOT in Inglourious Basterds?", options: ["George Clooney", "Mélanie Laurent", "Michael Fassbender"], answer: "George Clooney", cat: "cast", detail: "George Clooney was not in Inglourious Basterds" },
  { q: "Who was NOT in Inglourious Basterds?", options: ["Tom Hardy", "Michael Fassbender", "Mélanie Laurent"], answer: "Tom Hardy", cat: "cast", detail: "Tom Hardy was not in Inglourious Basterds" },
  { q: "Who was NOT in Django Unchained?", options: ["Brad Pitt", "Samuel L. Jackson", "Christoph Waltz"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt was not in Django Unchained" },
  { q: "Who was NOT in Django Unchained?", options: ["Denzel Washington", "Samuel L. Jackson", "Leonardo DiCaprio"], answer: "Denzel Washington", cat: "cast", detail: "Denzel Washington was not in Django Unchained" },
  { q: "Who was NOT in Django Unchained?", options: ["Will Smith", "Leonardo DiCaprio", "Samuel L. Jackson"], answer: "Will Smith", cat: "cast", detail: "Will Smith was not in Django Unchained" },
  { q: "Who was NOT in Django Unchained?", options: ["Idris Elba", "Leonardo DiCaprio", "Samuel L. Jackson"], answer: "Idris Elba", cat: "cast", detail: "Idris Elba was not in Django Unchained" },
  { q: "Who was NOT in Interstellar?", options: ["Leonardo DiCaprio", "Matthew McConaughey", "Anne Hathaway"], answer: "Leonardo DiCaprio", cat: "cast", detail: "Leonardo DiCaprio was not in Interstellar" },
  { q: "Who was NOT in Interstellar?", options: ["Brad Pitt", "Anne Hathaway", "Matthew McConaughey"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt was not in Interstellar" },
  { q: "Who was NOT in Interstellar?", options: ["Tom Hanks", "Jessica Chastain", "Michael Caine"], answer: "Tom Hanks", cat: "cast", detail: "Tom Hanks was not in Interstellar" },
  { q: "Who was NOT in Interstellar?", options: ["Matt Damon", "Jessica Chastain", "Michael Caine"], answer: "Matt Damon", cat: "cast", detail: "Matt Damon was not in Interstellar" },
  { q: "Who was NOT in Schindler's List?", options: ["Daniel Day-Lewis", "Liam Neeson", "Embeth Davidtz"], answer: "Daniel Day-Lewis", cat: "cast", detail: "Daniel Day-Lewis was not in Schindler's List" },
  { q: "Who was NOT in Schindler's List?", options: ["Anthony Hopkins", "Embeth Davidtz", "Ralph Fiennes"], answer: "Anthony Hopkins", cat: "cast", detail: "Anthony Hopkins was not in Schindler's List" },
  { q: "Who was NOT in Schindler's List?", options: ["Tom Hanks", "Liam Neeson", "Embeth Davidtz"], answer: "Tom Hanks", cat: "cast", detail: "Tom Hanks was not in Schindler's List" },
  { q: "Who was NOT in Schindler's List?", options: ["Russell Crowe", "Ralph Fiennes", "Embeth Davidtz"], answer: "Russell Crowe", cat: "cast", detail: "Russell Crowe was not in Schindler's List" },
  { q: "Who was NOT in No Country for Old Men?", options: ["Daniel Day-Lewis", "Tommy Lee Jones", "Woody Harrelson"], answer: "Daniel Day-Lewis", cat: "cast", detail: "Daniel Day-Lewis was not in No Country for Old Men" },
  { q: "Who was NOT in No Country for Old Men?", options: ["Brad Pitt", "Javier Bardem", "Josh Brolin"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt was not in No Country for Old Men" },
  { q: "Who was NOT in No Country for Old Men?", options: ["George Clooney", "Javier Bardem", "Tommy Lee Jones"], answer: "George Clooney", cat: "cast", detail: "George Clooney was not in No Country for Old Men" },
  { q: "Who was NOT in No Country for Old Men?", options: ["Matt Damon", "Tommy Lee Jones", "Josh Brolin"], answer: "Matt Damon", cat: "cast", detail: "Matt Damon was not in No Country for Old Men" },
  { q: "Who was NOT in Se7en?", options: ["Leonardo DiCaprio", "Gwyneth Paltrow", "Brad Pitt"], answer: "Leonardo DiCaprio", cat: "cast", detail: "Leonardo DiCaprio was not in Se7en" },
  { q: "Who was NOT in Se7en?", options: ["Al Pacino", "Kevin Spacey", "Morgan Freeman"], answer: "Al Pacino", cat: "cast", detail: "Al Pacino was not in Se7en" },
  { q: "Who was NOT in Se7en?", options: ["Robert De Niro", "Brad Pitt", "Morgan Freeman"], answer: "Robert De Niro", cat: "cast", detail: "Robert De Niro was not in Se7en" },
  { q: "Who was NOT in Se7en?", options: ["Jack Nicholson", "Morgan Freeman", "Brad Pitt"], answer: "Jack Nicholson", cat: "cast", detail: "Jack Nicholson was not in Se7en" },
  { q: "Who was NOT in Oppenheimer?", options: ["Leonardo DiCaprio", "Matt Damon", "Robert Downey Jr."], answer: "Leonardo DiCaprio", cat: "cast", detail: "Leonardo DiCaprio was not in Oppenheimer" },
  { q: "Who was NOT in Oppenheimer?", options: ["Tom Hanks", "Cillian Murphy", "Emily Blunt"], answer: "Tom Hanks", cat: "cast", detail: "Tom Hanks was not in Oppenheimer" },
  { q: "Who was NOT in Oppenheimer?", options: ["Brad Pitt", "Matt Damon", "Emily Blunt"], answer: "Brad Pitt", cat: "cast", detail: "Brad Pitt was not in Oppenheimer" },
  { q: "Who was NOT in Oppenheimer?", options: ["Christian Bale", "Cillian Murphy", "Emily Blunt"], answer: "Christian Bale", cat: "cast", detail: "Christian Bale was not in Oppenheimer" },
  { q: "Who was NOT in Everything Everywhere All at Once?", options: ["Scarlett Johansson", "Ke Huy Quan", "Michelle Yeoh"], answer: "Scarlett Johansson", cat: "cast", detail: "Scarlett Johansson was not in Everything Everywhere All at Once" },
  { q: "Who was NOT in Everything Everywhere All at Once?", options: ["Cate Blanchett", "Jamie Lee Curtis", "Stephanie Hsu"], answer: "Cate Blanchett", cat: "cast", detail: "Cate Blanchett was not in Everything Everywhere All at Once" },
  { q: "Who was NOT in Everything Everywhere All at Once?", options: ["Sandra Bullock", "Jamie Lee Curtis", "Ke Huy Quan"], answer: "Sandra Bullock", cat: "cast", detail: "Sandra Bullock was not in Everything Everywhere All at Once" },
  { q: "Who was NOT in Everything Everywhere All at Once?", options: ["Viola Davis", "Stephanie Hsu", "Jamie Lee Curtis"], answer: "Viola Davis", cat: "cast", detail: "Viola Davis was not in Everything Everywhere All at Once" },
  { q: "Which film features a character named 'Keyser Söze'?", options: ["The Usual Suspects", "Se7en", "Heat", "L.A. Confidential"], answer: "The Usual Suspects", cat: "trivia", detail: "Kevin Spacey's reveal" },
  { q: "What is the Truman Show's fictional TV show set in?", options: ["Seahaven", "Pleasantville", "Springfield", "Greendale"], answer: "Seahaven", cat: "trivia", detail: "Truman's bubble world" },
  { q: "Which film has the line 'Here's to looking at you, kid' misquoted?", options: ["Casablanca", "The Maltese Falcon", "Key Largo", "To Have and Have Not"], answer: "Casablanca", cat: "trivia", detail: "Often misquoted as 'Here's looking...'" },
  { q: "Which planet do the characters visit first in Interstellar?", options: ["Miller's planet", "Mann's planet", "Edmunds' planet", "Earth"], answer: "Miller's planet", cat: "trivia", detail: "The water world with massive waves" },
  { q: "What is the main character's name in The Big Lebowski?", options: ["The Dude", "The Man", "The Boss", "The Guy"], answer: "The Dude", cat: "trivia", detail: "Jeffrey Lebowski, aka The Dude" },
  { q: "Which filmmaker appears as a baby in E.T.?", options: ["No filmmaker appears as a baby", "Steven Spielberg", "Robert Zemeckis", "George Lucas"], answer: "No filmmaker appears as a baby", cat: "trivia", detail: "Common myth — none did" },
  { q: "What is the Tesseract in the MCU?", options: ["A containment for the Space Stone", "A time machine", "A weapon", "A shield"], answer: "A containment for the Space Stone", cat: "trivia", detail: "First seen in Captain America: The First Avenger" },
  { q: "Which horror franchise features a doll named 'Annabelle'?", options: ["The Conjuring", "Child's Play", "Saw", "Insidious"], answer: "The Conjuring", cat: "trivia", detail: "Based on a real haunted doll" },
  { q: "What type of dance does Vincent Vega do in Pulp Fiction?", options: ["The Twist", "The Charleston", "The Waltz", "The Moonwalk"], answer: "The Twist", cat: "trivia", detail: "With Mia Wallace at Jack Rabbit Slim's" },
  { q: "What is the name of the sled in Citizen Kane?", options: ["Rosebud", "Snowflake", "Winter", "Freedom"], answer: "Rosebud", cat: "trivia", detail: "The famous last word" },
  { q: "What is the ship's computer called in Alien?", options: ["Mother", "Father", "HAL", "GERTY"], answer: "Mother", cat: "trivia", detail: "MU-TH-UR 6000" },
  { q: "In Inception, what is a 'totem' used for?", options: ["To know if you're in a dream", "To enter dreams", "To control dreams", "To wake up"], answer: "To know if you're in a dream", cat: "trivia", detail: "Cobb's spinning top" },
  { q: "What is the name of the boat in Jaws?", options: ["Orca", "Nostromo", "Black Pearl", "Jenny"], answer: "Orca", cat: "trivia", detail: "Quint's fishing vessel" },
  { q: "How long was the longest single take in 1917?", options: ["The film simulates one take throughout", "7 minutes", "12 minutes", "20 minutes"], answer: "The film simulates one take throughout", cat: "trivia", detail: "Hidden cuts make it appear continuous" },
  { q: "Who won Best Actress for Everything Everywhere All at Once?", options: ["Michelle Yeoh", "Cate Blanchett", "Ana de Armas", "Andrea Riseborough"], answer: "Michelle Yeoh", cat: "oscar", detail: "Yeoh's historic first win" },
  { q: "Who won Best Supporting Actor for Oppenheimer?", options: ["Robert Downey Jr.", "Ryan Gosling", "Mark Ruffalo", "Robert De Niro"], answer: "Robert Downey Jr.", cat: "oscar", detail: "Downey Jr.'s first Oscar" },
  { q: "Which film won Best Picture in 2024?", options: ["Oppenheimer", "Barbie", "Killers of the Flower Moon", "Past Lives"], answer: "Oppenheimer", cat: "oscar", detail: "Nolan's first Best Picture" },
  { q: "Who won Best Director for Oppenheimer?", options: ["Christopher Nolan", "Martin Scorsese", "Greta Gerwig", "Yorgos Lanthimos"], answer: "Christopher Nolan", cat: "oscar", detail: "Nolan's first Best Director win" },
  { q: "Which won Best Picture in 2020?", options: ["Nomadland", "Promising Young Woman", "Minari", "The Father"], answer: "Nomadland", cat: "oscar", detail: "Chloé Zhao's second feature" },
  { q: "How many Best Director Oscars does Steven Spielberg have?", options: ["2", "1", "3", "4"], answer: "2", cat: "oscar", detail: "Schindler's List and Saving Private Ryan" },
  { q: "Who won Best Actress for Blue Jasmine?", options: ["Cate Blanchett", "Meryl Streep", "Judi Dench", "Amy Adams"], answer: "Cate Blanchett", cat: "oscar", detail: "Blanchett's second Oscar" },
  { q: "Who won Best Actor for Dallas Buyers Club?", options: ["Matthew McConaughey", "Christian Bale", "Leonardo DiCaprio", "Bruce Dern"], answer: "Matthew McConaughey", cat: "oscar", detail: "McConaughey's dramatic transformation" },
  { q: "Who won Best Actor for Philadelphia?", options: ["Tom Hanks", "Denzel Washington", "Daniel Day-Lewis", "Anthony Hopkins"], answer: "Tom Hanks", cat: "oscar", detail: "Hanks won back-to-back with Forrest Gump" },
  { q: "Which film's Best Picture win caused the famous envelope mix-up?", options: ["Moonlight", "La La Land", "Spotlight", "The Shape of Water"], answer: "Moonlight", cat: "oscar", detail: "La La Land was announced first by mistake" },
  { q: "Who won Best Supporting Actress for Fences?", options: ["Viola Davis", "Naomie Harris", "Nicole Kidman", "Octavia Spencer"], answer: "Viola Davis", cat: "oscar", detail: "Davis's first Oscar" },
  { q: "Who won Best Actor for Bohemian Rhapsody?", options: ["Rami Malek", "Christian Bale", "Bradley Cooper", "Viggo Mortensen"], answer: "Rami Malek", cat: "oscar", detail: "Malek as Freddie Mercury" },
  { q: "Which of these came out first?", options: ["The Good the Bad and the Ugly", "Shrek", "Apocalypse Now", "Boyhood"], answer: "The Good the Bad and the Ugly", cat: "year", detail: "The Good the Bad and the Ugly (1966)" },
  { q: "Which of these was released in the 1970s?", options: ["Star Wars", "Fargo", "The Breakfast Club", "Die Hard"], answer: "Star Wars", cat: "year", detail: "Star Wars (1977)" },
  { q: "When was 1917 released?", options: ["2019", "2018", "2020"], answer: "2019", cat: "year", detail: "1917 (2019)" },
  { q: "Which of these came out first?", options: ["The Lion King", "The Godfather", "La La Land", "The Dark Knight"], answer: "The Godfather", cat: "year", detail: "The Godfather (1972)" },
  { q: "Which of these came out first?", options: ["The Breakfast Club", "Unforgiven", "Eternal Sunshine of the Spotless Mind", "Star Wars"], answer: "Star Wars", cat: "year", detail: "Star Wars (1977)" },
  { q: "When was Manchester by the Sea released?", options: ["2016", "2015", "2013"], answer: "2016", cat: "year", detail: "Manchester by the Sea (2016)" },
  { q: "Which of these came out first?", options: ["Manchester by the Sea", "The Godfather", "The Tree of Life", "Rain Man"], answer: "The Godfather", cat: "year", detail: "The Godfather (1972)" },
  { q: "Which of these was released in the 1960s?", options: ["West Side Story", "Finding Nemo", "Lethal Weapon", "Terminator 2"], answer: "West Side Story", cat: "year", detail: "West Side Story (1961)" },
  { q: "When was Top Gun released?", options: ["1986", "1985", "1983"], answer: "1986", cat: "year", detail: "Top Gun (1986)" },
  { q: "Which of these came out first?", options: ["Ben-Hur", "Lost in Translation", "Snow White and the Seven Dwarfs", "A Few Good Men"], answer: "Snow White and the Seven Dwarfs", cat: "year", detail: "Snow White and the Seven Dwarfs (1937)" },
  { q: "When was Slumdog Millionaire released?", options: ["2008", "2005", "2009"], answer: "2008", cat: "year", detail: "Slumdog Millionaire (2008)" },
  { q: "Which of these came out first?", options: ["Roma", "Ikiru", "Slumdog Millionaire", "The Shape of Water"], answer: "Ikiru", cat: "year", detail: "Ikiru (1952)" },
  { q: "Which of these was released in the 1960s?", options: ["The Graduate", "Nosferatu", "Nomadland", "The Thing"], answer: "The Graduate", cat: "year", detail: "The Graduate (1967)" },
  { q: "Which of these came out first?", options: ["Terminator 2", "Birdman", "Forrest Gump", "The Big Lebowski"], answer: "Terminator 2", cat: "year", detail: "Terminator 2 (1991)" },
  { q: "When was Bonnie and Clyde released?", options: ["1967", "1968", "1969"], answer: "1967", cat: "year", detail: "Bonnie and Clyde (1967)" },
  { q: "Which of these came out first?", options: ["Avatar", "One Flew Over the Cuckoo's Nest", "Kill Bill: Vol. 1", "Drive"], answer: "One Flew Over the Cuckoo's Nest", cat: "year", detail: "One Flew Over the Cuckoo's Nest (1975)" },
  { q: "Which of these came out first?", options: ["Vertigo", "Roma", "Boyhood", "Metropolis"], answer: "Metropolis", cat: "year", detail: "Metropolis (1927)" },
  { q: "Which of these came out first?", options: ["West Side Story", "Once Upon a Time in Hollywood", "Amélie", "Lost in Translation"], answer: "West Side Story", cat: "year", detail: "West Side Story (1961)" },
  { q: "Which of these came out first?", options: ["Blade Runner 2049", "Heat", "Goodfellas", "Skyfall"], answer: "Goodfellas", cat: "year", detail: "Goodfellas (1990)" },
  { q: "Which of these came out first?", options: ["Snow White and the Seven Dwarfs", "The Departed", "Once Upon a Time in Hollywood", "The Empire Strikes Back"], answer: "Snow White and the Seven Dwarfs", cat: "year", detail: "Snow White and the Seven Dwarfs (1937)" },
  { q: "Which of these came out first?", options: ["Interstellar", "The Lord of the Rings: The Fellowship of the Ring", "No Country for Old Men", "Close Encounters of the Third Kind"], answer: "Close Encounters of the Third Kind", cat: "year", detail: "Close Encounters of the Third Kind (1977)" },
  { q: "When was The Artist released?", options: ["2011", "2013", "2010"], answer: "2011", cat: "year", detail: "The Artist (2011)" },
  { q: "Which of these came out first?", options: ["The Wolf of Wall Street", "Drive My Car", "The Empire Strikes Back", "Breathless"], answer: "Breathless", cat: "year", detail: "Breathless (1960)" },
  { q: "When was Gone Girl released?", options: ["2014", "2016", "2011"], answer: "2014", cat: "year", detail: "Gone Girl (2014)" },
  { q: "Which of these came out first?", options: ["The Wizard of Oz", "Snow White and the Seven Dwarfs", "Close Encounters of the Third Kind", "Dunkirk"], answer: "Snow White and the Seven Dwarfs", cat: "year", detail: "Snow White and the Seven Dwarfs (1937)" },
  { q: "Which of these was released in the 1960s?", options: ["2001: A Space Odyssey", "A Clockwork Orange", "Metropolis", "The Thing"], answer: "2001: A Space Odyssey", cat: "year", detail: "2001: A Space Odyssey (1968)" },
  { q: "When was Die Hard released?", options: ["1988", "1985", "1987"], answer: "1988", cat: "year", detail: "Die Hard (1988)" },
  { q: "Which of these came out first?", options: ["Her", "The Third Man", "Solaris", "The Lion King"], answer: "The Third Man", cat: "year", detail: "The Third Man (1949)" },
  { q: "Which of these came out first?", options: ["The Wolf of Wall Street", "The King's Speech", "Killers of the Flower Moon", "Saving Private Ryan"], answer: "Saving Private Ryan", cat: "year", detail: "Saving Private Ryan (1998)" },
  { q: "When was Room released?", options: ["2015", "2016", "2014"], answer: "2015", cat: "year", detail: "Room (2015)" },
  { q: "Which of these came out first?", options: ["2001: A Space Odyssey", "Oppenheimer", "Casablanca", "The Lord of the Rings: The Two Towers"], answer: "Casablanca", cat: "year", detail: "Casablanca (1942)" },
  { q: "Which of these came out first?", options: ["Psycho", "Sound of Metal", "Hereditary", "Killers of the Flower Moon"], answer: "Psycho", cat: "year", detail: "Psycho (1960)" },
  { q: "Which of these came out first?", options: ["Top Gun: Maverick", "There Will Be Blood", "Butch Cassidy and the Sundance Kid", "The 400 Blows"], answer: "The 400 Blows", cat: "year", detail: "The 400 Blows (1959)" },
  { q: "Which of these came out first?", options: ["Requiem for a Dream", "Birdman", "Blade Runner 2049", "Roma"], answer: "Requiem for a Dream", cat: "year", detail: "Requiem for a Dream (2000)" },
  { q: "When was Trainspotting released?", options: ["1996", "1998", "1997"], answer: "1996", cat: "year", detail: "Trainspotting (1996)" },
  { q: "When was Boyhood released?", options: ["2014", "2013", "2016"], answer: "2014", cat: "year", detail: "Boyhood (2014)" },
  { q: "When was To Kill a Mockingbird released?", options: ["1962", "1963", "1964"], answer: "1962", cat: "year", detail: "To Kill a Mockingbird (1962)" },
  { q: "When was Interstellar released?", options: ["2014", "2016", "2011"], answer: "2014", cat: "year", detail: "Interstellar (2014)" },
  { q: "Which of these came out first?", options: ["Toy Story", "Trainspotting", "Terminator 2", "Sunset Boulevard"], answer: "Sunset Boulevard", cat: "year", detail: "Sunset Boulevard (1950)" },
  { q: "Which of these came out first?", options: ["Room", "The 400 Blows", "Mulholland Drive", "Whiplash"], answer: "The 400 Blows", cat: "year", detail: "The 400 Blows (1959)" },
  { q: "When was La Dolce Vita released?", options: ["1960", "1959", "1957"], answer: "1960", cat: "year", detail: "La Dolce Vita (1960)" },
  { q: "Which of these was released in the 1960s?", options: ["Psycho", "Batman Begins", "Boyhood", "The Godfather"], answer: "Psycho", cat: "year", detail: "Psycho (1960)" },
  { q: "When was Her released?", options: ["2013", "2010", "2014"], answer: "2013", cat: "year", detail: "Her (2013)" },
  { q: "Which of these was released in the 1960s?", options: ["8½", "Jurassic Park", "Sound of Metal", "Return of the Jedi"], answer: "8½", cat: "year", detail: "8½ (1963)" },
  { q: "Which of these came out first?", options: ["Network", "Annie Hall", "Her", "Top Gun: Maverick"], answer: "Network", cat: "year", detail: "Network (1976)" },
  { q: "When was The Power of the Dog released?", options: ["2021", "2023", "2020"], answer: "2021", cat: "year", detail: "The Power of the Dog (2021)" },
  { q: "When was The Terminator released?", options: ["1984", "1986", "1985"], answer: "1984", cat: "year", detail: "The Terminator (1984)" },
  { q: "Which of these came out first?", options: ["Léon: The Professional", "The Terminator", "Mad Max: Fury Road", "Lawrence of Arabia"], answer: "Lawrence of Arabia", cat: "year", detail: "Lawrence of Arabia (1962)" },
  { q: "Which of these was released in the 2000s?", options: ["The Lord of the Rings: The Fellowship of the Ring", "Bonnie and Clyde", "Apocalypse Now", "Braveheart"], answer: "The Lord of the Rings: The Fellowship of the Ring", cat: "year", detail: "The Lord of the Rings: The Fellowship of the Ring (2001)" },
  { q: "Which of these came out first?", options: ["Unforgiven", "Casablanca", "Batman", "Jurassic Park"], answer: "Casablanca", cat: "year", detail: "Casablanca (1942)" },
  { q: "Which of these came out first?", options: ["Annie Hall", "Finding Nemo", "Kill Bill: Vol. 1", "L.A. Confidential"], answer: "Annie Hall", cat: "year", detail: "Annie Hall (1977)" },
  { q: "Which of these was released in the 1970s?", options: ["Alien", "Ghostbusters", "Eyes Wide Shut", "American Beauty"], answer: "Alien", cat: "year", detail: "Alien (1979)" },
  { q: "When was The Shining released?", options: ["1980", "1981", "1982"], answer: "1980", cat: "year", detail: "The Shining (1980)" },
  { q: "Which of these was released in the 1960s?", options: ["Dr. Strangelove", "The Power of the Dog", "Ben-Hur", "Back to the Future"], answer: "Dr. Strangelove", cat: "year", detail: "Dr. Strangelove (1964)" },
  { q: "Which of these was released in the 1960s?", options: ["Persona", "The Princess Bride", "The Silence of the Lambs", "Casino"], answer: "Persona", cat: "year", detail: "Persona (1966)" },
  { q: "Which of these came out first?", options: ["Chinatown", "Shrek", "The Artist", "Scarface"], answer: "Chinatown", cat: "year", detail: "Chinatown (1974)" },
  { q: "Which of these came out first?", options: ["Double Indemnity", "Joker", "Mulholland Drive", "Zodiac"], answer: "Double Indemnity", cat: "year", detail: "Double Indemnity (1944)" },
  { q: "When was Eternal Sunshine of the Spotless Mind released?", options: ["2004", "2001", "2005"], answer: "2004", cat: "year", detail: "Eternal Sunshine of the Spotless Mind (2004)" },
  { q: "When was Eyes Wide Shut released?", options: ["1999", "2000", "2001"], answer: "1999", cat: "year", detail: "Eyes Wide Shut (1999)" },
  { q: "When was West Side Story released?", options: ["1961", "1958", "1962"], answer: "1961", cat: "year", detail: "West Side Story (1961)" },
  { q: "When was Little Miss Sunshine released?", options: ["2006", "2007", "2003"], answer: "2006", cat: "year", detail: "Little Miss Sunshine (2006)" },
  { q: "Which of these was released in the 1960s?", options: ["Dr. Strangelove", "Roma", "Million Dollar Baby", "Titanic"], answer: "Dr. Strangelove", cat: "year", detail: "Dr. Strangelove (1964)" },
  { q: "Which of these came out first?", options: ["Sunset Boulevard", "Casino", "Oldboy", "Ben-Hur"], answer: "Sunset Boulevard", cat: "year", detail: "Sunset Boulevard (1950)" },
  { q: "Which of these came out first?", options: ["Metropolis", "Amadeus", "Inglourious Basterds", "The Shape of Water"], answer: "Metropolis", cat: "year", detail: "Metropolis (1927)" },
  { q: "Which of these came out first?", options: ["Apocalypse Now", "Nomadland", "Casino", "The Silence of the Lambs"], answer: "Apocalypse Now", cat: "year", detail: "Apocalypse Now (1979)" },
  { q: "Which of these came out first?", options: ["Mulholland Drive", "Django Unchained", "Zodiac", "Children of Men"], answer: "Mulholland Drive", cat: "year", detail: "Mulholland Drive (2001)" },
  { q: "Which of these came out first?", options: ["City of God", "Gone with the Wind", "The Graduate", "The Godfather"], answer: "Gone with the Wind", cat: "year", detail: "Gone with the Wind (1939)" },
  { q: "Which of these came out first?", options: ["The Seventh Seal", "Barbie", "Groundhog Day", "Oldboy"], answer: "The Seventh Seal", cat: "year", detail: "The Seventh Seal (1957)" },
  { q: "Which of these came out first?", options: ["8½", "Return of the Jedi", "Saving Private Ryan", "Schindler's List"], answer: "8½", cat: "year", detail: "8½ (1963)" },
  { q: "Which of these came out first?", options: ["Boyhood", "Children of Men", "Vertigo", "The Tree of Life"], answer: "Vertigo", cat: "year", detail: "Vertigo (1958)" },
  { q: "Which of these was released in the 1970s?", options: ["The Sting", "Little Miss Sunshine", "Back to the Future", "Full Metal Jacket"], answer: "The Sting", cat: "year", detail: "The Sting (1973)" },
  { q: "Which of these came out first?", options: ["Batman", "Do the Right Thing", "Forrest Gump", "Nosferatu"], answer: "Nosferatu", cat: "year", detail: "Nosferatu (1922)" },
  { q: "Which of these came out first?", options: ["The Departed", "Dr. Strangelove", "Pulp Fiction", "Roma"], answer: "Dr. Strangelove", cat: "year", detail: "Dr. Strangelove (1964)" },
  { q: "When was Toy Story 3 released?", options: ["2010", "2012", "2011"], answer: "2010", cat: "year", detail: "Toy Story 3 (2010)" },
  { q: "Which of these came out first?", options: ["Little Miss Sunshine", "La La Land", "Forrest Gump", "Titanic"], answer: "Forrest Gump", cat: "year", detail: "Forrest Gump (1994)" },
  { q: "When was Alien released?", options: ["1979", "1976", "1980"], answer: "1979", cat: "year", detail: "Alien (1979)" },
  { q: "Which of these came out first?", options: ["Ben-Hur", "Black Panther", "The Third Man", "The Sting"], answer: "The Third Man", cat: "year", detail: "The Third Man (1949)" },
  { q: "Which of these came out first?", options: ["Shrek", "To Kill a Mockingbird", "Rosemary's Baby", "The Wizard of Oz"], answer: "The Wizard of Oz", cat: "year", detail: "The Wizard of Oz (1939)" },
  { q: "When was Children of Men released?", options: ["2006", "2003", "2008"], answer: "2006", cat: "year", detail: "Children of Men (2006)" },
  { q: "When was The Lord of the Rings: The Return of the King released?", options: ["2003", "2000", "2005"], answer: "2003", cat: "year", detail: "The Lord of the Rings: The Return of the King (2003)" },
  { q: "Which of these came out first?", options: ["Full Metal Jacket", "Nosferatu", "Fargo", "Little Miss Sunshine"], answer: "Nosferatu", cat: "year", detail: "Nosferatu (1922)" },
  { q: "Which of these was released in the 1970s?", options: ["The Deer Hunter", "City of God", "M", "Boyhood"], answer: "The Deer Hunter", cat: "year", detail: "The Deer Hunter (1978)" },
  { q: "Which of these came out first?", options: ["Get Out", "American Beauty", "Slumdog Millionaire", "Psycho"], answer: "Psycho", cat: "year", detail: "Psycho (1960)" },
  { q: "When was Lethal Weapon released?", options: ["1987", "1988", "1986"], answer: "1987", cat: "year", detail: "Lethal Weapon (1987)" },
  { q: "Which of these came out first?", options: ["Casino Royale", "To Kill a Mockingbird", "The Social Network", "Ben-Hur"], answer: "Ben-Hur", cat: "year", detail: "Ben-Hur (1959)" },
  { q: "Which of these came out first?", options: ["Nomadland", "Amadeus", "Die Hard", "King Kong"], answer: "King Kong", cat: "year", detail: "King Kong (1933)" },
  { q: "When was The Shape of Water released?", options: ["2017", "2016", "2019"], answer: "2017", cat: "year", detail: "The Shape of Water (2017)" },
  { q: "Which of these came out first?", options: ["Ratatouille", "Boyhood", "Drive", "Spider-Man"], answer: "Spider-Man", cat: "year", detail: "Spider-Man (2002)" },
  { q: "Which of these was released in the 1970s?", options: ["Close Encounters of the Third Kind", "To Kill a Mockingbird", "Jurassic Park", "The Truman Show"], answer: "Close Encounters of the Third Kind", cat: "year", detail: "Close Encounters of the Third Kind (1977)" },
  { q: "When was Get Out released?", options: ["2017", "2018", "2019"], answer: "2017", cat: "year", detail: "Get Out (2017)" },
  { q: "Which of these came out first?", options: ["Interstellar", "Ratatouille", "Drive My Car", "Birdman"], answer: "Ratatouille", cat: "year", detail: "Ratatouille (2007)" },
  { q: "Which of these came out first?", options: ["The King's Speech", "Stalker", "Inception", "Lost in Translation"], answer: "Stalker", cat: "year", detail: "Stalker (1979)" },
  { q: "Which of these came out first?", options: ["Munich", "Raging Bull", "Saving Private Ryan", "Die Hard"], answer: "Raging Bull", cat: "year", detail: "Raging Bull (1980)" },
  { q: "When was The Wolf of Wall Street released?", options: ["2013", "2012", "2010"], answer: "2013", cat: "year", detail: "The Wolf of Wall Street (2013)" },
  { q: "Which of these came out first?", options: ["Jaws", "The Shawshank Redemption", "The Departed", "The King's Speech"], answer: "Jaws", cat: "year", detail: "Jaws (1975)" },
  { q: "Which of these came out first?", options: ["Drive My Car", "Black Swan", "Stalker", "Gladiator"], answer: "Stalker", cat: "year", detail: "Stalker (1979)" },
  { q: "Which of these came out first?", options: ["Joker", "Past Lives", "The Princess Bride", "American Beauty"], answer: "The Princess Bride", cat: "year", detail: "The Princess Bride (1987)" },
  { q: "Which of these was released in the 1970s?", options: ["The Exorcist", "The Sixth Sense", "Saving Private Ryan", "Barbie"], answer: "The Exorcist", cat: "year", detail: "The Exorcist (1973)" },
  { q: "Which of these came out first?", options: ["The Exorcist", "Gladiator", "Chinatown", "Terminator 2"], answer: "The Exorcist", cat: "year", detail: "The Exorcist (1973)" },
  { q: "Which of these came out first?", options: ["The Lion King", "American Beauty", "La Dolce Vita", "Wall-E"], answer: "La Dolce Vita", cat: "year", detail: "La Dolce Vita (1960)" },
  { q: "When was Requiem for a Dream released?", options: ["2000", "1997", "2001"], answer: "2000", cat: "year", detail: "Requiem for a Dream (2000)" },
  { q: "Which of these was released in the 1970s?", options: ["Taxi Driver", "Munich", "A Star Is Born", "The Third Man"], answer: "Taxi Driver", cat: "year", detail: "Taxi Driver (1976)" },
  { q: "Which of these was released in the 1970s?", options: ["Chinatown", "Unforgiven", "Thelma & Louise", "West Side Story"], answer: "Chinatown", cat: "year", detail: "Chinatown (1974)" },
  { q: "Which of these came out first?", options: ["Django Unchained", "Once Upon a Time in Hollywood", "Schindler's List", "Shrek"], answer: "Schindler's List", cat: "year", detail: "Schindler's List (1993)" },
  { q: "Which of these came out first?", options: ["Amadeus", "E.T.", "Parasite", "Star Wars"], answer: "Star Wars", cat: "year", detail: "Star Wars (1977)" },
  { q: "Which of these came out first?", options: ["Heat", "A Beautiful Mind", "Stalker", "Metropolis"], answer: "Metropolis", cat: "year", detail: "Metropolis (1927)" },
  { q: "Which of these was released in the 2000s?", options: ["The Lord of the Rings: The Fellowship of the Ring", "Braveheart", "Chinatown", "Double Indemnity"], answer: "The Lord of the Rings: The Fellowship of the Ring", cat: "year", detail: "The Lord of the Rings: The Fellowship of the Ring (2001)" },
  { q: "Which of these came out first?", options: ["Rashomon", "The Incredibles", "Braveheart", "L.A. Confidential"], answer: "Rashomon", cat: "year", detail: "Rashomon (1950)" },
  { q: "Which of these came out first?", options: ["Lost in Translation", "E.T.", "Schindler's List", "Solaris"], answer: "Solaris", cat: "year", detail: "Solaris (1972)" },
  { q: "When was Thelma & Louise released?", options: ["1991", "1993", "1988"], answer: "1991", cat: "year", detail: "Thelma & Louise (1991)" },
  { q: "Which of these came out first?", options: ["Joker", "Children of Men", "Saving Private Ryan", "Iron Man"], answer: "Saving Private Ryan", cat: "year", detail: "Saving Private Ryan (1998)" },
  { q: "Which of these was released in the 1970s?", options: ["Rocky", "American History X", "Ghostbusters", "To Kill a Mockingbird"], answer: "Rocky", cat: "year", detail: "Rocky (1976)" },
  { q: "Which of these was released in the 1960s?", options: ["Psycho", "Minari", "Wall-E", "Forrest Gump"], answer: "Psycho", cat: "year", detail: "Psycho (1960)" },
  { q: "Which of these came out first?", options: ["Butch Cassidy and the Sundance Kid", "Crouching Tiger Hidden Dragon", "The Revenant", "The Passion of Joan of Arc"], answer: "The Passion of Joan of Arc", cat: "year", detail: "The Passion of Joan of Arc (1928)" },
  { q: "When was Stalker released?", options: ["1979", "1980", "1978"], answer: "1979", cat: "year", detail: "Stalker (1979)" },
  { q: "Which of these came out first?", options: ["Kill Bill: Vol. 1", "Crouching Tiger Hidden Dragon", "Singin' in the Rain", "Avatar"], answer: "Singin' in the Rain", cat: "year", detail: "Singin' in the Rain (1952)" },
  { q: "Which of these came out first?", options: ["L.A. Confidential", "Juno", "Metropolis", "Django Unchained"], answer: "Metropolis", cat: "year", detail: "Metropolis (1927)" },
  { q: "Which of these was released in the 2000s?", options: ["Million Dollar Baby", "Top Gun", "2001: A Space Odyssey", "Unforgiven"], answer: "Million Dollar Baby", cat: "year", detail: "Million Dollar Baby (2004)" },
  { q: "Which of these came out first?", options: ["The Banshees of Inisherin", "Breathless", "The Seventh Seal", "No Country for Old Men"], answer: "The Seventh Seal", cat: "year", detail: "The Seventh Seal (1957)" },
  { q: "Which of these was released in the 2000s?", options: ["Zodiac", "Rashomon", "La Dolce Vita", "Citizen Kane"], answer: "Zodiac", cat: "year", detail: "Zodiac (2007)" },
  { q: "Which of these was directed by Quentin Tarantino?", options: ["Once Upon a Time in Hollywood", "The New World", "Steve Jobs", "Rashomon"], answer: "Once Upon a Time in Hollywood", cat: "director", detail: "Quentin Tarantino directed Once Upon a Time in Hollywood" },
  { q: "Who directed Psycho?", options: ["Alfred Hitchcock", "Federico Fellini", "Ridley Scott", "Stanley Kubrick"], answer: "Alfred Hitchcock", cat: "director", detail: "Alfred Hitchcock's Psycho" },
  { q: "Who directed Se7en?", options: ["David Fincher", "Martin Scorsese", "Ridley Scott", "Danny Boyle"], answer: "David Fincher", cat: "director", detail: "David Fincher's Se7en" },
  { q: "Who directed Ikiru?", options: ["Akira Kurosawa", "Werner Herzog", "Terrence Malick", "Sam Mendes"], answer: "Akira Kurosawa", cat: "director", detail: "Akira Kurosawa's Ikiru" },
  { q: "Who directed both Million Dollar Baby and Unforgiven?", options: ["Clint Eastwood", "Federico Fellini", "Darren Aronofsky", "Sofia Coppola"], answer: "Clint Eastwood", cat: "director", detail: "Both are Clint Eastwood films" },
  { q: "Who directed The Tree of Life?", options: ["Terrence Malick", "Fernando Meirelles", "David Fincher", "Christopher Nolan"], answer: "Terrence Malick", cat: "director", detail: "Terrence Malick's The Tree of Life" },
  { q: "Which of these was directed by Park Chan-wook?", options: ["Joint Security Area", "A Brighter Summer Day", "Parasite", "Andrei Rublev"], answer: "Joint Security Area", cat: "director", detail: "Park Chan-wook directed Joint Security Area" },
  { q: "Which of these was directed by David Fincher?", options: ["Panic Room", "Saving Private Ryan", "Children of Men", "The Wrestler"], answer: "Panic Room", cat: "director", detail: "David Fincher directed Panic Room" },
  { q: "Which of these was NOT directed by Wes Anderson?", options: ["Raiders of the Lost Ark", "The French Dispatch", "The Darjeeling Limited", "Moonrise Kingdom"], answer: "Raiders of the Lost Ark", cat: "director", detail: "Raiders of the Lost Ark was not a Wes Anderson film" },
  { q: "Which of these was directed by Francis Ford Coppola?", options: ["Apocalypse Now", "Wall Street", "The Pianist", "JFK"], answer: "Apocalypse Now", cat: "director", detail: "Francis Ford Coppola directed Apocalypse Now" },
  { q: "Which of these was NOT directed by Pedro Almodóvar?", options: ["Weekend", "Parallel Mothers", "Talk to Her", "Women on the Verge of a Nervous Breakdown"], answer: "Weekend", cat: "director", detail: "Weekend was not a Pedro Almodóvar film" },
  { q: "Which of these was NOT directed by Werner Herzog?", options: ["Pierrot le Fou", "Grizzly Man", "Cave of Forgotten Dreams", "Rescue Dawn"], answer: "Pierrot le Fou", cat: "director", detail: "Pierrot le Fou was not a Werner Herzog film" },
  { q: "Which of these was NOT directed by Martin Scorsese?", options: ["The Grandmaster", "Killers of the Flower Moon", "Gangs of New York", "The Irishman"], answer: "The Grandmaster", cat: "director", detail: "The Grandmaster was not a Martin Scorsese film" },
  { q: "Which of these was NOT directed by Martin Scorsese?", options: ["Lady Bird", "Taxi Driver", "The Irishman", "The Wolf of Wall Street"], answer: "Lady Bird", cat: "director", detail: "Lady Bird was not a Martin Scorsese film" },
  { q: "Which of these was NOT directed by Brian De Palma?", options: ["Snowpiercer", "Mission: Impossible", "Carrie", "The Untouchables"], answer: "Snowpiercer", cat: "director", detail: "Snowpiercer was not a Brian De Palma film" },
  { q: "Which of these was directed by Martin Scorsese?", options: ["The Departed", "Grizzly Man", "Mother", "The Royal Tenenbaums"], answer: "The Departed", cat: "director", detail: "Martin Scorsese directed The Departed" },
  { q: "Who directed Mad Max Beyond Thunderdome?", options: ["George Miller", "Darren Aronofsky", "Tim Burton", "Robert Zemeckis"], answer: "George Miller", cat: "director", detail: "George Miller's Mad Max Beyond Thunderdome" },
  { q: "Which of these was NOT directed by Steven Spielberg?", options: ["A Hero", "Saving Private Ryan", "The Post", "Jurassic Park"], answer: "A Hero", cat: "director", detail: "A Hero was not a Steven Spielberg film" },
  { q: "Who directed both Sympathy for Mr. Vengeance and Lady Vengeance?", options: ["Park Chan-wook", "Francis Ford Coppola", "Greta Gerwig", "Fernando Meirelles"], answer: "Park Chan-wook", cat: "director", detail: "Both are Park Chan-wook films" },
  { q: "Which of these was NOT directed by Stanley Kubrick?", options: ["The Outsiders", "2001: A Space Odyssey", "A Clockwork Orange", "Spartacus"], answer: "The Outsiders", cat: "director", detail: "The Outsiders was not a Stanley Kubrick film" },
  { q: "Who directed both Nights of Cabiria and Amarcord?", options: ["Federico Fellini", "Stanley Kubrick", "Sam Mendes", "Alfonso Cuarón"], answer: "Federico Fellini", cat: "director", detail: "Both are Federico Fellini films" },
  { q: "Who directed Skyfall?", options: ["Sam Mendes", "Akira Kurosawa", "Michael Haneke", "Brian De Palma"], answer: "Sam Mendes", cat: "director", detail: "Sam Mendes's Skyfall" },
  { q: "Who directed Thelma & Louise?", options: ["Ridley Scott", "James Cameron", "Ang Lee", "Robert Zemeckis"], answer: "Ridley Scott", cat: "director", detail: "Ridley Scott's Thelma & Louise" },
  { q: "Which of these was directed by Martin Scorsese?", options: ["The Irishman", "Pan's Labyrinth", "Badlands", "Talk to Her"], answer: "The Irishman", cat: "director", detail: "Martin Scorsese directed The Irishman" },
  { q: "Which of these was directed by Michael Mann?", options: ["Public Enemies", "Vertigo", "Yi Yi", "Roma"], answer: "Public Enemies", cat: "director", detail: "Michael Mann directed Public Enemies" },
  { q: "Which of these was directed by Sofia Coppola?", options: ["The Beguiled", "Magnolia", "Inception", "Gone Girl"], answer: "The Beguiled", cat: "director", detail: "Sofia Coppola directed The Beguiled" },
  { q: "Who directed Django Unchained?", options: ["Quentin Tarantino", "Denis Villeneuve", "James Cameron", "Ingmar Bergman"], answer: "Quentin Tarantino", cat: "director", detail: "Quentin Tarantino's Django Unchained" },
  { q: "Which of these was directed by Robert Zemeckis?", options: ["The Polar Express", "Her", "Cries and Whispers", "Raiders of the Lost Ark"], answer: "The Polar Express", cat: "director", detail: "Robert Zemeckis directed The Polar Express" },
  { q: "Who directed Edward Scissorhands?", options: ["Tim Burton", "Clint Eastwood", "Federico Fellini", "François Truffaut"], answer: "Tim Burton", cat: "director", detail: "Tim Burton's Edward Scissorhands" },
  { q: "Who directed both Chungking Express and Happy Together?", options: ["Wong Kar-wai", "Lars von Trier", "Greta Gerwig", "Akira Kurosawa"], answer: "Wong Kar-wai", cat: "director", detail: "Both are Wong Kar-wai films" },
  { q: "Who directed both Raging Bull and Taxi Driver?", options: ["Martin Scorsese", "Ridley Scott", "Brian De Palma", "Wes Anderson"], answer: "Martin Scorsese", cat: "director", detail: "Both are Martin Scorsese films" },
  { q: "Which of these was directed by Robert Zemeckis?", options: ["Who Framed Roger Rabbit", "mother!", "Tenet", "Lincoln"], answer: "Who Framed Roger Rabbit", cat: "director", detail: "Robert Zemeckis directed Who Framed Roger Rabbit" },
  { q: "Which of these was directed by Brian De Palma?", options: ["The Untouchables", "Breathless", "Rescue Dawn", "Slumdog Millionaire"], answer: "The Untouchables", cat: "director", detail: "Brian De Palma directed The Untouchables" },
  { q: "Who directed both Goodbye to Language and Pierrot le Fou?", options: ["Jean-Luc Godard", "Robert Zemeckis", "Federico Fellini", "Roman Polanski"], answer: "Jean-Luc Godard", cat: "director", detail: "Both are Jean-Luc Godard films" },
  { q: "Which of these was directed by Alfonso Cuarón?", options: ["Roma", "Schindler's List", "Saving Private Ryan", "The Devil's Backbone"], answer: "Roma", cat: "director", detail: "Alfonso Cuarón directed Roma" },
  { q: "Which of these was directed by Guillermo del Toro?", options: ["The Shape of Water", "The Darjeeling Limited", "The Outsiders", "The Untouchables"], answer: "The Shape of Water", cat: "director", detail: "Guillermo del Toro directed The Shape of Water" },
  { q: "Who directed both Happy Feet and Furiosa?", options: ["George Miller", "Brian De Palma", "Robert Zemeckis", "Charlie Kaufman"], answer: "George Miller", cat: "director", detail: "Both are George Miller films" },
  { q: "Which of these was directed by Sam Mendes?", options: ["Road to Perdition", "Arrival", "Somewhere", "Ed Wood"], answer: "Road to Perdition", cat: "director", detail: "Sam Mendes directed Road to Perdition" },
  { q: "Who directed both Rebecca and North by Northwest?", options: ["Alfred Hitchcock", "Francis Ford Coppola", "Fernando Meirelles", "Park Chan-wook"], answer: "Alfred Hitchcock", cat: "director", detail: "Both are Alfred Hitchcock films" },
  { q: "Who directed Rashomon?", options: ["Akira Kurosawa", "Coen Brothers", "Asghar Farhadi", "François Truffaut"], answer: "Akira Kurosawa", cat: "director", detail: "Akira Kurosawa's Rashomon" },
  { q: "Which of these was directed by Robert Zemeckis?", options: ["Forrest Gump", "Her", "Andrei Rublev", "Gravity"], answer: "Forrest Gump", cat: "director", detail: "Robert Zemeckis directed Forrest Gump" },
  { q: "Which of these was directed by Denis Villeneuve?", options: ["Sicario", "127 Hours", "Notorious", "Being John Malkovich"], answer: "Sicario", cat: "director", detail: "Denis Villeneuve directed Sicario" },
  { q: "Which of these was directed by Greta Gerwig?", options: ["Little Women", "Sympathy for Mr. Vengeance", "The Virgin Suicides", "Memories of Murder"], answer: "Little Women", cat: "director", detail: "Greta Gerwig directed Little Women" },
  { q: "Which of these was directed by Martin Scorsese?", options: ["Taxi Driver", "Bridge of Spies", "Blade Runner 2049", "127 Hours"], answer: "Taxi Driver", cat: "director", detail: "Martin Scorsese directed Taxi Driver" },
  { q: "Which of these was directed by Brian De Palma?", options: ["Mission: Impossible", "The New World", "The Thin Red Line", "The Hateful Eight"], answer: "Mission: Impossible", cat: "director", detail: "Brian De Palma directed Mission: Impossible" },
  { q: "Who directed The Hateful Eight?", options: ["Quentin Tarantino", "Guillermo del Toro", "David Fincher", "Ang Lee"], answer: "Quentin Tarantino", cat: "director", detail: "Quentin Tarantino's The Hateful Eight" },
  { q: "Which of these was NOT directed by Clint Eastwood?", options: ["The Handmaiden", "Unforgiven", "Mystic River", "Million Dollar Baby"], answer: "The Handmaiden", cat: "director", detail: "The Handmaiden was not a Clint Eastwood film" },
  { q: "Which of these was directed by Denis Villeneuve?", options: ["Dune: Part Two", "The Revenant", "Inside Llewyn Davis", "Fight Club"], answer: "Dune: Part Two", cat: "director", detail: "Denis Villeneuve directed Dune: Part Two" },
  { q: "Who directed The Untouchables?", options: ["Brian De Palma", "Asghar Farhadi", "Akira Kurosawa", "Francis Ford Coppola"], answer: "Brian De Palma", cat: "director", detail: "Brian De Palma's The Untouchables" },
  { q: "Who directed American Gangster?", options: ["Ridley Scott", "Sofia Coppola", "Robert Zemeckis", "Alfonso Cuarón"], answer: "Ridley Scott", cat: "director", detail: "Ridley Scott's American Gangster" },
  { q: "Which of these was NOT directed by Alfonso Cuarón?", options: ["The Shining", "Y Tu Mamá También", "Children of Men", "Roma"], answer: "The Shining", cat: "director", detail: "The Shining was not a Alfonso Cuarón film" },
  { q: "Which of these was directed by Bong Joon-ho?", options: ["Snowpiercer", "Phantom Thread", "Her", "The Tree of Life"], answer: "Snowpiercer", cat: "director", detail: "Bong Joon-ho directed Snowpiercer" },
  { q: "Who directed both The Master and There Will Be Blood?", options: ["Paul Thomas Anderson", "Spike Lee", "Coen Brothers", "Francis Ford Coppola"], answer: "Paul Thomas Anderson", cat: "director", detail: "Both are Paul Thomas Anderson films" },
  { q: "Which of these was NOT directed by Clint Eastwood?", options: ["Zodiac", "Unforgiven", "Mystic River", "Million Dollar Baby"], answer: "Zodiac", cat: "director", detail: "Zodiac was not a Clint Eastwood film" },
  { q: "Which of these was directed by Alfred Hitchcock?", options: ["North by Northwest", "No Country for Old Men", "Inception", "Back to the Future"], answer: "North by Northwest", cat: "director", detail: "Alfred Hitchcock directed North by Northwest" },
  { q: "Which of these was directed by Jean-Luc Godard?", options: ["Goodbye to Language", "Snowpiercer", "Raising Arizona", "Furiosa"], answer: "Goodbye to Language", cat: "director", detail: "Jean-Luc Godard directed Goodbye to Language" },
  { q: "Who directed Heat?", options: ["Michael Mann", "David Fincher", "Park Chan-wook", "Tim Burton"], answer: "Michael Mann", cat: "director", detail: "Michael Mann's Heat" },
  { q: "Which of these was NOT directed by Clint Eastwood?", options: ["The Untouchables", "Unforgiven", "Letters from Iwo Jima", "Gran Torino"], answer: "The Untouchables", cat: "director", detail: "The Untouchables was not a Clint Eastwood film" },
  { q: "Which of these was directed by Alfonso Cuarón?", options: ["Children of Men", "Sicario", "Mad Max: Fury Road", "Marie Antoinette"], answer: "Children of Men", cat: "director", detail: "Alfonso Cuarón directed Children of Men" },
  { q: "Which of these was NOT directed by Asghar Farhadi?", options: ["Pulp Fiction", "A Hero", "The Past"], answer: "Pulp Fiction", cat: "director", detail: "Pulp Fiction was not a Asghar Farhadi film" },
  { q: "Which of these was NOT directed by Jean-Luc Godard?", options: ["The Wolf of Wall Street", "Breathless", "Contempt", "Goodbye to Language"], answer: "The Wolf of Wall Street", cat: "director", detail: "The Wolf of Wall Street was not a Jean-Luc Godard film" },
  { q: "Who directed Sicario?", options: ["Denis Villeneuve", "Alejandro González Iñárritu", "Edward Yang", "Tim Burton"], answer: "Denis Villeneuve", cat: "director", detail: "Denis Villeneuve's Sicario" },
  { q: "Which of these was NOT directed by Wes Anderson?", options: ["Howl's Moving Castle", "Rushmore", "The Life Aquatic", "The French Dispatch"], answer: "Howl's Moving Castle", cat: "director", detail: "Howl's Moving Castle was not a Wes Anderson film" },
  { q: "Who directed A Clockwork Orange?", options: ["Stanley Kubrick", "Terrence Malick", "Paul Thomas Anderson", "Michael Haneke"], answer: "Stanley Kubrick", cat: "director", detail: "Stanley Kubrick's A Clockwork Orange" },
  { q: "Which of these was NOT directed by Oliver Stone?", options: ["Mystic River", "Wall Street", "JFK", "Born on the Fourth of July"], answer: "Mystic River", cat: "director", detail: "Mystic River was not a Oliver Stone film" },
  { q: "Which of these was directed by Quentin Tarantino?", options: ["Kill Bill: Vol. 2", "Batman Returns", "Shoot the Piano Player", "The Master"], answer: "Kill Bill: Vol. 2", cat: "director", detail: "Quentin Tarantino directed Kill Bill: Vol. 2" },
  { q: "Which of these was directed by Hayao Miyazaki?", options: ["The Boy and the Heron", "Pulp Fiction", "Babylon", "Nights of Cabiria"], answer: "The Boy and the Heron", cat: "director", detail: "Hayao Miyazaki directed The Boy and the Heron" },
  { q: "Who directed Zodiac?", options: ["David Fincher", "Coen Brothers", "Danny Boyle", "Jordan Peele"], answer: "David Fincher", cat: "director", detail: "David Fincher's Zodiac" },
  { q: "Which of these was directed by Wes Anderson?", options: ["The Darjeeling Limited", "Day for Night", "Inland Empire", "Fitzcarraldo"], answer: "The Darjeeling Limited", cat: "director", detail: "Wes Anderson directed The Darjeeling Limited" },
  { q: "Which of these was directed by Darren Aronofsky?", options: ["Pi", "Get Out", "Da 5 Bloods", "Babe"], answer: "Pi", cat: "director", detail: "Darren Aronofsky directed Pi" },
  { q: "Which of these was NOT directed by Quentin Tarantino?", options: ["Vertigo", "Jackie Brown", "Inglourious Basterds", "Kill Bill: Vol. 2"], answer: "Vertigo", cat: "director", detail: "Vertigo was not a Quentin Tarantino film" },
  { q: "Which of these was directed by Stanley Kubrick?", options: ["Dr. Strangelove", "Throne of Blood", "Lady Vengeance", "Barbie"], answer: "Dr. Strangelove", cat: "director", detail: "Stanley Kubrick directed Dr. Strangelove" },
  { q: "Which of these was NOT directed by Hayao Miyazaki?", options: ["Panic Room", "Nausicaä of the Valley of the Wind", "Princess Mononoke", "Kiki's Delivery Service"], answer: "Panic Room", cat: "director", detail: "Panic Room was not a Hayao Miyazaki film" },
  { q: "Who directed Raiders of the Lost Ark?", options: ["Steven Spielberg", "Brian De Palma", "Danny Boyle", "François Truffaut"], answer: "Steven Spielberg", cat: "director", detail: "Steven Spielberg's Raiders of the Lost Ark" },
  { q: "Which of these was directed by Paul Thomas Anderson?", options: ["The Master", "Lost Highway", "Decision to Leave", "The 400 Blows"], answer: "The Master", cat: "director", detail: "Paul Thomas Anderson directed The Master" },
  { q: "Which of these was directed by Danny Boyle?", options: ["Steve Jobs", "Jules and Jim", "Yojimbo", "Magnolia"], answer: "Steve Jobs", cat: "director", detail: "Danny Boyle directed Steve Jobs" },
  { q: "Who directed Little Women?", options: ["Greta Gerwig", "Asghar Farhadi", "Guillermo del Toro", "Akira Kurosawa"], answer: "Greta Gerwig", cat: "director", detail: "Greta Gerwig's Little Women" },
  { q: "Which of these was directed by Martin Scorsese?", options: ["Goodfellas", "Pierrot le Fou", "The Hurt Locker", "Megalopolis"], answer: "Goodfellas", cat: "director", detail: "Martin Scorsese directed Goodfellas" },
  { q: "Who directed both Gone Girl and Mank?", options: ["David Fincher", "George Miller", "Paul Thomas Anderson", "Denis Villeneuve"], answer: "David Fincher", cat: "director", detail: "Both are David Fincher films" },
  { q: "Which of these was directed by Ridley Scott?", options: ["Blade Runner", "Kill Bill: Vol. 2", "Killers of the Flower Moon", "Ivan's Childhood"], answer: "Blade Runner", cat: "director", detail: "Ridley Scott directed Blade Runner" },
  { q: "Which of these was directed by Pedro Almodóvar?", options: ["All About My Mother", "Twin Peaks: Fire Walk with Me", "The Grand Budapest Hotel", "Who Framed Roger Rabbit"], answer: "All About My Mother", cat: "director", detail: "Pedro Almodóvar directed All About My Mother" },
  { q: "Who directed Raging Bull?", options: ["Martin Scorsese", "Charlie Kaufman", "Kathryn Bigelow", "Wes Anderson"], answer: "Martin Scorsese", cat: "director", detail: "Martin Scorsese's Raging Bull" },
  { q: "Which of these was directed by Jean-Luc Godard?", options: ["Weekend", "Steve Jobs", "Women on the Verge of a Nervous Breakdown", "Inland Empire"], answer: "Weekend", cat: "director", detail: "Jean-Luc Godard directed Weekend" },
  { q: "Who directed Vertigo?", options: ["Alfred Hitchcock", "Ingmar Bergman", "Danny Boyle", "Darren Aronofsky"], answer: "Alfred Hitchcock", cat: "director", detail: "Alfred Hitchcock's Vertigo" },
  { q: "Who directed both The Host and Mother?", options: ["Bong Joon-ho", "Akira Kurosawa", "Barry Jenkins", "Alfred Hitchcock"], answer: "Bong Joon-ho", cat: "director", detail: "Both are Bong Joon-ho films" },
  { q: "Which of these was NOT directed by Wes Anderson?", options: ["The Constant Gardener", "Fantastic Mr. Fox", "The French Dispatch", "Asteroid City"], answer: "The Constant Gardener", cat: "director", detail: "The Constant Gardener was not a Wes Anderson film" },
  { q: "Who directed Pi?", options: ["Darren Aronofsky", "Sam Mendes", "Quentin Tarantino", "Martin Scorsese"], answer: "Darren Aronofsky", cat: "director", detail: "Darren Aronofsky's Pi" },
  { q: "Which of these was directed by Robert Zemeckis?", options: ["Back to the Future", "Black Hawk Down", "Adaptation", "8½"], answer: "Back to the Future", cat: "director", detail: "Robert Zemeckis directed Back to the Future" },
  { q: "Who directed JFK?", options: ["Oliver Stone", "Akira Kurosawa", "Darren Aronofsky", "Fernando Meirelles"], answer: "Oliver Stone", cat: "director", detail: "Oliver Stone's JFK" },
  { q: "Who directed Ed Wood?", options: ["Tim Burton", "Ang Lee", "Guillermo del Toro", "Wong Kar-wai"], answer: "Tim Burton", cat: "director", detail: "Tim Burton's Ed Wood" },
  { q: "Which of these was directed by Tim Burton?", options: ["Beetlejuice", "La Strada", "The Polar Express", "Harry Potter and the Prisoner of Azkaban"], answer: "Beetlejuice", cat: "director", detail: "Tim Burton directed Beetlejuice" },
  { q: "Who directed Blade Runner?", options: ["Ridley Scott", "Steven Spielberg", "Jean-Luc Godard", "Kathryn Bigelow"], answer: "Ridley Scott", cat: "director", detail: "Ridley Scott's Blade Runner" },
  { q: "Who directed both The Beguiled and Somewhere?", options: ["Sofia Coppola", "Barry Jenkins", "Stanley Kubrick", "Tim Burton"], answer: "Sofia Coppola", cat: "director", detail: "Both are Sofia Coppola films" },
  { q: "Who directed Dune: Part Two?", options: ["Denis Villeneuve", "Alejandro González Iñárritu", "Hayao Miyazaki", "Brian De Palma"], answer: "Denis Villeneuve", cat: "director", detail: "Denis Villeneuve's Dune: Part Two" },
  { q: "Which of these was NOT directed by Charlie Kaufman?", options: ["Batman Begins", "I'm Thinking of Ending Things", "Synecdoche New York"], answer: "Batman Begins", cat: "director", detail: "Batman Begins was not a Charlie Kaufman film" },
  { q: "Which of these was NOT directed by Christopher Nolan?", options: ["Castle in the Sky", "Interstellar", "Dunkirk", "Oppenheimer"], answer: "Castle in the Sky", cat: "director", detail: "Castle in the Sky was not a Christopher Nolan film" },
  { q: "Who directed Priscilla?", options: ["Sofia Coppola", "Jordan Peele", "Spike Lee", "Ang Lee"], answer: "Sofia Coppola", cat: "director", detail: "Sofia Coppola's Priscilla" },
  { q: "Who directed Adaptation?", options: ["Spike Jonze", "Coen Brothers", "Bong Joon-ho", "Werner Herzog"], answer: "Spike Jonze", cat: "director", detail: "Spike Jonze's Adaptation" },
  { q: "Which of these was directed by Park Chan-wook?", options: ["Sympathy for Mr. Vengeance", "Raising Arizona", "Little Women", "The Master"], answer: "Sympathy for Mr. Vengeance", cat: "director", detail: "Park Chan-wook directed Sympathy for Mr. Vengeance" },
  { q: "Which of these was NOT directed by Oliver Stone?", options: ["Goodfellas", "JFK", "Wall Street", "Natural Born Killers"], answer: "Goodfellas", cat: "director", detail: "Goodfellas was not a Oliver Stone film" },
  { q: "Which of these was directed by Pedro Almodóvar?", options: ["The Room Next Door", "Harry Potter and the Prisoner of Azkaban", "Batman Begins", "If Beale Street Could Talk"], answer: "The Room Next Door", cat: "director", detail: "Pedro Almodóvar directed The Room Next Door" },
  { q: "Who directed West Side Story?", options: ["Steven Spielberg", "Terrence Malick", "Bong Joon-ho", "Spike Jonze"], answer: "Steven Spielberg", cat: "director", detail: "Steven Spielberg's West Side Story" },
  { q: "Who directed 25th Hour?", options: ["Spike Lee", "James Cameron", "Denis Villeneuve", "Roman Polanski"], answer: "Spike Lee", cat: "director", detail: "Spike Lee's 25th Hour" },
  { q: "Who directed Requiem for a Dream?", options: ["Darren Aronofsky", "Fernando Meirelles", "Paul Thomas Anderson", "Federico Fellini"], answer: "Darren Aronofsky", cat: "director", detail: "Darren Aronofsky's Requiem for a Dream" },
  { q: "Who directed Mad Max?", options: ["George Miller", "Martin Scorsese", "Wong Kar-wai", "Alejandro González Iñárritu"], answer: "George Miller", cat: "director", detail: "George Miller's Mad Max" },
  { q: "Who directed both Batman Begins and Interstellar?", options: ["Christopher Nolan", "Alfonso Cuarón", "Ingmar Bergman", "Guillermo del Toro"], answer: "Christopher Nolan", cat: "director", detail: "Both are Christopher Nolan films" },
  { q: "Which of these was NOT directed by Denis Villeneuve?", options: ["Babe", "Enemy", "Arrival", "Prisoners"], answer: "Babe", cat: "director", detail: "Babe was not a Denis Villeneuve film" },
  { q: "Who directed both Pi and The Whale?", options: ["Darren Aronofsky", "David Lynch", "Hayao Miyazaki", "Martin Scorsese"], answer: "Darren Aronofsky", cat: "director", detail: "Both are Darren Aronofsky films" },
  { q: "Which of these was directed by Ridley Scott?", options: ["Black Hawk Down", "Nostalgia", "The Master", "Marie Antoinette"], answer: "Black Hawk Down", cat: "director", detail: "Ridley Scott directed Black Hawk Down" },
  { q: "Which of these was directed by Sofia Coppola?", options: ["Priscilla", "Vertigo", "2001: A Space Odyssey", "The Devil's Backbone"], answer: "Priscilla", cat: "director", detail: "Sofia Coppola directed Priscilla" },
  { q: "Which of these was NOT directed by Kathryn Bigelow?", options: ["The Boy and the Heron", "Strange Days", "Point Break"], answer: "The Boy and the Heron", cat: "director", detail: "The Boy and the Heron was not a Kathryn Bigelow film" },
  { q: "Which of these was NOT directed by Francis Ford Coppola?", options: ["Wild Strawberries", "The Conversation", "The Outsiders", "Megalopolis"], answer: "Wild Strawberries", cat: "director", detail: "Wild Strawberries was not a Francis Ford Coppola film" },
  { q: "Which of these was directed by Michael Mann?", options: ["Miami Vice", "Full Metal Jacket", "Saving Private Ryan", "The Post"], answer: "Miami Vice", cat: "director", detail: "Michael Mann directed Miami Vice" },
  { q: "Which of these was directed by Hayao Miyazaki?", options: ["My Neighbor Totoro", "O Brother Where Art Thou", "Stalker", "Peppermint Candy"], answer: "My Neighbor Totoro", cat: "director", detail: "Hayao Miyazaki directed My Neighbor Totoro" },
  { q: "Who directed Sweeney Todd?", options: ["Tim Burton", "Martin Scorsese", "Quentin Tarantino", "Oliver Stone"], answer: "Tim Burton", cat: "director", detail: "Tim Burton's Sweeney Todd" },
  { q: "Who directed The Birds?", options: ["Alfred Hitchcock", "Michael Haneke", "Sam Mendes", "Guillermo del Toro"], answer: "Alfred Hitchcock", cat: "director", detail: "Alfred Hitchcock's The Birds" },
  { q: "Who directed Platoon?", options: ["Oliver Stone", "Tim Burton", "Clint Eastwood", "Robert Zemeckis"], answer: "Oliver Stone", cat: "director", detail: "Oliver Stone's Platoon" },
  { q: "Who directed Flight?", options: ["Robert Zemeckis", "George Miller", "Steven Spielberg", "Jean-Luc Godard"], answer: "Robert Zemeckis", cat: "director", detail: "Robert Zemeckis's Flight" },
  { q: "Which of these was directed by Ang Lee?", options: ["Life of Pi", "Inherent Vice", "Black Swan", "Sicario"], answer: "Life of Pi", cat: "director", detail: "Ang Lee directed Life of Pi" },
  { q: "Which of these was NOT directed by Akira Kurosawa?", options: ["Joint Security Area", "Ikiru", "Rashomon", "Dreams"], answer: "Joint Security Area", cat: "director", detail: "Joint Security Area was not a Akira Kurosawa film" },
  { q: "Which of these was directed by Tim Burton?", options: ["Edward Scissorhands", "Shoot the Piano Player", "Nights of Cabiria", "Barry Lyndon"], answer: "Edward Scissorhands", cat: "director", detail: "Tim Burton directed Edward Scissorhands" },
  { q: "Which of these was NOT directed by Asghar Farhadi?", options: ["Million Dollar Baby", "A Separation", "The Salesman"], answer: "Million Dollar Baby", cat: "director", detail: "Million Dollar Baby was not a Asghar Farhadi film" },
  { q: "Which of these was directed by Sofia Coppola?", options: ["Somewhere", "Batman Returns", "Phantom Thread", "The Godfather"], answer: "Somewhere", cat: "director", detail: "Sofia Coppola directed Somewhere" },
  { q: "Who directed Us?", options: ["Jordan Peele", "Alfred Hitchcock", "David Fincher", "Robert Zemeckis"], answer: "Jordan Peele", cat: "director", detail: "Jordan Peele's Us" },
  { q: "Who directed Parasite?", options: ["Bong Joon-ho", "Alejandro González Iñárritu", "Alfred Hitchcock", "Martin Scorsese"], answer: "Bong Joon-ho", cat: "director", detail: "Bong Joon-ho's Parasite" },
  { q: "Who directed both Punch-Drunk Love and Phantom Thread?", options: ["Paul Thomas Anderson", "Clint Eastwood", "Alejandro González Iñárritu", "François Truffaut"], answer: "Paul Thomas Anderson", cat: "director", detail: "Both are Paul Thomas Anderson films" },
  { q: "Which of these was directed by Francis Ford Coppola?", options: ["The Conversation", "Parallel Mothers", "Goodbye to Language", "All About My Mother"], answer: "The Conversation", cat: "director", detail: "Francis Ford Coppola directed The Conversation" },
  { q: "Which of these was NOT directed by Danny Boyle?", options: ["Moonlight", "28 Days Later", "Trainspotting", "Steve Jobs"], answer: "Moonlight", cat: "director", detail: "Moonlight was not a Danny Boyle film" },
  { q: "Which of these was NOT directed by Alfonso Cuarón?", options: ["Blood Simple", "Y Tu Mamá También", "Children of Men", "Harry Potter and the Prisoner of Azkaban"], answer: "Blood Simple", cat: "director", detail: "Blood Simple was not a Alfonso Cuarón film" },
  { q: "Which of these was directed by Clint Eastwood?", options: ["Unforgiven", "The New World", "Avatar", "Somewhere"], answer: "Unforgiven", cat: "director", detail: "Clint Eastwood directed Unforgiven" },
  { q: "Which of these was directed by Damien Chazelle?", options: ["Babylon", "Rope", "The Revenant", "A Hero"], answer: "Babylon", cat: "director", detail: "Damien Chazelle directed Babylon" },
  { q: "Which of these was NOT directed by Quentin Tarantino?", options: ["Parallel Mothers", "The Hateful Eight", "Inglourious Basterds", "Django Unchained"], answer: "Parallel Mothers", cat: "director", detail: "Parallel Mothers was not a Quentin Tarantino film" },
  { q: "Which of these was directed by Danny Boyle?", options: ["127 Hours", "The Hateful Eight", "Black Hawk Down", "The Thin Red Line"], answer: "127 Hours", cat: "director", detail: "Danny Boyle directed 127 Hours" },
  { q: "Who directed Memories of Murder?", options: ["Bong Joon-ho", "Spike Jonze", "François Truffaut", "Guillermo del Toro"], answer: "Bong Joon-ho", cat: "director", detail: "Bong Joon-ho's Memories of Murder" },
  { q: "Which of these was NOT directed by Robert Zemeckis?", options: ["In the Mood for Love", "Forrest Gump", "Back to the Future", "Cast Away"], answer: "In the Mood for Love", cat: "director", detail: "In the Mood for Love was not a Robert Zemeckis film" },
  { q: "Who directed Breathless?", options: ["Jean-Luc Godard", "Michael Haneke", "Roman Polanski", "Ingmar Bergman"], answer: "Jean-Luc Godard", cat: "director", detail: "Jean-Luc Godard's Breathless" },
  { q: "Who directed 127 Hours?", options: ["Danny Boyle", "Spike Lee", "Ridley Scott", "Guillermo del Toro"], answer: "Danny Boyle", cat: "director", detail: "Danny Boyle's 127 Hours" },
  { q: "Which of these was NOT directed by Jordan Peele?", options: ["Lost Highway", "Get Out", "Nope"], answer: "Lost Highway", cat: "director", detail: "Lost Highway was not a Jordan Peele film" },
  { q: "Who directed The Big Lebowski?", options: ["Coen Brothers", "Andrei Tarkovsky", "Pedro Almodóvar", "Wes Anderson"], answer: "Coen Brothers", cat: "director", detail: "Coen Brothers's The Big Lebowski" },
  { q: "Who directed both Memories of Murder and Snowpiercer?", options: ["Bong Joon-ho", "Sam Mendes", "Michael Mann", "Jean-Luc Godard"], answer: "Bong Joon-ho", cat: "director", detail: "Both are Bong Joon-ho films" },
  { q: "Which of these was directed by Alfonso Cuarón?", options: ["Harry Potter and the Prisoner of Azkaban", "Avatar", "Adaptation", "A Brighter Summer Day"], answer: "Harry Potter and the Prisoner of Azkaban", cat: "director", detail: "Alfonso Cuarón directed Harry Potter and the Prisoner of Azkaban" },
  { q: "Which of these was directed by François Truffaut?", options: ["The 400 Blows", "All About My Mother", "The Constant Gardener", "Terminator 2"], answer: "The 400 Blows", cat: "director", detail: "François Truffaut directed The 400 Blows" },
  { q: "Which of these was directed by Francis Ford Coppola?", options: ["The Godfather Part II", "Gladiator", "Back to the Future", "Avatar"], answer: "The Godfather Part II", cat: "director", detail: "Francis Ford Coppola directed The Godfather Part II" },
  { q: "Who directed Beetlejuice?", options: ["Tim Burton", "Asghar Farhadi", "Ang Lee", "Sam Mendes"], answer: "Tim Burton", cat: "director", detail: "Tim Burton's Beetlejuice" },
  { q: "Who directed Snowpiercer?", options: ["Bong Joon-ho", "Quentin Tarantino", "Steven Spielberg", "Alejandro González Iñárritu"], answer: "Bong Joon-ho", cat: "director", detail: "Bong Joon-ho's Snowpiercer" },
  { q: "Which of these was directed by Bong Joon-ho?", options: ["Mother", "Caché", "The 400 Blows", "Rosemary's Baby"], answer: "Mother", cat: "director", detail: "Bong Joon-ho directed Mother" },
  { q: "Who directed Y Tu Mamá También?", options: ["Alfonso Cuarón", "Quentin Tarantino", "François Truffaut", "Jean-Luc Godard"], answer: "Alfonso Cuarón", cat: "director", detail: "Alfonso Cuarón's Y Tu Mamá También" },
  { q: "Who directed Unforgiven?", options: ["Clint Eastwood", "Andrei Tarkovsky", "Lars von Trier", "Jordan Peele"], answer: "Clint Eastwood", cat: "director", detail: "Clint Eastwood's Unforgiven" },
  { q: "Who directed Crouching Tiger Hidden Dragon?", options: ["Ang Lee", "James Cameron", "Sam Mendes", "Paul Thomas Anderson"], answer: "Ang Lee", cat: "director", detail: "Ang Lee's Crouching Tiger Hidden Dragon" },
  { q: "Which of these was NOT directed by Edward Yang?", options: ["Castle in the Sky", "A Brighter Summer Day", "Yi Yi"], answer: "Castle in the Sky", cat: "director", detail: "Castle in the Sky was not a Edward Yang film" },,
  { q: "\"What's in the box?!\"", options: ["Se7en", "The Silence of the Lambs", "Zodiac", "Memento"], answer: "Se7en", cat: "quote", detail: "Brad Pitt's desperate cry" },
  { q: "\"Carpe diem. Seize the day, boys.\"", options: ["Dead Poets Society", "Good Will Hunting", "Stand and Deliver", "Mr. Holland's Opus"], answer: "Dead Poets Society", cat: "quote", detail: "Robin Williams as Mr. Keating" },
  { q: "\"I coulda been a contender.\"", options: ["On the Waterfront", "Raging Bull", "Rocky", "Cinderella Man"], answer: "On the Waterfront", cat: "quote", detail: "Brando's backseat confession" },
  { q: "\"As far back as I can remember, I always wanted to be a gangster.\"", options: ["Goodfellas", "The Godfather", "Scarface", "Casino"], answer: "Goodfellas", cat: "quote", detail: "Ray Liotta's opening narration" },
  { q: "\"Here's to looking at you, kid\" is from which classic?", options: ["Casablanca", "The Maltese Falcon", "The Big Sleep", "Key Largo"], answer: "Casablanca", cat: "quote", detail: "Bogart to Bergman" },
  { q: "\"Toto, I've a feeling we're not in Kansas anymore.\"", options: ["The Wizard of Oz", "Twister", "E.T.", "Alice in Wonderland"], answer: "The Wizard of Oz", cat: "quote", detail: "Dorothy arriving in Oz" },
  { q: "\"Leave the gun. Take the cannoli.\"", options: ["The Godfather", "Goodfellas", "The Godfather Part II", "Casino"], answer: "The Godfather", cat: "quote", detail: "Clemenza's casual order" },
  { q: "\"You make me want to be a better man.\"", options: ["As Good as It Gets", "Jerry Maguire", "Good Will Hunting", "The Notebook"], answer: "As Good as It Gets", cat: "quote", detail: "Jack Nicholson to Helen Hunt" },
  { q: "\"I'm not bad. I'm just drawn that way.\"", options: ["Who Framed Roger Rabbit", "Cool World", "Space Jam", "Toy Story"], answer: "Who Framed Roger Rabbit", cat: "quote", detail: "Jessica Rabbit's famous defense" },
  { q: "\"I'm mad as hell, and I'm not going to take this anymore!\"", options: ["Network", "Taxi Driver", "Dog Day Afternoon", "Serpico"], answer: "Network", cat: "quote", detail: "Peter Finch as Howard Beale" },
  { q: "\"Elementary, my dear Watson.\"", options: ["The Adventures of Sherlock Holmes", "A Study in Terror", "Young Sherlock Holmes", "Sherlock Holmes (2009)"], answer: "The Adventures of Sherlock Holmes", cat: "quote", detail: "Basil Rathbone as Holmes (1939)" },
  { q: "\"We're on a mission from God.\"", options: ["The Blues Brothers", "Monty Python and the Holy Grail", "Life of Brian", "Sister Act"], answer: "The Blues Brothers", cat: "quote", detail: "Dan Aykroyd and John Belushi" },
  { q: "\"Show me the money!\"", options: ["Jerry Maguire", "Wall Street", "The Wolf of Wall Street", "Boiler Room"], answer: "Jerry Maguire", cat: "quote", detail: "Cuba Gooding Jr.'s Oscar-winning line" },
  { q: "\"Here's to swimmin' with bow-legged women.\"", options: ["Jaws", "The Perfect Storm", "Master and Commander", "Captain Phillips"], answer: "Jaws", cat: "quote", detail: "Robert Shaw as Quint" },
  { q: "\"Are you not entertained?!\"", options: ["Gladiator", "300", "Troy", "Ben-Hur"], answer: "Gladiator", cat: "quote", detail: "Russell Crowe as Maximus" },
  { q: "\"Get busy living, or get busy dying.\"", options: ["The Shawshank Redemption", "Forrest Gump", "Dead Man Walking", "The Green Mile"], answer: "The Shawshank Redemption", cat: "quote", detail: "Tim Robbins as Andy Dufresne" },
  { q: "\"I ate his liver with some fava beans and a nice Chianti.\"", options: ["The Silence of the Lambs", "Hannibal", "Se7en", "American Psycho"], answer: "The Silence of the Lambs", cat: "quote", detail: "Hopkins as Lecter" },
  { q: "\"Do I feel lucky? Well, do ya, punk?\"", options: ["Dirty Harry", "Bullitt", "The French Connection", "Serpico"], answer: "Dirty Harry", cat: "quote", detail: "Clint Eastwood's iconic dare" },
  { q: "\"I'm gonna steal the Declaration of Independence.\"", options: ["National Treasure", "The Da Vinci Code", "Indiana Jones", "Sahara"], answer: "National Treasure", cat: "quote", detail: "Nicolas Cage's ridiculous plan" },
  { q: "\"You want the truth? You can't handle the truth!\"", options: ["A Few Good Men", "The Firm", "Primal Fear", "The Verdict"], answer: "A Few Good Men", cat: "quote", detail: "Nicholson's courtroom explosion" },
  { q: "What is the Rosebud in Citizen Kane?", options: ["A sled", "A painting", "A woman", "A horse"], answer: "A sled", cat: "trivia", detail: "Kane's childhood sled" },
  { q: "How long did it take to film Boyhood?", options: ["12 years", "8 years", "6 years", "15 years"], answer: "12 years", cat: "trivia", detail: "Filmed 2002-2013 with the same cast" },
  { q: "What real hotel inspired The Shining's Overlook?", options: ["The Stanley Hotel", "The Roosevelt Hotel", "The Cecil Hotel", "The Plaza Hotel"], answer: "The Stanley Hotel", cat: "trivia", detail: "In Estes Park, Colorado" },
  { q: "What is the fictional drug in Limitless?", options: ["NZT-48", "CPH4", "Soma", "Substance D"], answer: "NZT-48", cat: "trivia", detail: "The brain-enhancing pill" },
  { q: "How many Academy Awards did Ben-Hur (1959) win?", options: ["11", "8", "10", "9"], answer: "11", cat: "trivia", detail: "Tied the record held until Titanic and Return of the King" },
  { q: "What board game is featured in Jumanji?", options: ["A fictional jungle board game", "Monopoly", "Risk", "Clue"], answer: "A fictional jungle board game", cat: "trivia", detail: "\"Jumanji\" means \"many effects\" in Zulu" },
  { q: "What was the first film to gross $1 billion worldwide?", options: ["Titanic", "Jurassic Park", "The Lord of the Rings: Return of the King", "Star Wars: The Phantom Menace"], answer: "Titanic", cat: "trivia", detail: "In 1998, the first to cross $1B" },
  { q: "What Alfred Hitchcock film is set entirely in one apartment?", options: ["Rear Window", "Rope", "Vertigo", "Psycho"], answer: "Rear Window", cat: "trivia", detail: "Stewart watches neighbors from his wheelchair" },
  { q: "In Pulp Fiction, what dance do Mia and Vincent do?", options: ["The Twist", "The Tango", "The Waltz", "The Charleston"], answer: "The Twist", cat: "trivia", detail: "At Jack Rabbit Slim's restaurant" },
  { q: "What color is the pill Neo takes in The Matrix?", options: ["Red", "Blue", "Green", "White"], answer: "Red", cat: "trivia", detail: "\"You take the red pill, you stay in Wonderland\"" },
  { q: "How many takes did Kubrick demand for the bat scene in The Shining?", options: ["127", "50", "70", "35"], answer: "127", cat: "trivia", detail: "A legendary example of Kubrick's perfectionism" },
  { q: "Which body part does Vincent Vega accidentally shoot in Pulp Fiction?", options: ["Marvin's head", "Marvin's arm", "Marvin's leg", "Marvin's hand"], answer: "Marvin's head", cat: "trivia", detail: "\"Aw man, I shot Marvin in the face\"" },
  { q: "What is the name of the computer in 2001: A Space Odyssey?", options: ["HAL 9000", "WOPR", "Skynet", "Mother"], answer: "HAL 9000", cat: "trivia", detail: "Each letter one step before IBM" },
  { q: "What real serial killer inspired Psycho's Norman Bates?", options: ["Ed Gein", "Ted Bundy", "John Wayne Gacy", "Jeffrey Dahmer"], answer: "Ed Gein", cat: "trivia", detail: "Gein also inspired Leatherface and Buffalo Bill" },
  { q: "How many cuts are in the Psycho shower scene?", options: ["About 70", "About 30", "About 50", "About 90"], answer: "About 70", cat: "trivia", detail: "78 camera setups for 45 seconds of footage" },
  { q: "Which director insisted on using only natural light for Barry Lyndon?", options: ["Stanley Kubrick", "Terrence Malick", "Andrei Tarkovsky", "Werner Herzog"], answer: "Stanley Kubrick", cat: "bts", detail: "Used NASA lenses to film by candlelight" },
  { q: "What famous actor was almost cast as Han Solo before Harrison Ford?", options: ["Kurt Russell", "Burt Reynolds", "Nick Nolte", "Al Pacino"], answer: "Kurt Russell", cat: "bts", detail: "Lucas auditioned many actors" },
  { q: "Which film required building a full-size ship that could break in half?", options: ["Titanic", "Master and Commander", "The Perfect Storm", "Dunkirk"], answer: "Titanic", cat: "bts", detail: "Cameron built a 90% scale replica" },
  { q: "What did Kubrick make Shelley Duvall do 127 times in The Shining?", options: ["Swing a baseball bat while crying", "Run up the stairs", "Scream at the door", "Type a page"], answer: "Swing a baseball bat while crying", cat: "bts", detail: "A Guinness record for most takes of one scene" },
  { q: "Which director once ate a shoe after losing a bet?", options: ["Werner Herzog", "Lars von Trier", "David Lynch", "Alejandro Jodorowsky"], answer: "Werner Herzog", cat: "bts", detail: "He bet Errol Morris couldn't finish Gates of Heaven" },
  { q: "What technique made the long takes in 1917 appear seamless?", options: ["Hidden cuts disguised by camera movements", "One continuous shot", "CGI stitching", "Multiple cameras filming simultaneously"], answer: "Hidden cuts disguised by camera movements", cat: "bts", detail: "Roger Deakins's Oscar-winning cinematography" },
  { q: "Which actor nearly died filming a stunt for The Crow?", options: ["Brandon Lee was killed", "Michael Biehn", "Jean-Claude Van Damme", "Dolph Lundgren"], answer: "Brandon Lee was killed", cat: "bts", detail: "A prop gun accident during filming in 1993" },
  { q: "How did they create the bullet-time effect in The Matrix?", options: ["120 still cameras in a circle", "CGI only", "High-speed film cameras", "Stop-motion photography"], answer: "120 still cameras in a circle", cat: "bts", detail: "Each camera fired in sequence" },
  { q: "Which film was shot in reverse chronological order to disorient the audience?", options: ["Memento", "Pulp Fiction", "Irreversible", "21 Grams"], answer: "Memento", cat: "bts", detail: "Nolan filmed scenes in order but edited them backwards" },
  { q: "What prop from Casablanca was sold for $154,000 at auction?", options: ["The piano", "Rick's fedora", "The letters of transit", "A champagne glass"], answer: "The piano", cat: "bts", detail: "\"Play it again, Sam\" piano (though Sam never says that exact line)" },
  { q: "Why did Kubrick withdraw A Clockwork Orange from UK cinemas?", options: ["After receiving death threats over copycat violence", "It was banned by the censors", "He was unhappy with the print quality", "The studio pulled it for financial reasons"], answer: "After receiving death threats over copycat violence", cat: "bts", detail: "Withdrawn from 1973 until after his death in 1999" },
  { q: "Which film's set was so large it had its own zip code?", options: ["Cleopatra (1963)", "Ben-Hur", "Titanic", "The Ten Commandments"], answer: "Cleopatra (1963)", cat: "bts", detail: "The most expensive film ever made at the time" },
  { q: "What real phenomenon inspired the sound design of Inception?", options: ["Edith Piaf's song slowed down", "Whale songs", "Thunder recordings", "Reversed speech"], answer: "Edith Piaf's song slowed down", cat: "bts", detail: "Hans Zimmer based the BRAAAM on Non, je ne regrette rien" },
  { q: "Which Star Wars character was originally going to be played by a human in a suit?", options: ["Yoda (a monkey in a mask was tested)", "Chewbacca", "R2-D2", "Jabba the Hutt"], answer: "Yoda (a monkey in a mask was tested)", cat: "bts", detail: "They tried training a monkey before using a puppet" },
  { q: "What accident during filming shaped how Jaws turned out?", options: ["The mechanical shark kept breaking", "The boat sank", "An actor was injured", "Film reels were destroyed"], answer: "The mechanical shark kept breaking", cat: "bts", detail: "Spielberg had to hide the shark, making it scarier" },
  { q: "Who composed the Inception score?", options: ["Hans Zimmer", "John Williams", "Trent Reznor", "Thomas Newman"], answer: "Hans Zimmer", cat: "soundtrack", detail: "The famous BRAAAM" },
  { q: "Which film popularized \"Also sprach Zarathustra\" by Strauss?", options: ["2001: A Space Odyssey", "Apocalypse Now", "The Shining", "Barry Lyndon"], answer: "2001: A Space Odyssey", cat: "soundtrack", detail: "Kubrick's iconic opening" },
  { q: "Who composed the score for Schindler's List?", options: ["John Williams", "Hans Zimmer", "Ennio Morricone", "Thomas Newman"], answer: "John Williams", cat: "soundtrack", detail: "Itzhak Perlman performed the violin solos" },
  { q: "\"Stuck in the Middle with You\" accompanies which famous torture scene?", options: ["Reservoir Dogs", "Pulp Fiction", "Goodfellas", "A Clockwork Orange"], answer: "Reservoir Dogs", cat: "soundtrack", detail: "Mr. Blonde's ear-cutting dance" },
  { q: "Who composed The Good, the Bad and the Ugly's iconic theme?", options: ["Ennio Morricone", "John Williams", "Nino Rota", "Jerry Goldsmith"], answer: "Ennio Morricone", cat: "soundtrack", detail: "The wah-wah-wah whistling theme" },
  { q: "Which film uses \"Ride of the Valkyries\" during a helicopter attack?", options: ["Apocalypse Now", "Full Metal Jacket", "Platoon", "Black Hawk Down"], answer: "Apocalypse Now", cat: "soundtrack", detail: "Kilgore's morning napalm run" },
  { q: "Who composed the score for The Dark Knight?", options: ["Hans Zimmer and James Newton Howard", "John Williams", "Danny Elfman", "Howard Shore"], answer: "Hans Zimmer and James Newton Howard", cat: "soundtrack", detail: "The Joker's single sustained note" },
  { q: "Which film features \"A Clockwork Orange\" using Beethoven's 9th?", options: ["A Clockwork Orange", "The Shining", "2001: A Space Odyssey", "Eyes Wide Shut"], answer: "A Clockwork Orange", cat: "soundtrack", detail: "Alex's beloved \"Ludwig Van\"" },
  { q: "Who composed the Godfather waltz theme?", options: ["Nino Rota", "Ennio Morricone", "John Williams", "Henry Mancini"], answer: "Nino Rota", cat: "soundtrack", detail: "One of cinema's most recognizable themes" },
  { q: "\"Where Is My Mind?\" plays during which film's ending?", options: ["Fight Club", "Donnie Darko", "American Beauty", "Requiem for a Dream"], answer: "Fight Club", cat: "soundtrack", detail: "Pixies song as buildings collapse" },
  { q: "Which Tarantino film opens with Dick Dale's \"Misirlou\"?", options: ["Pulp Fiction", "Kill Bill", "Reservoir Dogs", "Django Unchained"], answer: "Pulp Fiction", cat: "soundtrack", detail: "The surf rock opening that kicks off the film" },
  { q: "Who composed the Interstellar organ score?", options: ["Hans Zimmer", "John Williams", "Alexandre Desplat", "Jóhann Jóhannsson"], answer: "Hans Zimmer", cat: "soundtrack", detail: "Recorded on a real church organ" },
  { q: "Which Best Picture winner has the lowest box office gross?", options: ["The Hurt Locker", "Moonlight", "The Artist", "Birdman"], answer: "The Hurt Locker", cat: "boxoffice", detail: "Only $17 million domestically" },
  { q: "What was the first film to earn $100 million domestically?", options: ["Jaws", "Star Wars", "E.T.", "The Godfather"], answer: "Jaws", cat: "boxoffice", detail: "In 1975, creating the summer blockbuster" },
  { q: "Which was the biggest box office bomb adjusted for inflation?", options: ["John Carter", "The Adventures of Pluto Nash", "Mars Needs Moms", "Cutthroat Island"], answer: "John Carter", cat: "boxoffice", detail: "Disney lost an estimated $200 million" },
  { q: "What was the highest-grossing R-rated film before Joker?", options: ["Deadpool", "The Matrix Reloaded", "It", "The Passion of the Christ"], answer: "Deadpool", cat: "boxoffice", detail: "$783 million worldwide in 2016" },
  { q: "Which film earned the most in a single opening weekend?", options: ["Avengers: Endgame", "Avengers: Infinity War", "Star Wars: The Force Awakens", "Spider-Man: No Way Home"], answer: "Avengers: Endgame", cat: "boxoffice", detail: "$357 million domestic opening in 2019" },
  { q: "What was the first film to earn $1 billion worldwide?", options: ["Titanic", "Jurassic Park", "Star Wars: The Phantom Menace", "The Lord of the Rings: Return of the King"], answer: "Titanic", cat: "boxoffice", detail: "In 1998" },
  { q: "Which film was the biggest flop of the 1980s?", options: ["Heaven's Gate", "Ishtar", "Howard the Duck", "The Adventures of Baron Munchausen"], answer: "Heaven's Gate", cat: "boxoffice", detail: "Nearly bankrupted United Artists" },
  { q: "How much did The Blair Witch Project cost to make?", options: ["About $60,000", "About $500,000", "About $1 million", "About $5 million"], answer: "About $60,000", cat: "boxoffice", detail: "Grossed $248 million worldwide" },
  { q: "Which Pixar film was their first box office disappointment?", options: ["The Good Dinosaur", "Cars 2", "Brave", "Onward"], answer: "The Good Dinosaur", cat: "boxoffice", detail: "Troubled production and underperformance in 2015" },
  { q: "What low-budget horror film launched a franchise and earned 300x its budget?", options: ["Saw", "Paranormal Activity", "The Purge", "Insidious"], answer: "Saw", cat: "boxoffice", detail: "Made for $1.2 million, earned $103 million" },
  { q: "Which film won Best Picture despite getting booed at Cannes?", options: ["Pulp Fiction (it won the Palme d'Or, not booed)", "Crash", "The Artist", "Green Book"], answer: "Crash", cat: "oscar", detail: "The controversial 2006 win over Brokeback Mountain" },
  { q: "Who refused their Best Actor Oscar?", options: ["Marlon Brando", "George C. Scott", "Both Brando and Scott", "Jack Nicholson"], answer: "Both Brando and Scott", cat: "oscar", detail: "Scott (1971) and Brando (1973) both declined" },
  { q: "Which film won all 11 Oscars it was nominated for?", options: ["The Lord of the Rings: Return of the King", "Titanic", "Ben-Hur", "West Side Story"], answer: "The Lord of the Rings: Return of the King", cat: "oscar", detail: "A perfect 11-for-11 sweep in 2004" },
  { q: "Who won Best Supporting Actor for Django Unchained?", options: ["Christoph Waltz", "Leonardo DiCaprio", "Samuel L. Jackson", "Jamie Foxx"], answer: "Christoph Waltz", cat: "oscar", detail: "Waltz's second Tarantino/Oscar combo" },
  { q: "Which Best Picture winner was later revealed to have a widespread abuse scandal?", options: ["Crash (Harvey Weinstein produced it)", "Shakespeare in Love", "The Artist", "Chicago"], answer: "Shakespeare in Love", cat: "oscar", detail: "Weinstein's aggressive Oscar campaign became notorious" },
  { q: "Who won Best Actress for La La Land... wait, Moonlight?", options: ["Neither — Emma Stone won Actress, Moonlight won Picture", "Emma Stone for Moonlight", "Naomie Harris for Moonlight", "Neither won"], answer: "Neither — Emma Stone won Actress, Moonlight won Picture", cat: "oscar", detail: "The infamous envelope mix-up at the 2017 ceremony" },
  { q: "Who has been nominated for Best Director the most times?", options: ["Martin Scorsese", "Steven Spielberg", "William Wyler", "John Ford"], answer: "Martin Scorsese", cat: "oscar", detail: "Scorsese has 9+ nominations" },
  { q: "What was the first sequel to win Best Picture?", options: ["The Godfather Part II", "The Lord of the Rings: Return of the King", "The Silence of the Lambs", "Rocky"], answer: "The Godfather Part II", cat: "oscar", detail: "Won in 1975" },
  { q: "Which animated film won a non-animated Oscar?", options: ["Spirited Away (Best Animated Feature)", "Beauty and the Beast (nominated for Best Picture)", "Toy Story (nominated for Screenplay)", "Up (nominated for Best Picture)"], answer: "Toy Story (nominated for Screenplay)", cat: "oscar", detail: "First animated film nominated for Best Original Screenplay" },
  { q: "Who won Best Director for their debut feature film?", options: ["Sam Mendes for American Beauty", "Robert Redford for Ordinary People", "Kevin Costner for Dances with Wolves", "All three"], answer: "All three", cat: "oscar", detail: "All won Best Director with their first films" },
  { q: "Who played the young Vito Corleone in The Godfather Part II?", options: ["Robert De Niro", "Al Pacino", "James Caan", "John Cazale"], answer: "Robert De Niro", cat: "cast", detail: "De Niro won the Oscar for the role" },
  { q: "Who played both Gollum and King Kong via motion capture?", options: ["Andy Serkis", "Mark Ruffalo", "Josh Brolin", "Benedict Cumberbatch"], answer: "Andy Serkis", cat: "cast", detail: "The pioneer of performance capture acting" },
  { q: "Who was originally cast as Marty McFly before Michael J. Fox?", options: ["Eric Stoltz", "Robert Downey Jr.", "Johnny Depp", "Sean Penn"], answer: "Eric Stoltz", cat: "cast", detail: "Stoltz filmed for weeks before being replaced" },
  { q: "Which actor appeared in every Quentin Tarantino film from 1992 to 2003?", options: ["Samuel L. Jackson", "Harvey Keitel", "Uma Thurman", "Tim Roth"], answer: "Samuel L. Jackson", cat: "cast", detail: "From Pulp Fiction through Kill Bill" },
  { q: "Who played both Thor and in Furiosa?", options: ["Chris Hemsworth", "Tom Hardy", "Idris Elba", "Oscar Isaac"], answer: "Chris Hemsworth", cat: "cast", detail: "Hemsworth played Dementus in Furiosa (2024)" },
  { q: "Who played Daniel Plainview in There Will Be Blood?", options: ["Daniel Day-Lewis", "Javier Bardem", "Philip Seymour Hoffman", "Tommy Lee Jones"], answer: "Daniel Day-Lewis", cat: "cast", detail: "Day-Lewis's second of three Best Actor Oscars" },
  { q: "Who was the first choice for Neo in The Matrix before Keanu Reeves?", options: ["Will Smith", "Brad Pitt", "Nicolas Cage", "Johnny Depp"], answer: "Will Smith", cat: "cast", detail: "Smith chose Wild Wild West instead" },
  { q: "Which actor appeared in both Goodfellas and Home Alone?", options: ["Joe Pesci", "Ray Liotta", "Robert De Niro", "Daniel Stern"], answer: "Joe Pesci", cat: "cast", detail: "Both released in 1990" },
  { q: "Who played the dual role in The Parent Trap (1998)?", options: ["Lindsay Lohan", "Mary-Kate and Ashley Olsen", "Hilary Duff", "Amanda Bynes"], answer: "Lindsay Lohan", cat: "cast", detail: "Lohan played both twins at age 11" },
  { q: "Which actor has died in the most on-screen deaths?", options: ["Sean Bean", "John Hurt", "Gary Oldman", "Liam Neeson"], answer: "Sean Bean", cat: "cast", detail: "Boromir, Ned Stark, and many more" },
  { q: "Who played Hannibal Lecter in Manhunter (1986), before Anthony Hopkins?", options: ["Brian Cox", "Jeremy Irons", "Christopher Walken", "Malcolm McDowell"], answer: "Brian Cox", cat: "cast", detail: "Michael Mann's earlier adaptation of Red Dragon" },
  { q: "Who turned down the role of Forrest Gump before Tom Hanks?", options: ["John Travolta", "Bill Murray", "Chevy Chase", "Robin Williams"], answer: "John Travolta", cat: "cast", detail: "Travolta has called it his biggest regret" }
];

const HARD_QUESTIONS = [
{ q: "Who played Daniel Plainview in There Will Be Blood?", options: ["Daniel Day-Lewis", "Peter Finch", "Morgan Freeman", "Hugh Jackman"], answer: "Daniel Day-Lewis", cat: "cast", detail: "Daniel Day-Lewis in There Will Be Blood" },
  { q: "Who played Tommy DeVito in Goodfellas?", options: ["Joe Pesci", "Toshiro Mifune", "Robert Downey Jr.", "Takashi Shimura"], answer: "Joe Pesci", cat: "cast", detail: "Joe Pesci in Goodfellas" },
  { q: "Who played Freddie Quell in The Master?", options: ["Joaquin Phoenix", "Marlon Brando", "Christian Bale", "Ralph Fiennes"], answer: "Joaquin Phoenix", cat: "cast", detail: "Joaquin Phoenix in The Master" },
  { q: "Who played Gandhi in Gandhi?", options: ["Ben Kingsley", "Marcello Mastroianni", "Brad Pitt", "Matt Damon"], answer: "Ben Kingsley", cat: "cast", detail: "Ben Kingsley in Gandhi" },
  { q: "Who played Jake Gittes in Chinatown?", options: ["Jack Nicholson", "Tom Hanks", "Takashi Shimura", "Jean Seberg"], answer: "Jack Nicholson", cat: "cast", detail: "Jack Nicholson in Chinatown" },
  { q: "Who played Colonel Kurtz in Apocalypse Now?", options: ["Marlon Brando", "Choi Min-sik", "Bruno Ganz", "Charlize Theron"], answer: "Marlon Brando", cat: "cast", detail: "Marlon Brando in Apocalypse Now" },
  { q: "Who played Howard Beale in Network?", options: ["Peter Finch", "Joe Pesci", "Morgan Freeman", "Johnny Depp"], answer: "Peter Finch", cat: "cast", detail: "Peter Finch in Network" },
  { q: "Who played Aguirre in Aguirre, the Wrath of God?", options: ["Klaus Kinski", "Heath Ledger", "Jeff Bridges", "Lamberto Maggiorani"], answer: "Klaus Kinski", cat: "cast", detail: "Klaus Kinski in Aguirre, the Wrath of God" },
  { q: "Who played General Washizu in Throne of Blood?", options: ["Toshiro Mifune", "Ian McKellen", "Natalie Portman", "Leonardo DiCaprio"], answer: "Toshiro Mifune", cat: "cast", detail: "Toshiro Mifune in Throne of Blood" },
  { q: "Who played Kanji Watanabe in Ikiru?", options: ["Takashi Shimura", "Ben Kingsley", "Bernard Lee", "Rosamund Pike"], answer: "Takashi Shimura", cat: "cast", detail: "Takashi Shimura in Ikiru" },
  { q: "Who played Patricia Franchini in Breathless?", options: ["Jean Seberg", "Keanu Reeves", "Arnold Schwarzenegger", "Ian McKellen"], answer: "Jean Seberg", cat: "cast", detail: "Jean Seberg in Breathless" },
  { q: "Who played Mario in The Wages of Fear?", options: ["Yves Montand", "Dustin Hoffman", "Daniel Day-Lewis", "Harrison Ford"], answer: "Yves Montand", cat: "cast", detail: "Yves Montand in The Wages of Fear" },
  { q: "Who played Count Orlok in Nosferatu?", options: ["Max Schreck", "Choi Min-sik", "Ralph Fiennes", "Natalie Portman"], answer: "Max Schreck", cat: "cast", detail: "Max Schreck in Nosferatu" },
  { q: "Who played Octavio in Amores Perros?", options: ["Gael García Bernal", "Joaquin Phoenix", "Leonardo DiCaprio", "Charlize Theron"], answer: "Gael García Bernal", cat: "cast", detail: "Gael García Bernal in Amores Perros" },
  { q: "Who played Joan of Arc in The Passion of Joan of Arc?", options: ["Maria Falconetti", "Peter Finch", "Harrison Ford", "Yves Montand"], answer: "Maria Falconetti", cat: "cast", detail: "Maria Falconetti in The Passion of Joan of Arc" },
  { q: "Who played M in the original Bond films?", options: ["Bernard Lee", "Margot Robbie", "Klaus Kinski", "Song Kang-ho"], answer: "Bernard Lee", cat: "cast", detail: "Bernard Lee in the original Bond films" },
  { q: "Who played Antonio Ricci in Bicycle Thieves?", options: ["Lamberto Maggiorani", "Toshiro Mifune", "Tom Cruise", "Anthony Hopkins"], answer: "Lamberto Maggiorani", cat: "cast", detail: "Lamberto Maggiorani in Bicycle Thieves" },
  { q: "Who played Ki-taek in Parasite?", options: ["Song Kang-ho", "Daniel Day-Lewis", "Anthony Hopkins", "Lamberto Maggiorani"], answer: "Song Kang-ho", cat: "cast", detail: "Song Kang-ho in Parasite" },
  { q: "Who played Adolf Hitler in Downfall?", options: ["Bruno Ganz", "Tom Hanks", "Daniel Radcliffe", "Gael García Bernal"], answer: "Bruno Ganz", cat: "cast", detail: "Bruno Ganz in Downfall" },
  { q: "Who played Oh Dae-su in Oldboy?", options: ["Choi Min-sik", "Liam Neeson", "Peter Finch", "Andy Serkis"], answer: "Choi Min-sik", cat: "cast", detail: "Choi Min-sik in Oldboy" },
  { q: "Who played Chow Mo-wan in In the Mood for Love?", options: ["Tony Leung", "Jodie Foster", "Robert Downey Jr.", "Anthony Hopkins"], answer: "Tony Leung", cat: "cast", detail: "Tony Leung in In the Mood for Love" },
  { q: "Who played Guido Anselmi in 8½?", options: ["Marcello Mastroianni", "Jean-Pierre Léaud", "Jodie Foster", "Choi Min-sik"], answer: "Marcello Mastroianni", cat: "cast", detail: "Marcello Mastroianni in 8½" },
  { q: "Who played Antoine Doinel in The 400 Blows?", options: ["Jean-Pierre Léaud", "Johnny Depp", "Tom Hanks", "Ian McKellen"], answer: "Jean-Pierre Léaud", cat: "cast", detail: "Jean-Pierre Léaud in The 400 Blows" },
  { q: "\"Forget it, Jake. It's Chinatown.\"", options: ["Chinatown", "E.T.", "Annie Hall", "Toy Story"], answer: "Chinatown", cat: "quote", detail: "Devastating final line (1974)" },
  { q: "\"The stuff that dreams are made of.\"", options: ["The Maltese Falcon", "Network", "The Big Lebowski", "The Dark Knight"], answer: "The Maltese Falcon", cat: "quote", detail: "Bogart's final line" },
  { q: "\"I am big. It's the pictures that got small.\"", options: ["Sunset Boulevard", "Wayne's World", "Citizen Kane", "Top Gun"], answer: "Sunset Boulevard", cat: "quote", detail: "Swanson as Norma Desmond" },
  { q: "\"What we've got here is failure to communicate.\"", options: ["Cool Hand Luke", "E.T.", "Jaws", "Citizen Kane"], answer: "Cool Hand Luke", cat: "quote", detail: "Strother Martin's famous line" },
  { q: "\"I've seen things you people wouldn't believe.\"", options: ["Blade Runner", "Clerks", "Fight Club", "The Dark Knight"], answer: "Blade Runner", cat: "quote", detail: "Hauer's 'Tears in Rain'" },
  { q: "\"I love the smell of napalm in the morning.\"", options: ["Apocalypse Now", "Finding Nemo", "Blade Runner", "The Wizard of Oz"], answer: "Apocalypse Now", cat: "quote", detail: "Duvall as Kilgore" },
  { q: "\"Of all the gin joints in all the towns in all the world, she walks into mine.\"", options: ["Casablanca", "There Will Be Blood", "Cool Hand Luke", "Avatar"], answer: "Casablanca", cat: "quote", detail: "Rick lamenting Ilsa" },
  { q: "\"Louis, I think this is the beginning of a beautiful friendship.\"", options: ["Casablanca", "The Wizard of Oz", "Cool Hand Luke", "Finding Nemo"], answer: "Casablanca", cat: "quote", detail: "The final line" },
  { q: "\"All those moments will be lost in time, like tears in rain.\"", options: ["Blade Runner", "Frankenstein", "The Godfather", "A Few Good Men"], answer: "Blade Runner", cat: "quote", detail: "Hauer partly ad-libbed this" },
  { q: "\"I'm mad as hell, and I'm not going to take this anymore!\"", options: ["Network", "The Terminator", "The Godfather Part II", "Cool Hand Luke"], answer: "Network", cat: "quote", detail: "Peter Finch as Howard Beale" },
  { q: "\"We'll always have Paris.\"", options: ["Casablanca", "Citizen Kane", "Jaws", "The Dark Knight"], answer: "Casablanca", cat: "quote", detail: "Bogart at the airport" },
  { q: "\"I coulda been a contender.\"", options: ["On the Waterfront", "Taxi Driver", "Casablanca", "Dirty Dancing"], answer: "On the Waterfront", cat: "quote", detail: "Brando in the back of the cab" },
  { q: "\"La-dee-da, la-dee-da.\"", options: ["Annie Hall", "Avatar", "Midnight Cowboy", "Blade Runner"], answer: "Annie Hall", cat: "quote", detail: "Diane Keaton's verbal tic" },
  { q: "\"A census taker once tried to test me. I ate his liver.\"", options: ["The Silence of the Lambs", "Finding Nemo", "There Will Be Blood", "Network"], answer: "The Silence of the Lambs", cat: "quote", detail: "Hopkins as Lecter" },
  { q: "Who won Best Director for The Hurt Locker?", options: ["Kathryn Bigelow", "James Cameron", "Quentin Tarantino", "Lee Daniels"], answer: "Kathryn Bigelow", cat: "oscar", detail: "First woman to win Best Director" },
  { q: "Which won Best Picture in 1999?", options: ["Shakespeare in Love", "Saving Private Ryan", "The Thin Red Line", "Life Is Beautiful"], answer: "Shakespeare in Love", cat: "oscar", detail: "Biggest Oscar upset" },
  { q: "How many Oscars has Meryl Streep won?", options: ["3", "2", "4", "5"], answer: "3", cat: "oscar", detail: "Kramer vs. Kramer, Sophie's Choice, Iron Lady" },
  { q: "Which beat Citizen Kane for Best Picture?", options: ["How Green Was My Valley", "The Maltese Falcon", "Suspicion", "Sergeant York"], answer: "How Green Was My Valley", cat: "oscar", detail: "Most debated Oscar result" },
  { q: "Who is the youngest Best Actress (Leading Role) winner?", options: ["Marlee Matlin", "Audrey Hepburn", "Jennifer Lawrence", "Jodie Foster"], answer: "Marlee Matlin", cat: "oscar", detail: "Won at 21" },
  { q: "Which won Best Picture without a Best Director nomination?", options: ["Driving Miss Daisy", "The Godfather", "Schindler's List", "Silence of the Lambs"], answer: "Driving Miss Daisy", cat: "oscar", detail: "Beresford wasn't nominated" },
  { q: "Who has the most Best Director Oscar wins?", options: ["John Ford", "Steven Spielberg", "William Wyler", "Frank Capra"], answer: "John Ford", cat: "oscar", detail: "Four wins" },
  { q: "Who was nominated the most without winning?", options: ["Peter O'Toole", "Glenn Close", "Amy Adams", "Albert Finney"], answer: "Peter O'Toole", cat: "oscar", detail: "8 nominations, 0 wins" },
  { q: "Which was the first animated Best Picture nominee?", options: ["Beauty and the Beast", "Up", "Toy Story 3", "The Lion King"], answer: "Beauty and the Beast", cat: "oscar", detail: "Disney's 1991 classic" },
  { q: "Who is the oldest Best Actor winner?", options: ["Anthony Hopkins", "Henry Fonda", "John Wayne", "George Burns"], answer: "Anthony Hopkins", cat: "oscar", detail: "Won at 83 for The Father" },
  { q: "Who won Best Actor for My Left Foot?", options: ["Daniel Day-Lewis", "Tom Cruise", "Robin Williams", "Morgan Freeman"], answer: "Daniel Day-Lewis", cat: "oscar", detail: "First of three Best Actors" },
  { q: "Which film has 11 noms and 0 wins?", options: ["The Turning Point", "The Color Purple", "Gangs of New York", "The Shawshank Redemption"], answer: "The Turning Point", cat: "oscar", detail: "Tied with The Color Purple" },
  { q: "Who won Best Supporting Actress for Vicky Cristina Barcelona?", options: ["Penélope Cruz", "Cate Blanchett", "Viola Davis", "Amy Adams"], answer: "Penélope Cruz", cat: "oscar", detail: "Cruz's first Oscar" },
  { q: "Which won Best Picture in 2008?", options: ["No Country for Old Men", "There Will Be Blood", "Juno", "Michael Clayton"], answer: "No Country for Old Men", cat: "oscar", detail: "The Coens' masterpiece" },
  { q: "Who won Best Actress for The Piano?", options: ["Holly Hunter", "Emma Thompson", "Angela Bassett", "Debra Winger"], answer: "Holly Hunter", cat: "oscar", detail: "Hunter's only Best Actress win" },
  { q: "Who won Best Director for Schindler's List?", options: ["Steven Spielberg", "Martin Scorsese", "Jane Campion", "Robert Altman"], answer: "Steven Spielberg", cat: "oscar", detail: "Spielberg's first Best Director" },
  { q: "How many times was Alfred Hitchcock nominated for Best Director?", options: ["5", "3", "7", "0"], answer: "5", cat: "oscar", detail: "He never won" },
  { q: "Which film's budget was reportedly spent mostly on drugs?", options: ["Easy Rider", "The French Connection", "Bonnie and Clyde", "Midnight Cowboy"], answer: "Easy Rider", cat: "trivia", detail: "So the legend goes..." },
  { q: "Which Hitchcock film is entirely one set?", options: ["Rope", "Rear Window", "Psycho", "Vertigo"], answer: "Rope", cat: "trivia", detail: "One continuous take" },
  { q: "Which features the fictional 'Red Apple' cigarettes?", options: ["Pulp Fiction", "Fight Club", "Trainspotting", "Requiem for a Dream"], answer: "Pulp Fiction", cat: "trivia", detail: "Tarantino's recurring brand" },
  { q: "First foreign-language Best Picture nominee?", options: ["Grand Illusion", "Z", "Crouching Tiger Hidden Dragon", "Amour"], answer: "Grand Illusion", cat: "trivia", detail: "Renoir's 1938 masterpiece" },
  { q: "Which classic was almost entirely improvised?", options: ["Shadows", "Easy Rider", "Mean Streets", "Eraserhead"], answer: "Shadows", cat: "trivia", detail: "Cassavetes' 1959 debut" },
  { q: "What is the MacGuffin in Pulp Fiction?", options: ["The briefcase", "The watch", "The adrenaline shot", "The dance trophy"], answer: "The briefcase", cat: "trivia", detail: "Contents never revealed" },
  { q: "What is the Kuleshov Effect?", options: ["Editing changes how we read an expression", "A lens distortion", "A color grading method", "A sound technique"], answer: "Editing changes how we read an expression", cat: "trivia", detail: "1920s montage experiment" },
  { q: "What does a 'Dutch angle' do?", options: ["Tilts camera to create unease", "Shoots from below", "Uses wide-angle lens", "Tracks from behind"], answer: "Tilts camera to create unease", cat: "trivia", detail: "From German Expressionism" },
  { q: "What is a 'oner'?", options: ["Scene in one continuous take", "Film shot in one day", "One-line improv", "Single-frame insert"], answer: "Scene in one continuous take", cat: "trivia", detail: "Goodfellas Copa shot, 1917" },
  { q: "Which Kurosawa film was remade as A Fistful of Dollars?", options: ["Yojimbo", "Seven Samurai", "Rashomon", "Hidden Fortress"], answer: "Yojimbo", cat: "trivia", detail: "Leone's remake led to a lawsuit" },
  { q: "Which technique did Citizen Kane popularize?", options: ["Deep focus cinematography", "Jump cuts", "Slow motion", "Split screen"], answer: "Deep focus cinematography", cat: "trivia", detail: "Gregg Toland's camera work" },
  { q: "What is 'diegetic' sound?", options: ["Sound within the film's world", "Post-production sound", "Background score", "Voiceover"], answer: "Sound within the film's world", cat: "trivia", detail: "Radio on screen vs. the score" },
  { q: "What is a 'Steadicam'?", options: ["Body-mounted stabilized camera", "Camera on tracks", "Handheld shaky cam", "Drone camera"], answer: "Body-mounted stabilized camera", cat: "trivia", detail: "Garrett Brown, debuted in Rocky (1976)" },
  { q: "What was the first film rated X that was later re-rated R?", options: ["A Clockwork Orange", "Taxi Driver", "The Exorcist", "Scarface"], answer: "A Clockwork Orange", cat: "trivia", detail: "Kubrick trimmed 30 seconds" },
  { q: "What is 'mise-en-scène'?", options: ["Everything arranged within the frame", "Camera movement", "Editing rhythm", "Sound design"], answer: "Everything arranged within the frame", cat: "trivia", detail: "French for 'placing on stage'" },
  { q: "What is a 'dolly zoom'?", options: ["Camera moves while zooming opposite direction", "Very fast zoom", "180-degree rotation", "Extreme close-up zoom"], answer: "Camera moves while zooming opposite direction", cat: "trivia", detail: "Made famous in Vertigo and Jaws" },
  { q: "What film popularized the 'Wilhelm scream'?", options: ["Distant Drums", "Star Wars", "Indiana Jones", "The Charge at Feather River"], answer: "Distant Drums", cat: "trivia", detail: "The 1951 Western originated it" },
  { q: "Who played Howard Ratner in Uncut Gems?", options: ["Adam Sandler", "Joaquin Phoenix", "Tony Leung", "Rosamund Pike"], answer: "Adam Sandler", cat: "cast", detail: "Adam Sandler in Uncut Gems" },
  { q: "Who played Carol Aird in Carol?", options: ["Cate Blanchett", "Joaquin Phoenix", "Marlon Brando", "Matt Damon"], answer: "Cate Blanchett", cat: "cast", detail: "Cate Blanchett in Carol" },
  { q: "Who played Sophie Zawistowski in Sophie's Choice?", options: ["Meryl Streep", "Joaquin Phoenix", "Choi Min-sik", "Jean Seberg"], answer: "Meryl Streep", cat: "cast", detail: "Meryl Streep in Sophie's Choice" },
  { q: "Who played Fern in Nomadland?", options: ["Frances McDormand", "Javier Bardem", "Uma Thurman", "Anthony Hopkins"], answer: "Frances McDormand", cat: "cast", detail: "Frances McDormand in Nomadland" },
  { q: "Who played Virginia Woolf in The Hours?", options: ["Nicole Kidman", "Heath Ledger", "Adrien Brody", "Peter Finch"], answer: "Nicole Kidman", cat: "cast", detail: "Nicole Kidman in The Hours" },
  { q: "Who played Hanna Schmitz in The Reader?", options: ["Kate Winslet", "Hugh Jackman", "Jack Nicholson", "Bruno Ganz"], answer: "Kate Winslet", cat: "cast", detail: "Kate Winslet in The Reader" },
  { q: "Who played Cool Hand Luke in Cool Hand Luke?", options: ["Paul Newman", "Joaquin Phoenix", "Natalie Portman", "Cillian Murphy"], answer: "Paul Newman", cat: "cast", detail: "Paul Newman in Cool Hand Luke" },
  { q: "Who played Virgil Hilts in The Great Escape?", options: ["Steve McQueen", "Robert Downey Jr.", "Keanu Reeves", "Toshiro Mifune"], answer: "Steve McQueen", cat: "cast", detail: "Steve McQueen in The Great Escape" },
  { q: "Who played L.B. Jefferies in Rear Window?", options: ["James Stewart", "Song Kang-ho", "Maria Falconetti", "Takashi Shimura"], answer: "James Stewart", cat: "cast", detail: "James Stewart in Rear Window" },
  { q: "Who played Sam Spade in The Maltese Falcon?", options: ["Humphrey Bogart", "Yves Montand", "Marlon Brando", "Liam Neeson"], answer: "Humphrey Bogart", cat: "cast", detail: "Humphrey Bogart in The Maltese Falcon" },
  { q: "Who played William Munny in Unforgiven?", options: ["Clint Eastwood", "Anthony Hopkins", "Liam Neeson", "Christian Bale"], answer: "Clint Eastwood", cat: "cast", detail: "Clint Eastwood in Unforgiven" },
  { q: "Who played Riggan Thomson in Birdman?", options: ["Michael Keaton", "Sigourney Weaver", "Christian Bale", "Javier Bardem"], answer: "Michael Keaton", cat: "cast", detail: "Michael Keaton in Birdman" },
  { q: "Who played Truman Capote in Capote?", options: ["Philip Seymour Hoffman", "Javier Bardem", "Choi Min-sik", "Lamberto Maggiorani"], answer: "Philip Seymour Hoffman", cat: "cast", detail: "Philip Seymour Hoffman in Capote" },
  { q: "Who played Lancaster Dodd in The Master?", options: ["Philip Seymour Hoffman", "Takashi Shimura", "Javier Bardem", "Choi Min-sik"], answer: "Philip Seymour Hoffman", cat: "cast", detail: "Philip Seymour Hoffman in The Master" },
  { q: "Who played Lee Chandler in Manchester by the Sea?", options: ["Casey Affleck", "Russell Crowe", "Bruno Ganz", "Jodie Foster"], answer: "Casey Affleck", cat: "cast", detail: "Casey Affleck in Manchester by the Sea" },
  { q: "Who played Rayon in Dallas Buyers Club?", options: ["Jared Leto", "Natalie Portman", "Marcello Mastroianni", "Christoph Waltz"], answer: "Jared Leto", cat: "cast", detail: "Jared Leto in Dallas Buyers Club" },
  { q: "Who played Dixon in Three Billboards Outside Ebbing, Missouri?", options: ["Sam Rockwell", "Charlize Theron", "Joaquin Phoenix", "Bernard Lee"], answer: "Sam Rockwell", cat: "cast", detail: "Sam Rockwell in Three Billboards Outside Ebbing, Missouri" },
  { q: "Who played Juan in Moonlight?", options: ["Mahershala Ali", "Russell Crowe", "Toshiro Mifune", "Yves Montand"], answer: "Mahershala Ali", cat: "cast", detail: "Mahershala Ali in Moonlight" },
  { q: "What does HAL stand for in 2001: A Space Odyssey?", options: ["Heuristically Programmed Algorithmic Computer", "Human Artificial Logic", "Hybrid Automated Lifeform", "Holographic Analytical Lexicon"], answer: "Heuristically Programmed Algorithmic Computer", cat: "trivia", detail: "Often rumored to be IBM shifted one letter" },
  { q: "In which film does a computer play tic-tac-toe to learn futility?", options: ["WarGames", "The Terminator", "2001: A Space Odyssey", "Tron"], answer: "WarGames", cat: "trivia", detail: "The WOPR plays itself" },
  { q: "What is the Voight-Kampff test used for?", options: ["Identifying replicants", "Testing intelligence", "Measuring empathy in humans", "Detecting lies"], answer: "Identifying replicants", cat: "trivia", detail: "Blade Runner's key plot device" },
  { q: "What is Hogwarts' sorting hat's first word in the books/films?", options: ["Hmm", "Gryffindor", "Welcome", "Ah"], answer: "Hmm", cat: "trivia", detail: "The hat deliberates before sorting" },
  { q: "Which company produced the Tyrell Corporation's replicants?", options: ["Tyrell Corporation itself", "Weyland-Yutani", "Cyberdyne", "Omni Consumer Products"], answer: "Tyrell Corporation itself", cat: "trivia", detail: "More human than human" },
  { q: "Who won Best Director for The Power of the Dog?", options: ["Jane Campion", "Kenneth Branagh", "Steven Spielberg", "Paul Thomas Anderson"], answer: "Jane Campion", cat: "oscar", detail: "Campion's second Best Director nom, first win" },
  { q: "Which was the first sequel to win Best Picture?", options: ["The Godfather Part II", "The Empire Strikes Back", "Aliens", "The Lord of the Rings: The Two Towers"], answer: "The Godfather Part II", cat: "oscar", detail: "Won in 1975" },
  { q: "Who has won the most acting Oscars?", options: ["Katharine Hepburn", "Meryl Streep", "Daniel Day-Lewis", "Jack Nicholson"], answer: "Katharine Hepburn", cat: "oscar", detail: "Hepburn won 4 Best Actress awards" },
  { q: "Which of these came out first?", options: ["Seven Samurai", "Ran", "Slumdog Millionaire", "The Departed"], answer: "Seven Samurai", cat: "year", detail: "Seven Samurai (1954)" },
  { q: "Which of these came out first?", options: ["Gladiator", "Dune", "Boyhood", "Eternal Sunshine of the Spotless Mind"], answer: "Gladiator", cat: "year", detail: "Gladiator (2000)" },
  { q: "Which of these came out first?", options: ["Once Upon a Time in Hollywood", "West Side Story", "A Clockwork Orange", "Past Lives"], answer: "West Side Story", cat: "year", detail: "West Side Story (1961)" },
  { q: "Which of these came out first?", options: ["Once Upon a Time in Hollywood", "Schindler's List", "Die Hard", "Skyfall"], answer: "Die Hard", cat: "year", detail: "Die Hard (1988)" },
  { q: "Which of these came out first?", options: ["Close Encounters of the Third Kind", "Casino Royale", "Return of the Jedi", "North by Northwest"], answer: "North by Northwest", cat: "year", detail: "North by Northwest (1959)" },
  { q: "Which of these came out first?", options: ["Thelma & Louise", "Bonnie and Clyde", "Amélie", "Boyhood"], answer: "Bonnie and Clyde", cat: "year", detail: "Bonnie and Clyde (1967)" },
  { q: "Which of these came out first?", options: ["Skyfall", "Mad Max: Fury Road", "Finding Nemo", "The Lord of the Rings: The Two Towers"], answer: "The Lord of the Rings: The Two Towers", cat: "year", detail: "The Lord of the Rings: The Two Towers (2002)" },
  { q: "Which of these came out first?", options: ["Se7en", "The Truman Show", "Goodfellas", "Lawrence of Arabia"], answer: "Lawrence of Arabia", cat: "year", detail: "Lawrence of Arabia (1962)" },
  { q: "When was Nosferatu released?", options: ["1922", "1921", "1923"], answer: "1922", cat: "year", detail: "Nosferatu (1922)" },
  { q: "Which of these came out first?", options: ["Network", "Pulp Fiction", "Brokeback Mountain", "Psycho"], answer: "Psycho", cat: "year", detail: "Psycho (1960)" },
  { q: "Which of these was released in the 1950s?", options: ["The Seventh Seal", "The Deer Hunter", "Bonnie and Clyde", "Rocky"], answer: "The Seventh Seal", cat: "year", detail: "The Seventh Seal (1957)" },
  { q: "Which of these came out first?", options: ["Die Hard", "Gone Girl", "Se7en", "Drive My Car"], answer: "Die Hard", cat: "year", detail: "Die Hard (1988)" },
  { q: "Which of these came out first?", options: ["Bonnie and Clyde", "Top Gun", "Thelma & Louise", "Zodiac"], answer: "Bonnie and Clyde", cat: "year", detail: "Bonnie and Clyde (1967)" },
  { q: "Which of these was released in the 1950s?", options: ["Singin' in the Rain", "Shrek", "King Kong", "Eyes Wide Shut"], answer: "Singin' in the Rain", cat: "year", detail: "Singin' in the Rain (1952)" },
  { q: "Which of these came out first?", options: ["Lawrence of Arabia", "A Clockwork Orange", "Gladiator", "Killers of the Flower Moon"], answer: "Lawrence of Arabia", cat: "year", detail: "Lawrence of Arabia (1962)" },
  { q: "Which of these was released in the 1950s?", options: ["North by Northwest", "Rain Man", "Oppenheimer", "The Passion of Joan of Arc"], answer: "North by Northwest", cat: "year", detail: "North by Northwest (1959)" },
  { q: "Which of these came out first?", options: ["Everything Everywhere All at Once", "The Lord of the Rings: The Two Towers", "Schindler's List", "Past Lives"], answer: "Schindler's List", cat: "year", detail: "Schindler's List (1993)" },
  { q: "Which of these was released in the 1940s?", options: ["Citizen Kane", "Snow White and the Seven Dwarfs", "Schindler's List", "The Lord of the Rings: The Fellowship of the Ring"], answer: "Citizen Kane", cat: "year", detail: "Citizen Kane (1941)" },
  { q: "Which of these came out first?", options: ["Schindler's List", "Blade Runner 2049", "City of God", "La Dolce Vita"], answer: "La Dolce Vita", cat: "year", detail: "La Dolce Vita (1960)" },
  { q: "Which of these came out first?", options: ["Double Indemnity", "Blade Runner 2049", "Drive My Car", "Ghostbusters"], answer: "Double Indemnity", cat: "year", detail: "Double Indemnity (1944)" },
  { q: "Which of these came out first?", options: ["A Few Good Men", "One Flew Over the Cuckoo's Nest", "American Beauty", "The Pianist"], answer: "One Flew Over the Cuckoo's Nest", cat: "year", detail: "One Flew Over the Cuckoo's Nest (1975)" },
  { q: "When was Sunset Boulevard released?", options: ["1950", "1949", "1952"], answer: "1950", cat: "year", detail: "Sunset Boulevard (1950)" },
  { q: "Which of these came out first?", options: ["The Dark Knight", "Dr. Strangelove", "Titanic", "Rosemary's Baby"], answer: "Dr. Strangelove", cat: "year", detail: "Dr. Strangelove (1964)" },
  { q: "Which of these came out first?", options: ["Unforgiven", "Citizen Kane", "Black Swan", "Nomadland"], answer: "Citizen Kane", cat: "year", detail: "Citizen Kane (1941)" },
  { q: "Which of these came out first?", options: ["Mulholland Drive", "The Banshees of Inisherin", "Spotlight", "Raiders of the Lost Ark"], answer: "Raiders of the Lost Ark", cat: "year", detail: "Raiders of the Lost Ark (1981)" },
  { q: "Which of these was released in the 1930s?", options: ["The Wizard of Oz", "The Dark Knight", "Avatar", "Rain Man"], answer: "The Wizard of Oz", cat: "year", detail: "The Wizard of Oz (1939)" },
  { q: "Which of these was released in the 1960s?", options: ["The Good the Bad and the Ugly", "Mad Max: Fury Road", "City of God", "The Third Man"], answer: "The Good the Bad and the Ugly", cat: "year", detail: "The Good the Bad and the Ugly (1966)" },
  { q: "Which of these came out first?", options: ["The Matrix", "Amadeus", "The Sting", "Inception"], answer: "The Sting", cat: "year", detail: "The Sting (1973)" },
  { q: "Which of these came out first?", options: ["Drive", "Independence Day", "Interstellar", "Lawrence of Arabia"], answer: "Lawrence of Arabia", cat: "year", detail: "Lawrence of Arabia (1962)" },
  { q: "Which of these came out first?", options: ["Annie Hall", "The Dark Knight Rises", "Ghostbusters", "The Pianist"], answer: "Annie Hall", cat: "year", detail: "Annie Hall (1977)" },
  { q: "Which of these came out first?", options: ["Blade Runner 2049", "A Beautiful Mind", "Rear Window", "Munich"], answer: "Rear Window", cat: "year", detail: "Rear Window (1954)" },
  { q: "Which of these came out first?", options: ["Reservoir Dogs", "Toy Story", "Toy Story 3", "Gladiator"], answer: "Reservoir Dogs", cat: "year", detail: "Reservoir Dogs (1992)" },
  { q: "Which of these came out first?", options: ["Drive My Car", "Iron Man", "12 Years a Slave", "The Departed"], answer: "The Departed", cat: "year", detail: "The Departed (2006)" },
  { q: "When was Metropolis released?", options: ["1927", "1926", "1924"], answer: "1927", cat: "year", detail: "Metropolis (1927)" },
  { q: "Which of these came out first?", options: ["Singin' in the Rain", "Persona", "Do the Right Thing", "It's a Wonderful Life"], answer: "It's a Wonderful Life", cat: "year", detail: "It's a Wonderful Life (1946)" },
  { q: "Which of these was released in the 1950s?", options: ["Sunset Boulevard", "8½", "Chinatown", "Reservoir Dogs"], answer: "Sunset Boulevard", cat: "year", detail: "Sunset Boulevard (1950)" },
  { q: "Which of these came out first?", options: ["Gravity", "Barbie", "Thelma & Louise", "Boyhood"], answer: "Thelma & Louise", cat: "year", detail: "Thelma & Louise (1991)" },
  { q: "Which of these came out first?", options: ["One Flew Over the Cuckoo's Nest", "Spider-Man", "Goodfellas", "Chinatown"], answer: "Chinatown", cat: "year", detail: "Chinatown (1974)" },
  { q: "Which of these came out first?", options: ["Ikiru", "Get Out", "Pan's Labyrinth", "Batman"], answer: "Ikiru", cat: "year", detail: "Ikiru (1952)" },
  { q: "When was Singin' in the Rain released?", options: ["1952", "1949", "1953"], answer: "1952", cat: "year", detail: "Singin' in the Rain (1952)" },
  { q: "Which of these came out first?", options: ["Mulholland Drive", "The Good the Bad and the Ugly", "The Revenant", "Avatar"], answer: "The Good the Bad and the Ugly", cat: "year", detail: "The Good the Bad and the Ugly (1966)" },
  { q: "Which of these came out first?", options: ["Drive", "The Dark Knight", "8½", "The Wolf of Wall Street"], answer: "8½", cat: "year", detail: "8½ (1963)" },
  { q: "Which of these was released in the 1930s?", options: ["M", "Raiders of the Lost Ark", "Inception", "Forrest Gump"], answer: "M", cat: "year", detail: "M (1931)" },
  { q: "Which of these came out first?", options: ["To Kill a Mockingbird", "Blue Velvet", "North by Northwest", "The Usual Suspects"], answer: "North by Northwest", cat: "year", detail: "North by Northwest (1959)" },
  { q: "Which of these came out first?", options: ["Eyes Wide Shut", "The Tree of Life", "Schindler's List", "Shrek"], answer: "Schindler's List", cat: "year", detail: "Schindler's List (1993)" },
  { q: "Which of these was released in the 1940s?", options: ["It's a Wonderful Life", "Gone with the Wind", "Once Upon a Time in Hollywood", "Total Recall"], answer: "It's a Wonderful Life", cat: "year", detail: "It's a Wonderful Life (1946)" },
  { q: "Which of these came out first?", options: ["The Shawshank Redemption", "Casino", "Up", "Return of the Jedi"], answer: "Return of the Jedi", cat: "year", detail: "Return of the Jedi (1983)" },
  { q: "Which of these came out first?", options: ["Avatar", "Oldboy", "The Good the Bad and the Ugly", "La Dolce Vita"], answer: "La Dolce Vita", cat: "year", detail: "La Dolce Vita (1960)" },
  { q: "Which of these came out first?", options: ["Moonrise Kingdom", "Forrest Gump", "Persona", "Brokeback Mountain"], answer: "Persona", cat: "year", detail: "Persona (1966)" },
  { q: "Which of these came out first?", options: ["West Side Story", "The Lord of the Rings: The Two Towers", "The Princess Bride", "The Revenant"], answer: "West Side Story", cat: "year", detail: "West Side Story (1961)" },
  { q: "Which of these was released in the 1940s?", options: ["Casablanca", "Heat", "Terminator 2", "Butch Cassidy and the Sundance Kid"], answer: "Casablanca", cat: "year", detail: "Casablanca (1942)" },
  { q: "Which of these was released in the 1940s?", options: ["Citizen Kane", "A Star Is Born", "Eyes Wide Shut", "The Godfather Part II"], answer: "Citizen Kane", cat: "year", detail: "Citizen Kane (1941)" },
  { q: "Which of these came out first?", options: ["Bicycle Thieves", "Schindler's List", "Double Indemnity", "Parasite"], answer: "Double Indemnity", cat: "year", detail: "Double Indemnity (1944)" },
  { q: "Which of these was released in the 1930s?", options: ["King Kong", "Chinatown", "The Third Man", "One Flew Over the Cuckoo's Nest"], answer: "King Kong", cat: "year", detail: "King Kong (1933)" },
  { q: "Which of these was released in the 1950s?", options: ["Vertigo", "Wall-E", "Oldboy", "The Dark Knight"], answer: "Vertigo", cat: "year", detail: "Vertigo (1958)" },
  { q: "Which of these came out first?", options: ["Sunset Boulevard", "Some Like It Hot", "Solaris", "Vertigo"], answer: "Sunset Boulevard", cat: "year", detail: "Sunset Boulevard (1950)" },
  { q: "Which of these came out first?", options: ["Drive My Car", "The Terminator", "Gone Girl", "The Matrix"], answer: "The Terminator", cat: "year", detail: "The Terminator (1984)" },
  { q: "Which of these came out first?", options: ["Batman", "Die Hard", "Butch Cassidy and the Sundance Kid", "Up"], answer: "Butch Cassidy and the Sundance Kid", cat: "year", detail: "Butch Cassidy and the Sundance Kid (1969)" },
  { q: "Which of these came out first?", options: ["Return of the Jedi", "North by Northwest", "The Big Lebowski", "Interstellar"], answer: "North by Northwest", cat: "year", detail: "North by Northwest (1959)" },
  { q: "Which of these was released in the 1950s?", options: ["Ikiru", "Django Unchained", "Moonrise Kingdom", "Drive My Car"], answer: "Ikiru", cat: "year", detail: "Ikiru (1952)" },
  { q: "Which of these came out first?", options: ["Star Wars", "The French Connection", "Casablanca", "Dune"], answer: "Casablanca", cat: "year", detail: "Casablanca (1942)" },
  { q: "Which of these came out first?", options: ["Barbie", "Drive", "Joker", "Some Like It Hot"], answer: "Some Like It Hot", cat: "year", detail: "Some Like It Hot (1959)" },
  { q: "Which of these came out first?", options: ["Dr. Strangelove", "Rebel Without a Cause", "Spider-Man", "Moonrise Kingdom"], answer: "Rebel Without a Cause", cat: "year", detail: "Rebel Without a Cause (1955)" },
  { q: "Which of these came out first?", options: ["Interstellar", "Everything Everywhere All at Once", "West Side Story", "The Power of the Dog"], answer: "West Side Story", cat: "year", detail: "West Side Story (1961)" },
  { q: "Which of these came out first?", options: ["Indiana Jones and the Last Crusade", "Moonrise Kingdom", "Singin' in the Rain", "Casino Royale"], answer: "Singin' in the Rain", cat: "year", detail: "Singin' in the Rain (1952)" },
  { q: "Which of these came out first?", options: ["Eternal Sunshine of the Spotless Mind", "Eyes Wide Shut", "Sunset Boulevard", "The Departed"], answer: "Sunset Boulevard", cat: "year", detail: "Sunset Boulevard (1950)" },
  { q: "Which of these came out first?", options: ["Whiplash", "The Graduate", "The Godfather", "The Shawshank Redemption"], answer: "The Graduate", cat: "year", detail: "The Graduate (1967)" },
  { q: "Which of these came out first?", options: ["Shrek", "Munich", "Full Metal Jacket", "Sound of Metal"], answer: "Full Metal Jacket", cat: "year", detail: "Full Metal Jacket (1987)" },
  { q: "Which of these came out first?", options: ["Ran", "Amadeus", "Edward Scissorhands", "The Dark Knight"], answer: "Amadeus", cat: "year", detail: "Amadeus (1984)" },
  { q: "Which of these came out first?", options: ["Ikiru", "The Lord of the Rings: The Return of the King", "Do the Right Thing", "Black Swan"], answer: "Ikiru", cat: "year", detail: "Ikiru (1952)" },
  { q: "Which of these came out first?", options: ["Back to the Future", "Brokeback Mountain", "The Revenant", "The Social Network"], answer: "Back to the Future", cat: "year", detail: "Back to the Future (1985)" },
  { q: "Which of these came out first?", options: ["Breathless", "Minari", "Batman", "Casino"], answer: "Breathless", cat: "year", detail: "Breathless (1960)" },
  { q: "Which of these came out first?", options: ["There Will Be Blood", "Eternal Sunshine of the Spotless Mind", "Mulholland Drive", "Die Hard"], answer: "Die Hard", cat: "year", detail: "Die Hard (1988)" },
  { q: "Which of these came out first?", options: ["Sound of Metal", "Wall-E", "Gravity", "Juno"], answer: "Juno", cat: "year", detail: "Juno (2007)" },
  { q: "Which of these was released in the 1950s?", options: ["Some Like It Hot", "Children of Men", "Magnolia", "To Kill a Mockingbird"], answer: "Some Like It Hot", cat: "year", detail: "Some Like It Hot (1959)" },
  { q: "Which of these came out first?", options: ["Close Encounters of the Third Kind", "Iron Man", "Ratatouille", "Terminator 2"], answer: "Close Encounters of the Third Kind", cat: "year", detail: "Close Encounters of the Third Kind (1977)" },
  { q: "Which of these was released in the 1960s?", options: ["Bonnie and Clyde", "The Lord of the Rings: The Two Towers", "Jaws", "Oppenheimer"], answer: "Bonnie and Clyde", cat: "year", detail: "Bonnie and Clyde (1967)" },
  { q: "Which of these came out first?", options: ["L.A. Confidential", "8½", "The Artist", "Apocalypse Now"], answer: "8½", cat: "year", detail: "8½ (1963)" },
  { q: "Which of these came out first?", options: ["Casablanca", "The Third Man", "Drive", "Shrek"], answer: "Casablanca", cat: "year", detail: "Casablanca (1942)" },
  { q: "Which of these came out first?", options: ["Psycho", "Persona", "The Incredibles", "Vertigo"], answer: "Vertigo", cat: "year", detail: "Vertigo (1958)" },
  { q: "Which of these came out first?", options: ["Terminator 2", "Pan's Labyrinth", "Dune", "In the Mood for Love"], answer: "Terminator 2", cat: "year", detail: "Terminator 2 (1991)" },
  { q: "Which of these was released in the 1950s?", options: ["Vertigo", "Edward Scissorhands", "Roma", "The Power of the Dog"], answer: "Vertigo", cat: "year", detail: "Vertigo (1958)" },
  { q: "Which of these came out first?", options: ["Parasite", "Eternal Sunshine of the Spotless Mind", "Chinatown", "Butch Cassidy and the Sundance Kid"], answer: "Butch Cassidy and the Sundance Kid", cat: "year", detail: "Butch Cassidy and the Sundance Kid (1969)" },
  { q: "Which of these came out first?", options: ["Room", "Taxi Driver", "In the Mood for Love", "Persona"], answer: "Persona", cat: "year", detail: "Persona (1966)" },
  { q: "Which of these came out first?", options: ["The Exorcist", "1917", "Manchester by the Sea", "Casino Royale"], answer: "The Exorcist", cat: "year", detail: "The Exorcist (1973)" },
  { q: "Which of these was released in the 1960s?", options: ["Breathless", "North by Northwest", "Blade Runner 2049", "The Lord of the Rings: The Fellowship of the Ring"], answer: "Breathless", cat: "year", detail: "Breathless (1960)" },
  { q: "Which of these came out first?", options: ["The Social Network", "The French Connection", "Braveheart", "Schindler's List"], answer: "The French Connection", cat: "year", detail: "The French Connection (1971)" },
  { q: "Which of these came out first?", options: ["City of God", "Sunset Boulevard", "The Empire Strikes Back", "Ikiru"], answer: "Sunset Boulevard", cat: "year", detail: "Sunset Boulevard (1950)" },
  { q: "Which of these came out first?", options: ["The Usual Suspects", "A Clockwork Orange", "Spotlight", "Million Dollar Baby"], answer: "A Clockwork Orange", cat: "year", detail: "A Clockwork Orange (1971)" },
  { q: "Which of these came out first?", options: ["A Beautiful Mind", "Annie Hall", "Pan's Labyrinth", "Crouching Tiger Hidden Dragon"], answer: "Annie Hall", cat: "year", detail: "Annie Hall (1977)" },
  { q: "Which of these came out first?", options: ["Lost in Translation", "The Silence of the Lambs", "Dr. Strangelove", "Mulholland Drive"], answer: "Dr. Strangelove", cat: "year", detail: "Dr. Strangelove (1964)" },
  { q: "Which of these was released in the 1950s?", options: ["The 400 Blows", "Parasite", "Casablanca", "Up"], answer: "The 400 Blows", cat: "year", detail: "The 400 Blows (1959)" },
  { q: "Which of these came out first?", options: ["Saving Private Ryan", "Scarface", "Citizen Kane", "Star Wars"], answer: "Citizen Kane", cat: "year", detail: "Citizen Kane (1941)" },
  { q: "Which of these came out first?", options: ["The Usual Suspects", "The Deer Hunter", "The Sixth Sense", "Rear Window"], answer: "Rear Window", cat: "year", detail: "Rear Window (1954)" },
  { q: "When was North by Northwest released?", options: ["1959", "1958", "1960"], answer: "1959", cat: "year", detail: "North by Northwest (1959)" },
  { q: "Which of these came out first?", options: ["1917", "The Shape of Water", "Sunset Boulevard", "Spider-Man"], answer: "Sunset Boulevard", cat: "year", detail: "Sunset Boulevard (1950)" },
  { q: "Which of these came out first?", options: ["The Shape of Water", "Singin' in the Rain", "Return of the Jedi", "Aliens"], answer: "Singin' in the Rain", cat: "year", detail: "Singin' in the Rain (1952)" },
  { q: "Which of these was released in the 1940s?", options: ["Citizen Kane", "Killers of the Flower Moon", "The King's Speech", "The Shape of Water"], answer: "Citizen Kane", cat: "year", detail: "Citizen Kane (1941)" },
  { q: "When was The Wizard of Oz released?", options: ["1939", "1941", "1940"], answer: "1939", cat: "year", detail: "The Wizard of Oz (1939)" },
  { q: "Which of these came out first?", options: ["Memento", "Shrek", "Goodfellas", "Avatar"], answer: "Goodfellas", cat: "year", detail: "Goodfellas (1990)" },
  { q: "Which of these was NOT directed by Ingmar Bergman?", options: ["Million Dollar Baby", "The Seventh Seal", "Wild Strawberries", "Persona"], answer: "Million Dollar Baby", cat: "director", detail: "Million Dollar Baby was not a Ingmar Bergman film" },
  { q: "Which of these was NOT directed by David Lynch?", options: ["Breaking the Waves", "Blue Velvet", "The Elephant Man", "Lost Highway"], answer: "Breaking the Waves", cat: "director", detail: "Breaking the Waves was not a David Lynch film" },
  { q: "Who directed Castle in the Sky?", options: ["Hayao Miyazaki", "Ang Lee", "Sofia Coppola", "Christopher Nolan"], answer: "Hayao Miyazaki", cat: "director", detail: "Hayao Miyazaki's Castle in the Sky" },
  { q: "Who directed Solaris?", options: ["Andrei Tarkovsky", "Stanley Kubrick", "Fernando Meirelles", "Sofia Coppola"], answer: "Andrei Tarkovsky", cat: "director", detail: "Andrei Tarkovsky's Solaris" },
  { q: "Which of these was NOT directed by Michael Haneke?", options: ["Sicario", "The White Ribbon", "Caché", "Amour"], answer: "Sicario", cat: "director", detail: "Sicario was not a Michael Haneke film" },
  { q: "Which of these was directed by David Lynch?", options: ["The Elephant Man", "Taxi Driver", "Rescue Dawn", "True Lies"], answer: "The Elephant Man", cat: "director", detail: "David Lynch directed The Elephant Man" },
  { q: "Who directed Mother?", options: ["Bong Joon-ho", "Roman Polanski", "Damien Chazelle", "Terrence Malick"], answer: "Bong Joon-ho", cat: "director", detail: "Bong Joon-ho's Mother" },
  { q: "Which of these was NOT directed by Terrence Malick?", options: ["American Gangster", "The Thin Red Line", "Days of Heaven", "The Tree of Life"], answer: "American Gangster", cat: "director", detail: "American Gangster was not a Terrence Malick film" },
  { q: "Which of these was directed by Edward Yang?", options: ["Taipei Story", "Peppermint Candy", "Terminator 2", "Apocalypse Now"], answer: "Taipei Story", cat: "director", detail: "Edward Yang directed Taipei Story" },
  { q: "Who directed 2046?", options: ["Wong Kar-wai", "Oliver Stone", "Sam Mendes", "Wes Anderson"], answer: "Wong Kar-wai", cat: "director", detail: "Wong Kar-wai's 2046" },
  { q: "Which of these was NOT directed by Park Chan-wook?", options: ["Yojimbo", "Sympathy for Mr. Vengeance", "Decision to Leave", "Joint Security Area"], answer: "Yojimbo", cat: "director", detail: "Yojimbo was not a Park Chan-wook film" },
  { q: "Which of these was directed by Asghar Farhadi?", options: ["A Hero", "The Beguiled", "Sweeney Todd", "The Polar Express"], answer: "A Hero", cat: "director", detail: "Asghar Farhadi directed A Hero" },
  { q: "Who directed Synecdoche New York?", options: ["Charlie Kaufman", "François Truffaut", "Alejandro González Iñárritu", "Coen Brothers"], answer: "Charlie Kaufman", cat: "director", detail: "Charlie Kaufman's Synecdoche New York" },
  { q: "Which of these was NOT directed by Michael Haneke?", options: ["Kill Bill: Vol. 1", "Caché", "Funny Games", "The Piano Teacher"], answer: "Kill Bill: Vol. 1", cat: "director", detail: "Kill Bill: Vol. 1 was not a Michael Haneke film" },
  { q: "Who directed both Dancer in the Dark and Dogville?", options: ["Lars von Trier", "Akira Kurosawa", "Ridley Scott", "Steven Spielberg"], answer: "Lars von Trier", cat: "director", detail: "Both are Lars von Trier films" },
  { q: "Who directed I'm Thinking of Ending Things?", options: ["Charlie Kaufman", "Greta Gerwig", "Alejandro González Iñárritu", "Christopher Nolan"], answer: "Charlie Kaufman", cat: "director", detail: "Charlie Kaufman's I'm Thinking of Ending Things" },
  { q: "Which of these was directed by Lee Chang-dong?", options: ["Poetry", "Crouching Tiger Hidden Dragon", "Django Unchained", "Cast Away"], answer: "Poetry", cat: "director", detail: "Lee Chang-dong directed Poetry" },
  { q: "Which of these was NOT directed by Terrence Malick?", options: ["Aguirre the Wrath of God", "A Hidden Life", "Days of Heaven", "Badlands"], answer: "Aguirre the Wrath of God", cat: "director", detail: "Aguirre the Wrath of God was not a Terrence Malick film" },
  { q: "Which of these was directed by Andrei Tarkovsky?", options: ["The Mirror", "If Beale Street Could Talk", "Steve Jobs", "Blade Runner"], answer: "The Mirror", cat: "director", detail: "Andrei Tarkovsky directed The Mirror" },
  { q: "Who directed Repulsion?", options: ["Roman Polanski", "Guillermo del Toro", "George Miller", "Michael Mann"], answer: "Roman Polanski", cat: "director", detail: "Roman Polanski's Repulsion" },
  { q: "Which of these was NOT directed by Andrei Tarkovsky?", options: ["Princess Mononoke", "The Mirror", "Andrei Rublev", "Solaris"], answer: "Princess Mononoke", cat: "director", detail: "Princess Mononoke was not a Andrei Tarkovsky film" },
  { q: "Who directed Oasis?", options: ["Lee Chang-dong", "Federico Fellini", "Roman Polanski", "Hayao Miyazaki"], answer: "Lee Chang-dong", cat: "director", detail: "Lee Chang-dong's Oasis" },
  { q: "Which of these was directed by Asghar Farhadi?", options: ["The Salesman", "127 Hours", "Mission: Impossible", "Heat"], answer: "The Salesman", cat: "director", detail: "Asghar Farhadi directed The Salesman" },
  { q: "Which of these was NOT directed by Lars von Trier?", options: ["Big Fish", "Nymphomaniac", "Dancer in the Dark", "Breaking the Waves"], answer: "Big Fish", cat: "director", detail: "Big Fish was not a Lars von Trier film" },
  { q: "Which of these was directed by Federico Fellini?", options: ["La Strada", "The Shining", "Jungle Fever", "Strangers on a Train"], answer: "La Strada", cat: "director", detail: "Federico Fellini directed La Strada" },
  { q: "Which of these was directed by Edward Yang?", options: ["Yi Yi", "A Separation", "Vertigo", "Nights of Cabiria"], answer: "Yi Yi", cat: "director", detail: "Edward Yang directed Yi Yi" },
  { q: "Who directed both Badlands and The New World?", options: ["Terrence Malick", "Federico Fellini", "Andrei Tarkovsky", "François Truffaut"], answer: "Terrence Malick", cat: "director", detail: "Both are Terrence Malick films" },
  { q: "Who directed 8½?", options: ["Federico Fellini", "Tim Burton", "Robert Zemeckis", "George Miller"], answer: "Federico Fellini", cat: "director", detail: "Federico Fellini's 8½" },
  { q: "Who directed Nausicaä of the Valley of the Wind?", options: ["Hayao Miyazaki", "Werner Herzog", "Tim Burton", "Robert Zemeckis"], answer: "Hayao Miyazaki", cat: "director", detail: "Hayao Miyazaki's Nausicaä of the Valley of the Wind" },
  { q: "Who directed Joint Security Area?", options: ["Park Chan-wook", "Paul Thomas Anderson", "Wong Kar-wai", "Kathryn Bigelow"], answer: "Park Chan-wook", cat: "director", detail: "Park Chan-wook's Joint Security Area" },
  { q: "Who directed La Strada?", options: ["Federico Fellini", "Alejandro González Iñárritu", "David Fincher", "Andrei Tarkovsky"], answer: "Federico Fellini", cat: "director", detail: "Federico Fellini's La Strada" },
  { q: "Which of these was directed by Andrei Tarkovsky?", options: ["Stalker", "The Wrestler", "Jackie Brown", "Casino"], answer: "Stalker", cat: "director", detail: "Andrei Tarkovsky directed Stalker" },
  { q: "Which of these was NOT directed by David Lynch?", options: ["Reservoir Dogs", "Lost Highway", "Twin Peaks: Fire Walk with Me", "Wild at Heart"], answer: "Reservoir Dogs", cat: "director", detail: "Reservoir Dogs was not a David Lynch film" },
  { q: "Who directed Dogville?", options: ["Lars von Trier", "Federico Fellini", "Jordan Peele", "Edward Yang"], answer: "Lars von Trier", cat: "director", detail: "Lars von Trier's Dogville" },
  { q: "Who directed both Dancer in the Dark and Melancholia?", options: ["Lars von Trier", "Wong Kar-wai", "Pedro Almodóvar", "Federico Fellini"], answer: "Lars von Trier", cat: "director", detail: "Both are Lars von Trier films" },
  { q: "Which of these was directed by Lars von Trier?", options: ["Nymphomaniac", "The Mirror", "Pain and Glory", "Fallen Angels"], answer: "Nymphomaniac", cat: "director", detail: "Lars von Trier directed Nymphomaniac" },
  { q: "Who directed Secret Sunshine?", options: ["Lee Chang-dong", "François Truffaut", "Edward Yang", "Michael Mann"], answer: "Lee Chang-dong", cat: "director", detail: "Lee Chang-dong's Secret Sunshine" },
  { q: "Who directed Days of Heaven?", options: ["Terrence Malick", "Robert Zemeckis", "Quentin Tarantino", "François Truffaut"], answer: "Terrence Malick", cat: "director", detail: "Terrence Malick's Days of Heaven" },
  { q: "Which of these was NOT directed by Michael Haneke?", options: ["Rear Window", "Caché", "Funny Games", "The Piano Teacher"], answer: "Rear Window", cat: "director", detail: "Rear Window was not a Michael Haneke film" },
  { q: "Which of these was directed by Federico Fellini?", options: ["8½", "Pain and Glory", "Chinatown", "Cave of Forgotten Dreams"], answer: "8½", cat: "director", detail: "Federico Fellini directed 8½" },
  { q: "Who directed both A Hidden Life and Days of Heaven?", options: ["Terrence Malick", "Pedro Almodóvar", "Werner Herzog", "Coen Brothers"], answer: "Terrence Malick", cat: "director", detail: "Both are Terrence Malick films" },
  { q: "Who directed A Hero?", options: ["Asghar Farhadi", "Akira Kurosawa", "David Lynch", "Wes Anderson"], answer: "Asghar Farhadi", cat: "director", detail: "Asghar Farhadi's A Hero" },
  { q: "Which of these was directed by Ingmar Bergman?", options: ["Persona", "Chungking Express", "Poetry", "Us"], answer: "Persona", cat: "director", detail: "Ingmar Bergman directed Persona" },
  { q: "Who directed A Brighter Summer Day?", options: ["Edward Yang", "Danny Boyle", "Ang Lee", "Jean-Luc Godard"], answer: "Edward Yang", cat: "director", detail: "Edward Yang's A Brighter Summer Day" },
  { q: "Who directed Poetry?", options: ["Lee Chang-dong", "Brian De Palma", "Spike Lee", "Sam Mendes"], answer: "Lee Chang-dong", cat: "director", detail: "Lee Chang-dong's Poetry" },
  { q: "Who directed Breaking the Waves?", options: ["Lars von Trier", "Wong Kar-wai", "Charlie Kaufman", "Michael Haneke"], answer: "Lars von Trier", cat: "director", detail: "Lars von Trier's Breaking the Waves" },
  { q: "Which of these was directed by Andrei Tarkovsky?", options: ["The Sacrifice", "Birdman", "Pinocchio", "Dune"], answer: "The Sacrifice", cat: "director", detail: "Andrei Tarkovsky directed The Sacrifice" },
  { q: "Who directed both Dogville and Dancer in the Dark?", options: ["Lars von Trier", "Spike Lee", "Sofia Coppola", "Martin Scorsese"], answer: "Lars von Trier", cat: "director", detail: "Both are Lars von Trier films" },
  { q: "Who directed Melancholia?", options: ["Lars von Trier", "Ang Lee", "Tim Burton", "Damien Chazelle"], answer: "Lars von Trier", cat: "director", detail: "Lars von Trier's Melancholia" },
  { q: "Which of these was NOT directed by Park Chan-wook?", options: ["Ran", "Oldboy", "Sympathy for Mr. Vengeance", "Joint Security Area"], answer: "Ran", cat: "director", detail: "Ran was not a Park Chan-wook film" },
  { q: "Which of these was directed by David Lynch?", options: ["Mulholland Drive", "Days of Heaven", "Gone Girl", "Do the Right Thing"], answer: "Mulholland Drive", cat: "director", detail: "David Lynch directed Mulholland Drive" },
  { q: "Which of these was directed by Ingmar Bergman?", options: ["The Seventh Seal", "I'm Thinking of Ending Things", "The Royal Tenenbaums", "Amour"], answer: "The Seventh Seal", cat: "director", detail: "Ingmar Bergman directed The Seventh Seal" },
  { q: "Who directed A Hidden Life?", options: ["Terrence Malick", "Fernando Meirelles", "Christopher Nolan", "Ridley Scott"], answer: "Terrence Malick", cat: "director", detail: "Terrence Malick's A Hidden Life" },
  { q: "Which of these was NOT directed by Ingmar Bergman?", options: ["Once Upon a Time in Hollywood", "Wild Strawberries", "Fanny and Alexander", "Cries and Whispers"], answer: "Once Upon a Time in Hollywood", cat: "director", detail: "Once Upon a Time in Hollywood was not a Ingmar Bergman film" },
  { q: "Who directed The Host?", options: ["Bong Joon-ho", "Lars von Trier", "Hayao Miyazaki", "Edward Yang"], answer: "Bong Joon-ho", cat: "director", detail: "Bong Joon-ho's The Host" },
  { q: "Who directed Persona?", options: ["Ingmar Bergman", "Stanley Kubrick", "James Cameron", "Bong Joon-ho"], answer: "Ingmar Bergman", cat: "director", detail: "Ingmar Bergman's Persona" },
  { q: "Which of these was directed by David Lynch?", options: ["Blue Velvet", "Avatar: The Way of Water", "E.T.", "Do the Right Thing"], answer: "Blue Velvet", cat: "director", detail: "David Lynch directed Blue Velvet" },
  { q: "Who directed The Sacrifice?", options: ["Andrei Tarkovsky", "Wong Kar-wai", "Fernando Meirelles", "Kathryn Bigelow"], answer: "Andrei Tarkovsky", cat: "director", detail: "Andrei Tarkovsky's The Sacrifice" },
  { q: "Who directed Inland Empire?", options: ["David Lynch", "Lars von Trier", "Spike Lee", "Fernando Meirelles"], answer: "David Lynch", cat: "director", detail: "David Lynch's Inland Empire" },
  { q: "Which of these was directed by Michael Haneke?", options: ["Amour", "Anomalisa", "Melancholia", "Whiplash"], answer: "Amour", cat: "director", detail: "Michael Haneke directed Amour" },
  { q: "Who directed Lady Vengeance?", options: ["Park Chan-wook", "Akira Kurosawa", "Michael Mann", "Damien Chazelle"], answer: "Park Chan-wook", cat: "director", detail: "Park Chan-wook's Lady Vengeance" },
  { q: "Which of these was directed by Andrei Tarkovsky?", options: ["Andrei Rublev", "Mulholland Drive", "Dune", "Rescue Dawn"], answer: "Andrei Rublev", cat: "director", detail: "Andrei Tarkovsky directed Andrei Rublev" },
  { q: "Which of these was directed by Michael Haneke?", options: ["Caché", "The Wolf of Wall Street", "Life of Pi", "Peppermint Candy"], answer: "Caché", cat: "director", detail: "Michael Haneke directed Caché" },
  { q: "Which of these was directed by Lee Chang-dong?", options: ["Burning", "North by Northwest", "Babylon", "Grizzly Man"], answer: "Burning", cat: "director", detail: "Lee Chang-dong directed Burning" },
  { q: "Who directed The New World?", options: ["Terrence Malick", "Roman Polanski", "Federico Fellini", "Damien Chazelle"], answer: "Terrence Malick", cat: "director", detail: "Terrence Malick's The New World" },
  { q: "Who directed Amarcord?", options: ["Federico Fellini", "Greta Gerwig", "Jordan Peele", "Danny Boyle"], answer: "Federico Fellini", cat: "director", detail: "Federico Fellini's Amarcord" },
  { q: "Which of these was directed by Federico Fellini?", options: ["La Dolce Vita", "Snowpiercer", "O Brother Where Art Thou", "Lost Highway"], answer: "La Dolce Vita", cat: "director", detail: "Federico Fellini directed La Dolce Vita" },
  { q: "Which of these was directed by Asghar Farhadi?", options: ["The Past", "Paths of Glory", "Ran", "8½"], answer: "The Past", cat: "director", detail: "Asghar Farhadi directed The Past" },
  { q: "Who directed Nostalgia?", options: ["Andrei Tarkovsky", "Edward Yang", "Barry Jenkins", "Stanley Kubrick"], answer: "Andrei Tarkovsky", cat: "director", detail: "Andrei Tarkovsky's Nostalgia" },
  { q: "Which of these was NOT directed by Lars von Trier?", options: ["Trainspotting", "Dogville", "Breaking the Waves", "Dancer in the Dark"], answer: "Trainspotting", cat: "director", detail: "Trainspotting was not a Lars von Trier film" },
  { q: "Who directed Antichrist?", options: ["Lars von Trier", "Werner Herzog", "Darren Aronofsky", "Alejandro González Iñárritu"], answer: "Lars von Trier", cat: "director", detail: "Lars von Trier's Antichrist" },
  { q: "Who directed Sympathy for Mr. Vengeance?", options: ["Park Chan-wook", "Hayao Miyazaki", "David Lynch", "Lars von Trier"], answer: "Park Chan-wook", cat: "director", detail: "Park Chan-wook's Sympathy for Mr. Vengeance" },
  { q: "Which of these was NOT directed by Wong Kar-wai?", options: ["Nights of Cabiria", "The Grandmaster", "Chungking Express", "In the Mood for Love"], answer: "Nights of Cabiria", cat: "director", detail: "Nights of Cabiria was not a Wong Kar-wai film" },
  { q: "Who directed Yi Yi?", options: ["Edward Yang", "Tim Burton", "Lee Chang-dong", "Jordan Peele"], answer: "Edward Yang", cat: "director", detail: "Edward Yang's Yi Yi" },
  { q: "Who directed both The Mirror and Nostalgia?", options: ["Andrei Tarkovsky", "Sam Mendes", "Ridley Scott", "François Truffaut"], answer: "Andrei Tarkovsky", cat: "director", detail: "Both are Andrei Tarkovsky films" },
  { q: "Who directed both Cries and Whispers and Persona?", options: ["Ingmar Bergman", "Terrence Malick", "Christopher Nolan", "Pedro Almodóvar"], answer: "Ingmar Bergman", cat: "director", detail: "Both are Ingmar Bergman films" },
  { q: "Which of these was directed by Andrei Tarkovsky?", options: ["Ivan's Childhood", "25th Hour", "The Piano Teacher", "Dial M for Murder"], answer: "Ivan's Childhood", cat: "director", detail: "Andrei Tarkovsky directed Ivan's Childhood" },
  { q: "Which of these was NOT directed by Ingmar Bergman?", options: ["The Past", "Fanny and Alexander", "Cries and Whispers", "Wild Strawberries"], answer: "The Past", cat: "director", detail: "The Past was not a Ingmar Bergman film" },
  { q: "Who directed The Piano Teacher?", options: ["Michael Haneke", "Quentin Tarantino", "Alejandro González Iñárritu", "Pedro Almodóvar"], answer: "Michael Haneke", cat: "director", detail: "Michael Haneke's The Piano Teacher" },
  { q: "Who directed both Amour and The Piano Teacher?", options: ["Michael Haneke", "Denis Villeneuve", "Alfred Hitchcock", "Alfonso Cuarón"], answer: "Michael Haneke", cat: "director", detail: "Both are Michael Haneke films" },
  { q: "Who directed Megalopolis?", options: ["Francis Ford Coppola", "Damien Chazelle", "Lars von Trier", "Brian De Palma"], answer: "Francis Ford Coppola", cat: "director", detail: "Francis Ford Coppola's Megalopolis" },
  { q: "Who directed Burning?", options: ["Lee Chang-dong", "Asghar Farhadi", "Quentin Tarantino", "George Miller"], answer: "Lee Chang-dong", cat: "director", detail: "Lee Chang-dong's Burning" },
  { q: "Which of these was directed by David Lynch?", options: ["Twin Peaks: Fire Walk with Me", "Secret Sunshine", "Gladiator", "The Handmaiden"], answer: "Twin Peaks: Fire Walk with Me", cat: "director", detail: "David Lynch directed Twin Peaks: Fire Walk with Me" },
  { q: "Who directed Grizzly Man?", options: ["Werner Herzog", "Park Chan-wook", "Wong Kar-wai", "Spike Lee"], answer: "Werner Herzog", cat: "director", detail: "Werner Herzog's Grizzly Man" },
  { q: "Which of these was NOT directed by Lars von Trier?", options: ["Roma", "Antichrist", "Breaking the Waves", "Dogville"], answer: "Roma", cat: "director", detail: "Roma was not a Lars von Trier film" },
  { q: "Which of these was directed by Lars von Trier?", options: ["Melancholia", "Ikiru", "Eraserhead", "Inland Empire"], answer: "Melancholia", cat: "director", detail: "Lars von Trier directed Melancholia" },
  { q: "Who directed Stalker?", options: ["Andrei Tarkovsky", "Bong Joon-ho", "Greta Gerwig", "David Fincher"], answer: "Andrei Tarkovsky", cat: "director", detail: "Andrei Tarkovsky's Stalker" },
  { q: "Who directed both The Piano Teacher and The White Ribbon?", options: ["Michael Haneke", "Lars von Trier", "Spike Lee", "Akira Kurosawa"], answer: "Michael Haneke", cat: "director", detail: "Both are Michael Haneke films" },
  { q: "Who directed Badlands?", options: ["Terrence Malick", "Spike Lee", "Charlie Kaufman", "Guillermo del Toro"], answer: "Terrence Malick", cat: "director", detail: "Terrence Malick's Badlands" },
  { q: "Who directed Andrei Rublev?", options: ["Andrei Tarkovsky", "Asghar Farhadi", "Francis Ford Coppola", "Wes Anderson"], answer: "Andrei Tarkovsky", cat: "director", detail: "Andrei Tarkovsky's Andrei Rublev" },
  { q: "Which of these was NOT directed by Andrei Tarkovsky?", options: ["The Polar Express", "The Sacrifice", "Solaris", "Stalker"], answer: "The Polar Express", cat: "director", detail: "The Polar Express was not a Andrei Tarkovsky film" },
  { q: "Who directed Taipei Story?", options: ["Edward Yang", "David Lynch", "Ang Lee", "Pedro Almodóvar"], answer: "Edward Yang", cat: "director", detail: "Edward Yang's Taipei Story" },
  { q: "Which of these was directed by Lars von Trier?", options: ["Dancer in the Dark", "Seven Samurai", "The Life Aquatic", "La La Land"], answer: "Dancer in the Dark", cat: "director", detail: "Lars von Trier directed Dancer in the Dark" },
  { q: "Who directed Eraserhead?", options: ["David Lynch", "Alfonso Cuarón", "Spike Jonze", "Ang Lee"], answer: "David Lynch", cat: "director", detail: "David Lynch's Eraserhead" },
  { q: "Which of these was directed by Ingmar Bergman?", options: ["Cries and Whispers", "North by Northwest", "High and Low", "Mad Max"], answer: "Cries and Whispers", cat: "director", detail: "Ingmar Bergman directed Cries and Whispers" },
  { q: "Which of these was NOT directed by Wong Kar-wai?", options: ["Mystic River", "Happy Together", "Fallen Angels", "In the Mood for Love"], answer: "Mystic River", cat: "director", detail: "Mystic River was not a Wong Kar-wai film" },
  { q: "Which of these was directed by Michael Haneke?", options: ["The Piano Teacher", "The Wolf of Wall Street", "American Beauty", "Public Enemies"], answer: "The Piano Teacher", cat: "director", detail: "Michael Haneke directed The Piano Teacher" },
  { q: "Who directed Chungking Express?", options: ["Wong Kar-wai", "Michael Mann", "Hayao Miyazaki", "Alfred Hitchcock"], answer: "Wong Kar-wai", cat: "director", detail: "Wong Kar-wai's Chungking Express" },
  { q: "Who directed Anomalisa?", options: ["Charlie Kaufman", "Sofia Coppola", "Brian De Palma", "Oliver Stone"], answer: "Charlie Kaufman", cat: "director", detail: "Charlie Kaufman's Anomalisa" },
  { q: "Which of these was directed by David Lynch?", options: ["Inland Empire", "Fight Club", "Rope", "The Shining"], answer: "Inland Empire", cat: "director", detail: "David Lynch directed Inland Empire" },,
  { q: "\"I've seen things you people wouldn't believe.\"", options: ["Blade Runner", "2001: A Space Odyssey", "Solaris", "The Matrix"], answer: "Blade Runner", cat: "quote", detail: "Rutger Hauer's Tears in Rain monologue" },
  { q: "\"The horror. The horror.\"", options: ["Apocalypse Now", "Heart of Darkness", "Platoon", "The Thin Red Line"], answer: "Apocalypse Now", cat: "quote", detail: "Brando as Colonel Kurtz" },
  { q: "\"Badges? We ain't got no badges.\"", options: ["The Treasure of the Sierra Madre", "Bonnie and Clyde", "The Wild Bunch", "Butch Cassidy and the Sundance Kid"], answer: "The Treasure of the Sierra Madre", cat: "quote", detail: "Alfonso Bedoya as Gold Hat (1948)" },
  { q: "\"A census taker once tried to test me.\"", options: ["The Silence of the Lambs", "Se7en", "Zodiac", "Psycho"], answer: "The Silence of the Lambs", cat: "quote", detail: "Lecter's liver & fava beans story" },
  { q: "\"Made it, Ma! Top of the world!\"", options: ["White Heat", "The Public Enemy", "Scarface", "Angels with Dirty Faces"], answer: "White Heat", cat: "quote", detail: "James Cagney's explosive finale (1949)" },
  { q: "\"La-dee-da, la-dee-da.\"", options: ["Annie Hall", "Manhattan", "Hannah and Her Sisters", "Sleeper"], answer: "Annie Hall", cat: "quote", detail: "Diane Keaton's breezy catchphrase" },
  { q: "\"One morning I shot an elephant in my pajamas.\"", options: ["Animal Crackers", "Duck Soup", "A Night at the Opera", "Horse Feathers"], answer: "Animal Crackers", cat: "quote", detail: "Groucho Marx's classic wordplay (1930)" },
  { q: "\"We all go a little mad sometimes.\"", options: ["Psycho", "The Shining", "Misery", "Whatever Happened to Baby Jane?"], answer: "Psycho", cat: "quote", detail: "Anthony Perkins as Norman Bates" },
  { q: "\"You know how to whistle, don't you?\"", options: ["To Have and Have Not", "Casablanca", "The Big Sleep", "Key Largo"], answer: "To Have and Have Not", cat: "quote", detail: "Lauren Bacall to Humphrey Bogart (1944)" },
  { q: "\"Plastics.\"", options: ["The Graduate", "American Beauty", "Wall Street", "The Big Short"], answer: "The Graduate", cat: "quote", detail: "Career advice to Dustin Hoffman" },
  { q: "\"A boy's best friend is his mother.\"", options: ["Psycho", "The Manchurian Candidate", "Carrie", "The Omen"], answer: "Psycho", cat: "quote", detail: "Norman Bates's unsettling claim" },
  { q: "\"Shane! Come back, Shane!\"", options: ["Shane", "The Searchers", "High Noon", "Rio Bravo"], answer: "Shane", cat: "quote", detail: "Brandon deWilde calling after the gunfighter (1953)" },
  { q: "\"Gentlemen, you can't fight in here. This is the War Room!\"", options: ["Dr. Strangelove", "Fail Safe", "The Manchurian Candidate", "Seven Days in May"], answer: "Dr. Strangelove", cat: "quote", detail: "Peter Sellers as President Muffley" },
  { q: "\"Nature, Mr. Allnut, is what we are put in this world to rise above.\"", options: ["The African Queen", "Casablanca", "Lawrence of Arabia", "Out of Africa"], answer: "The African Queen", cat: "quote", detail: "Katharine Hepburn to Humphrey Bogart" },
  { q: "\"Open the pod bay doors, HAL.\"", options: ["2001: A Space Odyssey", "Alien", "Blade Runner", "Solaris"], answer: "2001: A Space Odyssey", cat: "quote", detail: "Keir Dullea vs. the AI" },
  { q: "What is a \"MacGuffin\" in filmmaking?", options: ["A plot device that drives the story but is ultimately unimportant", "A camera angle from below", "A type of film transition", "An editing technique for flashbacks"], answer: "A plot device that drives the story but is ultimately unimportant", cat: "trivia", detail: "Term popularized by Alfred Hitchcock" },
  { q: "What technique did Citizen Kane pioneer with its cinematography?", options: ["Deep focus", "Jump cuts", "Slow motion", "Split screen"], answer: "Deep focus", cat: "trivia", detail: "Gregg Toland's groundbreaking camera work" },
  { q: "What is \"chiaroscuro\" lighting in cinema?", options: ["Strong contrast between light and dark", "Soft, even lighting", "Natural sunlight only", "Colored gel lighting"], answer: "Strong contrast between light and dark", cat: "trivia", detail: "Borrowed from Renaissance painting, key to film noir" },
  { q: "What is the 180-degree rule?", options: ["Keep the camera on one side of an imaginary line between two characters", "Never point the camera directly up", "Always light from above", "Pan no more than 180 degrees"], answer: "Keep the camera on one side of an imaginary line between two characters", cat: "trivia", detail: "Maintains spatial consistency for the audience" },
  { q: "What is the \"Hays Code\"?", options: ["A moral censorship code for Hollywood films (1930-1968)", "A tax law for film studios", "A union agreement for actors", "A film rating system"], answer: "A moral censorship code for Hollywood films (1930-1968)", cat: "trivia", detail: "Also called the Motion Picture Production Code" },
  { q: "What was the first feature-length talkie?", options: ["The Jazz Singer", "Metropolis", "Sunrise", "The Kid"], answer: "The Jazz Singer", cat: "trivia", detail: "Released in 1927 with synchronized dialogue" },
  { q: "What is \"mise-en-scène\"?", options: ["Everything placed in front of the camera", "The film's soundtrack", "The editing rhythm", "The camera movement"], answer: "Everything placed in front of the camera", cat: "trivia", detail: "French for \"placing on stage\" — sets, lighting, actors, costumes" },
  { q: "What film movement did Breathless (1960) help launch?", options: ["French New Wave", "Italian Neorealism", "German Expressionism", "Dogme 95"], answer: "French New Wave", cat: "trivia", detail: "Godard's debut broke all the rules" },
  { q: "What is the Bechdel Test?", options: ["Whether a film has two women who talk to each other about something other than a man", "A test for racial diversity in casting", "A measure of plot complexity", "A rating for violence in film"], answer: "Whether a film has two women who talk to each other about something other than a man", cat: "trivia", detail: "Named after cartoonist Alison Bechdel" },
  { q: "What camera invention debuted in Rocky (1976)?", options: ["The Steadicam", "The IMAX camera", "The crane shot", "The zoom lens"], answer: "The Steadicam", cat: "trivia", detail: "Invented by Garrett Brown for smooth handheld shots" },
  { q: "What is \"Dogme 95\"?", options: ["A filmmaking movement using only natural light and handheld cameras", "A Danish animation studio", "A film festival in Copenhagen", "A type of lens distortion"], answer: "A filmmaking movement using only natural light and handheld cameras", cat: "trivia", detail: "Founded by Lars von Trier and Thomas Vinterberg" },
  { q: "What does \"auteur theory\" argue?", options: ["The director is the true author of a film", "Films should have no credited director", "Screenwriters are more important than directors", "Great films can only be made with large budgets"], answer: "The director is the true author of a film", cat: "trivia", detail: "Championed by Andrew Sarris and Cahiers du cinéma" },
  { q: "What is a \"whip pan\"?", options: ["A rapid horizontal camera rotation creating motion blur", "A close-up of a character's face", "A slow zoom into an object", "A 360-degree tracking shot"], answer: "A rapid horizontal camera rotation creating motion blur", cat: "trivia", detail: "Often used as a transition between scenes" },
  { q: "What early cinema technique did Georges Méliès pioneer?", options: ["Special effects and trick photography", "The close-up", "Synchronized sound", "Color film"], answer: "Special effects and trick photography", cat: "trivia", detail: "A Trip to the Moon (1902)" },
  { q: "What is a \"Dutch angle\"?", options: ["A tilted camera suggesting unease or disorientation", "A shot from below looking up", "A wide-angle establishing shot", "A handheld shaky camera style"], answer: "A tilted camera suggesting unease or disorientation", cat: "trivia", detail: "Named after German (\"Deutsch\") Expressionism" },
  { q: "Which director transported a 320-ton steamship over a mountain for a film?", options: ["Werner Herzog", "Francis Ford Coppola", "David Lean", "Akira Kurosawa"], answer: "Werner Herzog", cat: "bts", detail: "Fitzcarraldo (1982) — no miniatures, no tricks" },
  { q: "What film was entirely shot inside a real working submarine?", options: ["Das Boot", "The Hunt for Red October", "Crimson Tide", "U-571"], answer: "Das Boot", cat: "bts", detail: "Wolfgang Petersen's claustrophobic 1981 epic" },
  { q: "Which classic film was banned in its home country for 23 years?", options: ["Battle of Algiers (banned in France)", "A Clockwork Orange (UK)", "The Last Temptation of Christ (US)", "Salò (Italy)"], answer: "Battle of Algiers (banned in France)", cat: "bts", detail: "Gillo Pontecorvo's 1966 film about the Algerian War" },
  { q: "Who financed the production of Eraserhead for 5 years?", options: ["David Lynch himself, with AFI grants", "A Hollywood studio", "George Lucas", "Francis Ford Coppola"], answer: "David Lynch himself, with AFI grants", cat: "bts", detail: "Shot intermittently from 1972-1977" },
  { q: "What film was shot at an actual psychiatric institution using real patients as extras?", options: ["One Flew Over the Cuckoo's Nest", "Shutter Island", "12 Monkeys", "A Beautiful Mind"], answer: "One Flew Over the Cuckoo's Nest", cat: "bts", detail: "Filmed at Oregon State Hospital" },
  { q: "Which director refused to use a single special effect in his war film?", options: ["Christopher Nolan for Dunkirk", "Steven Spielberg for Saving Private Ryan", "Sam Mendes for 1917", "Terrence Malick for The Thin Red Line"], answer: "Christopher Nolan for Dunkirk", cat: "bts", detail: "Real planes, real boats, real explosions" },
  { q: "What actress shaved her head on camera for a role?", options: ["Demi Moore for G.I. Jane", "Natalie Portman for V for Vendetta", "Charlize Theron for Mad Max", "Cate Blanchett for Heaven"], answer: "Demi Moore for G.I. Jane", cat: "bts", detail: "The head-shaving scene was done in a single take" },
  { q: "Which silent film's premiere caused audience members to flee the theater?", options: ["Arrival of a Train at La Ciotat (1896)", "Nosferatu", "The Cabinet of Dr. Caligari", "A Trip to the Moon"], answer: "Arrival of a Train at La Ciotat (1896)", cat: "bts", detail: "Legend says viewers thought the train was real" },
  { q: "How did Stanley Kubrick achieve the floating pen effect in 2001?", options: ["Stuck it to a rotating glass pane", "Fishing wire", "Magnets", "Zero-gravity filming"], answer: "Stuck it to a rotating glass pane", cat: "bts", detail: "Simple, elegant practical effect" },
  { q: "Which film used real skeletons in its swimming pool scene?", options: ["Poltergeist", "The Exorcist", "The Omen", "The Amityville Horror"], answer: "Poltergeist", cat: "bts", detail: "Real skeletons were cheaper than plastic props" },
  { q: "Which composer wrote over 500 film scores including The Mission?", options: ["Ennio Morricone", "John Williams", "Hans Zimmer", "Jerry Goldsmith"], answer: "Ennio Morricone", cat: "soundtrack", detail: "The most prolific film composer ever" },
  { q: "Who composed the haunting score for Under the Skin?", options: ["Mica Levi", "Jonny Greenwood", "Trent Reznor", "Cliff Martinez"], answer: "Mica Levi", cat: "soundtrack", detail: "Avant-garde strings for Scarlett Johansson's alien" },
  { q: "Which Radiohead guitarist became an acclaimed film composer?", options: ["Jonny Greenwood", "Ed O'Brien", "Thom Yorke", "Colin Greenwood"], answer: "Jonny Greenwood", cat: "soundtrack", detail: "There Will Be Blood, Phantom Thread, Power of the Dog" },
  { q: "What Kubrick film uses Ligeti's \"Atmosphères\"?", options: ["2001: A Space Odyssey", "The Shining", "A Clockwork Orange", "Eyes Wide Shut"], answer: "2001: A Space Odyssey", cat: "soundtrack", detail: "György Ligeti's avant-garde choral work" },
  { q: "Who scored the Social Network and Gone Girl?", options: ["Trent Reznor and Atticus Ross", "Hans Zimmer", "Cliff Martinez", "Jonny Greenwood"], answer: "Trent Reznor and Atticus Ross", cat: "soundtrack", detail: "Nine Inch Nails frontman turned Oscar winner" },
  { q: "Which Bernard Herrmann score used only strings?", options: ["Psycho", "Vertigo", "North by Northwest", "The Birds"], answer: "Psycho", cat: "soundtrack", detail: "All strings, no brass or woodwinds" },
  { q: "What Philip Glass score accompanies non-narrated images of landscapes and cities?", options: ["Koyaanisqatsi", "The Hours", "Mishima", "Kundun"], answer: "Koyaanisqatsi", cat: "soundtrack", detail: "Glass's hypnotic minimalism for Godfrey Reggio's film" },
  { q: "Who composed the Blade Runner soundtrack?", options: ["Vangelis", "Tangerine Dream", "Hans Zimmer", "Giorgio Moroder"], answer: "Vangelis", cat: "soundtrack", detail: "Synthesizer pioneer's most famous film work" },
  { q: "What is the highest-grossing film of all time adjusted for inflation?", options: ["Gone with the Wind", "Star Wars", "Avatar", "The Sound of Music"], answer: "Gone with the Wind", cat: "boxoffice", detail: "Adjusted: over $3.7 billion in today's dollars" },
  { q: "Which country is the second-largest film market after the US?", options: ["China", "India", "Japan", "UK"], answer: "China", cat: "boxoffice", detail: "Surpassed all other markets in the 2010s" },
  { q: "Which film lost the most money in cinema history?", options: ["Mars Needs Moms", "John Carter", "The 13th Warrior", "47 Ronin"], answer: "Mars Needs Moms", cat: "boxoffice", detail: "Lost over $140 million on a $150M budget" },
  { q: "What 1999 micro-budget film pioneered viral internet marketing?", options: ["The Blair Witch Project", "Pi", "Clerks", "El Mariachi"], answer: "The Blair Witch Project", cat: "boxoffice", detail: "One of the first films marketed primarily online" },
  { q: "What was the first independently produced film to gross $100 million?", options: ["Teenage Mutant Ninja Turtles (1990)", "The Blair Witch Project", "My Big Fat Greek Wedding", "Napoleon Dynamite"], answer: "Teenage Mutant Ninja Turtles (1990)", cat: "boxoffice", detail: "New Line Cinema's surprise hit" },
  { q: "What film has the most Oscar nominations without winning any?", options: ["The Turning Point (1977)", "The Color Purple", "Gangs of New York", "The Thin Red Line"], answer: "The Turning Point (1977)", cat: "oscar", detail: "11 nominations, 0 wins — tied with The Color Purple" },
  { q: "Who was the first Black woman to win Best Actress?", options: ["Halle Berry", "Whoopi Goldberg", "Angela Bassett", "Viola Davis"], answer: "Halle Berry", cat: "oscar", detail: "For Monster's Ball (2002)" },
  { q: "Which Best Picture winner had the shortest runtime?", options: ["Marty (1955) at 90 minutes", "Annie Hall at 93 minutes", "Rocky at 120 minutes", "Moonlight at 111 minutes"], answer: "Marty (1955) at 90 minutes", cat: "oscar", detail: "Ernest Borgnine's gentle butcher" },
  { q: "Who sent a Native American woman to decline his Oscar?", options: ["Marlon Brando", "Dustin Hoffman", "Robert De Niro", "Warren Beatty"], answer: "Marlon Brando", cat: "oscar", detail: "Sacheen Littlefeather declined on his behalf for The Godfather" },
  { q: "What is the only X-rated film to win Best Picture?", options: ["Midnight Cowboy", "A Clockwork Orange", "Last Tango in Paris", "Blue Velvet"], answer: "Midnight Cowboy", cat: "oscar", detail: "Later re-rated to R (1969)" },
  { q: "Which film won Best Picture in a year with no host for the ceremony?", options: ["Green Book (2019 ceremony)", "Parasite", "Nomadland", "The Shape of Water"], answer: "Green Book (2019 ceremony)", cat: "oscar", detail: "Kevin Hart stepped down, no replacement was found" },
  { q: "Who has the most Oscar losses without ever winning?", options: ["Peter O'Toole (8 noms, 0 wins)", "Glenn Close (8 noms)", "Amy Adams (6 noms)", "Albert Finney (5 noms)"], answer: "Peter O'Toole (8 noms, 0 wins)", cat: "oscar", detail: "He received an honorary Oscar in 2003" },
  { q: "What is the only horror film to win Best Picture?", options: ["The Silence of the Lambs", "The Exorcist", "Get Out", "Rosemary's Baby"], answer: "The Silence of the Lambs", cat: "oscar", detail: "Won the Big Five: Picture, Director, Actor, Actress, Screenplay" },
  { q: "Which Walt Disney animated classic won an honorary Oscar with 7 miniature statuettes?", options: ["Snow White and the Seven Dwarfs", "Fantasia", "Pinocchio", "Bambi"], answer: "Snow White and the Seven Dwarfs", cat: "oscar", detail: "One full-size Oscar and seven tiny ones (1939)" },
  { q: "Who is the only person to be nominated for acting, directing, and writing for the same film twice?", options: ["Warren Beatty", "Clint Eastwood", "Orson Welles", "Woody Allen"], answer: "Warren Beatty", cat: "oscar", detail: "For Heaven Can Wait (1978) and Reds (1981)" },
  { q: "Who played all three leads in Dr. Strangelove?", options: ["Peter Sellers", "Alec Guinness", "Terry-Thomas", "Jack Lemmon"], answer: "Peter Sellers", cat: "cast", detail: "Group Captain Mandrake, President Muffley, and Dr. Strangelove" },
  { q: "Which actor stayed in character for the entire 8-month shoot of My Left Foot?", options: ["Daniel Day-Lewis", "Gary Oldman", "Robert De Niro", "Christian Bale"], answer: "Daniel Day-Lewis", cat: "cast", detail: "Crew members had to carry and spoon-feed him" },
  { q: "Who played Toshiro Mifune's role when Seven Samurai was remade as The Magnificent Seven?", options: ["Yul Brynner", "Steve McQueen", "Charles Bronson", "James Coburn"], answer: "Yul Brynner", cat: "cast", detail: "Mifune's Kikuchiyo became the leader role" },
  { q: "Which actress appeared in more Ingmar Bergman films than any other?", options: ["Liv Ullmann", "Bibi Andersson", "Harriet Andersson", "Ingrid Thulin"], answer: "Liv Ullmann", cat: "cast", detail: "Appeared in 10 Bergman films" },
  { q: "Who played Antoine Doinel across five François Truffaut films?", options: ["Jean-Pierre Léaud", "Jean-Paul Belmondo", "Alain Delon", "Gérard Depardieu"], answer: "Jean-Pierre Léaud", cat: "cast", detail: "From The 400 Blows (1959) to Love on the Run (1979)" },
  { q: "Which actor learned to play violin left-handed for a role?", options: ["Robert De Niro for not a violin role — it's actually none", "Daniel Day-Lewis", "Adrien Brody", "Gary Oldman"], answer: "Adrien Brody", cat: "cast", detail: "Brody learned piano for The Pianist, not violin" },
  { q: "Who played the lead in Andrei Tarkovsky's Stalker?", options: ["Alexander Kaidanovsky", "Oleg Yankovsky", "Donatas Banionis", "Nikolai Grinko"], answer: "Alexander Kaidanovsky", cat: "cast", detail: "Kaidanovsky's most famous role" },
  { q: "Who is the only person to win an Oscar for acting in a non-English language performance?", options: ["Sophia Loren", "Roberto Benigni", "Marion Cotillard", "Penélope Cruz"], answer: "Sophia Loren", cat: "cast", detail: "For Two Women (1962) — performed in Italian" }
];

// ── UTILITIES ──────────────────────────────────────────────────

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}

// Deep clone a question so no references are shared
function cloneQuestion(q) {
  return {
    q: q.q,
    options: [...q.options],
    answer: q.answer,
    cat: q.cat,
    detail: q.detail,
  };
}

function buildQuestions() {
  // Deep clone and filter to only valid 4-option questions
  const easy = shuffle(EASY_QUESTIONS.filter(q => q.options && q.options.length === 4).map(cloneQuestion));
  const medium = shuffle(MEDIUM_QUESTIONS.filter(q => q.options && q.options.length === 4).map(cloneQuestion));
  const hard = shuffle(HARD_QUESTIONS.filter(q => q.options && q.options.length === 4).map(cloneQuestion));

  // Difficulty ramp:
  // Q1–4:   all easy
  // Q5–8:   easy/medium mix
  // Q9–16:  medium
  // Q17+:   medium/hard mix then pure hard
  const phase1 = easy.slice(0, 4);                           // 4 easy
  const phase2 = shuffle([...easy.slice(4, 10), ...medium.slice(0, 6)]);  // easy + medium mix
  const phase3 = medium.slice(6);                             // rest of medium
  const phase4 = hard;                                        // all hard

  const all = [...phase1, ...phase2, ...phase3, ...phase4];

  // Shuffle each question's options independently
  for (let i = 0; i < all.length; i++) {
    all[i].options = shuffle(all[i].options);
  }

  return all;
}

const CAT_ICONS = {
  year: "*", cast: "*", director: "*", oscar: "*", quote: "*", trivia: "*", bts: "*", soundtrack: "*", boxoffice: "*",
};
const CAT_LABELS = {
  year: "RELEASE", cast: "CAST", director: "DIRECTOR", oscar: "AWARDS", quote: "QUOTES", trivia: "TRIVIA", bts: "BEHIND THE SCENES", soundtrack: "SOUNDTRACK", boxoffice: "BOX OFFICE",
};
const CAT_COLORS = {
  year: "#8A8060", cast: "#E8B830", director: "#8A8060", oscar: "#E8B830", quote: "#8A8060", trivia: "#E8B830", bts: "#8A8060", soundtrack: "#E8B830", boxoffice: "#8A8060",
};

export default function Reel() {
  const [gameState, setGameState] = useState("menu"); // menu, playing, wrong, gameover
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [chain, setChain] = useState(0);
  const [bestChain, setBestChain] = useState(() => {
    try { return parseInt(localStorage.getItem("reel_bestChain")) || 0; } catch { return 0; }
  });
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [history, setHistory] = useState([]);
  const [pastReels, setPastReels] = useState(() => {
    try { const s = localStorage.getItem("reel_pastReels"); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [pulse, setPulse] = useState(false);
  const timerRef = useRef(null);

  // Persist to localStorage
  useEffect(() => {
    try { localStorage.setItem("reel_pastReels", JSON.stringify(pastReels)); } catch {}
  }, [pastReels]);
  useEffect(() => {
    try { localStorage.setItem("reel_bestChain", String(bestChain)); } catch {}
  }, [bestChain]);

  const startGame = useCallback(() => {
    try {
      const built = buildQuestions();
      setQuestions(built);
      setCurrent(0);
      setChain(0);
      setSelected(null);
      setShowResult(false);
      setHistory([]);
      setGameState("playing");
      setAnimateIn(false);
      setTimeout(() => setAnimateIn(true), 50);
    } catch (e) {
      console.error("startGame error:", e);
      alert("Error starting game: " + e.message);
    }
  }, []);

  const handleSelect = useCallback((option) => {
    if (showResult) return;
    const q = questions[current];
    const correct = option === q.answer;
    setSelected(option);
    setIsCorrect(correct);
    setShowResult(true);

    setHistory((h) => [...h, { q: q.q, answer: q.answer, picked: option, correct, cat: q.cat, detail: q.detail }]);

    if (correct) {
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
      timerRef.current = setTimeout(() => {
        const newChain = chain + 1;
        setChain(newChain);
        if (newChain > bestChain) setBestChain(newChain);

        if (current + 1 >= questions.length) {
          setGameState("gameover");
        } else {
          setCurrent((c) => c + 1);
          setSelected(null);
          setShowResult(false);
          setAnimateIn(false);
          setTimeout(() => setAnimateIn(true), 50);
        }
      }, 1200);
    } else {
      timerRef.current = setTimeout(() => {
        setGameState("wrong");
      }, 1800);
    }
  }, [showResult, questions, current, chain, bestChain]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // Record completed game to session history
  const recordedRef = useRef(false);
  useEffect(() => {
    if ((gameState === "wrong" || gameState === "gameover") && !recordedRef.current) {
      recordedRef.current = true;
      setPastReels((prev) => [...prev, chain]);
    }
    if (gameState === "playing") {
      recordedRef.current = false;
    }
  }, [gameState, chain]);

  const currentQ = questions[current];
  const catColor = currentQ ? CAT_COLORS[currentQ.cat] : "#E8B830";

  // Chain milestones
  const getMilestone = (c) => {
    if (c >= 55) return { title: "CINEMA LEGEND" };
    if (c >= 45) return { title: "CINEMA TITAN" };
    if (c >= 40) return { title: "ELITE CINEPHILE" };
    if (c >= 35) return { title: "SCREEN SAVANT" };
    if (c >= 30) return { title: "CRITIC" };
    if (c >= 26) return { title: "CINEPHILE" };
    if (c >= 22) return { title: "CINEASTE" };
    if (c >= 18) return { title: "SUPERFAN" };
    if (c >= 15) return { title: "FILM FREAK" };
    if (c >= 12) return { title: "CINE GEEK" };
    if (c >= 9) return { title: "FILM BUFF" };
    if (c >= 6) return { title: "FAN" };
    if (c >= 4) return { title: "MOVIEGOER" };
    if (c >= 2) return { title: "ROOKIE" };
    return { title: "CASUAL VIEWER" };
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#141410",
      color: "#E8B830",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {pulse && (
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 98,
          background: "radial-gradient(ellipse at center, rgba(212,196,168,0.06) 0%, transparent 60%)",
          animation: "pulseGlow 0.4s ease-out",
        }} />
      )}

      <div style={{
        maxWidth: 440, margin: "0 auto", padding: "40px 24px",
        position: "relative", zIndex: 10,
      }}>

        {/* ═══ MENU ═══ */}
        {gameState === "menu" && (
          <div style={{ textAlign: "center", paddingTop: 80 }}>
            <div style={{
              display: "inline-block", padding: "6px 16px", borderRadius: 20,
              background: "#8A806020", border: "1px solid #8A806040",
              fontSize: 11, fontFamily: "'Space Mono', monospace", color: "#8A8060",
              letterSpacing: 2, marginBottom: 32,
            }}>
              LIGHTS. CAMERA. TRIVIA.
            </div>

            <h1 style={{
              fontSize: 72, fontWeight: 800, fontFamily: "'Syne', sans-serif",
              color: "#E8B830", margin: "0 0 12px", lineHeight: 0.9, letterSpacing: -2,
            }}>reel</h1>

            <p style={{
              fontSize: 16, fontFamily: "'DM Sans', sans-serif", color: "#8A8060",
              lineHeight: 1.6, maxWidth: 280, margin: "0 auto 48px", fontWeight: 400,
            }}>
              How long can you keep the chain alive?
            </p>

            <button onClick={startGame} style={{
              background: "#E8B830", color: "#141410", border: "none",
              padding: "16px 56px", borderRadius: 40,
              fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif",
              letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; }}
            >
              PLAY
            </button>

            {bestChain > 0 && (
              <div style={{
                marginTop: 32, fontSize: 13, fontFamily: "'Space Mono', monospace", color: "#8A8060",
              }}>
                best: <span style={{ color: "#E8B830" }}>{bestChain}</span>
              </div>
            )}
          </div>
        )}

        {/* ═══ PLAYING ═══ */}
        {gameState === "playing" && currentQ && (
          <div style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.4s ease",
          }}>
            <div style={{
              display: "flex", justifyContent: "flex-end", alignItems: "center",
              marginBottom: 24,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
                <span style={{
                  fontSize: 28, fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#E8B830",
                }}>{chain}</span>
              </div>
            </div>

            <div style={{ height: 3, background: "#E8B83015", borderRadius: 2, marginBottom: 32, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${Math.min(((current) / Math.max(questions.length - 1, 1)) * 100, 100)}%`,
                background: "#E8B830", borderRadius: 2, transition: "width 0.5s ease",
              }} />
            </div>

            <div style={{
              background: "#E8B83008", borderRadius: 16, padding: "36px 28px",
              marginBottom: 20, border: "1px solid #E8B83010",
            }}>
              <h2 style={{
                fontSize: 22, fontWeight: 600, fontFamily: "'Syne', sans-serif",
                color: "#E8B830", margin: 0, lineHeight: 1.35, textAlign: "center",
              }}>
                {currentQ.q}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentQ.options.map((opt, i) => {
                let bg = "#E8B83006";
                let border = "#E8B83018";
                let color = "#E8B830";
                let weight = 500;

                if (showResult) {
                  if (opt === currentQ.answer) {
                    bg = "#E8B830"; border = "#E8B830"; color = "#141410"; weight = 600;
                  } else if (opt === selected && !isCorrect) {
                    bg = "#C8503A"; border = "#C8503A"; color = "#E8B830"; weight = 600;
                  } else {
                    bg = "#E8B83004"; border = "#E8B83008"; color = "#E8B83022";
                  }
                }

                return (
                  <button key={`${current}-${i}`} onClick={() => handleSelect(opt)} style={{
                    background: bg, border: `1.5px solid ${border}`,
                    borderRadius: 12, color, fontWeight: weight,
                    padding: "16px 20px", fontSize: 16, fontFamily: "'DM Sans', sans-serif",
                    cursor: showResult ? "default" : "pointer",
                    textAlign: "left", transition: "all 0.25s ease",
                    display: "flex", alignItems: "center", gap: 14,
                  }}
                  onMouseEnter={(e) => {
                    if (!showResult) { e.target.style.borderColor = "#E8B83050"; e.target.style.background = "#E8B83010"; }
                  }}
                  onMouseLeave={(e) => {
                    if (!showResult && opt !== selected) { e.target.style.borderColor = "#E8B83018"; e.target.style.background = "#E8B83006"; }
                  }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: showResult && opt === currentQ.answer ? "#14141020" : showResult && opt === selected && !isCorrect ? "#14141020" : "#E8B83010",
                      border: `1px solid ${showResult && (opt === currentQ.answer || (opt === selected && !isCorrect)) ? "#14141015" : "#E8B83015"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontFamily: "'Space Mono', monospace", fontWeight: 700,
                      color: showResult && (opt === currentQ.answer || (opt === selected && !isCorrect)) ? "#141410" : "#8A8060",
                      flexShrink: 0,
                    }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div style={{
                textAlign: "center", marginTop: 20,
                fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic",
                color: "#8A8060", animation: "fadeIn 0.3s ease",
              }}>
                {currentQ.detail}
              </div>
            )}
          </div>
        )}

        {/* ═══ WRONG / GAME OVER ═══ */}
        {(gameState === "wrong" || gameState === "gameover") && (
          <div style={{
            textAlign: "center", paddingTop: 48,
            animation: "fadeIn 0.5s ease", position: "relative",
          }}>
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 200, overflow: "hidden" }}>
              <div style={{
                position: "absolute", left: "50%", top: "28%",
                width: 200, height: 200, transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(212,196,168,0.6) 0%, rgba(230,234,215,0) 70%)",
                animation: "confettiFlash 0.3s ease-out forwards",
              }} />
              {Array.from({ length: 120 }).map((_, i) => {
                const angle = (i / 120) * 360 + (Math.random() - 0.5) * 30;
                const dist = 50 + Math.random() * 80;
                const tx = Math.cos(angle * Math.PI / 180) * dist;
                const ty = Math.sin(angle * Math.PI / 180) * dist - 15;
                const size = 2 + Math.random() * 8;
                const colors = ["#E8B830", "#8A8060", "#C8503A", "#E8B830", "#8A8060", "#C8503A"];
                const color = colors[i % colors.length];
                const dur = 0.25 + Math.random() * 0.35;
                const delay = Math.random() * 0.06;
                const rot = Math.random() * 1080;
                const shapes = ["50%", "0", "50% 0 50% 50%"];
                return (
                  <div key={`conf-${i}`} style={{
                    position: "absolute", left: "50%", top: "28%",
                    width: size, height: size * (0.8 + Math.random() * 1.2),
                    background: color, borderRadius: shapes[i % shapes.length],
                    opacity: 1, transform: "translate(-50%, -50%) scale(0)",
                    animation: `confettiBurst ${dur}s cubic-bezier(.15,.8,.2,1) ${delay}s forwards`,
                    ["--tx"]: `${tx}vw`, ["--ty"]: `${ty}vh`, ["--rot"]: `${rot}deg`,
                  }} />
                );
              })}
            </div>

            <div style={{
              display: "inline-block", padding: "5px 14px", borderRadius: 14,
              background: "#E8B83010", border: "1px solid #E8B83018",
              fontSize: 11, fontFamily: "'Space Mono', monospace", color: "#8A8060",
              letterSpacing: 2, marginBottom: 24,
            }}>
              YOUR REEL SCORE
            </div>

            <div style={{
              fontSize: 96, fontFamily: "'Space Mono', monospace", fontWeight: 700,
              color: "#E8B830", lineHeight: 1, marginBottom: 4,
            }}>{chain}</div>

            {(() => {
              const m = getMilestone(chain);
              return (
                <div style={{
                  fontSize: 14, fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  letterSpacing: 4, color: "#8A8060", marginBottom: 8, textTransform: "uppercase",
                }}>Your Rank: {m.title}</div>
              );
            })()}

            {chain > bestChain - 1 && chain > 0 && (
              <div style={{
                display: "inline-block", padding: "4px 12px", borderRadius: 10,
                background: "#E8B83012", fontSize: 12, fontFamily: "'Space Mono', monospace",
                color: "#E8B830", letterSpacing: 1, marginBottom: 40,
              }}>
                ★ NEW BEST
              </div>
            )}

            {pastReels.length > 0 && (() => {
              const last5 = pastReels.slice(-5);
              const reversed = [...last5].reverse();
              const allTimeBest = Math.max(...pastReels);
              const bestInLast5 = Math.max(...last5);
              const showBestBar = allTimeBest > bestInLast5;
              const maxVal = Math.max(allTimeBest, 1);
              return (
                <div style={{
                  background: "#E8B83006", borderRadius: 16, padding: "20px 24px",
                  marginBottom: 32, textAlign: "left", border: "1px solid #E8B83008",
                }}>
                  <div style={{
                    fontSize: 11, letterSpacing: 2, color: "#8A8060",
                    textTransform: "uppercase", marginBottom: 16, fontFamily: "'Space Mono', monospace",
                  }}>Your Last Reels</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {reversed.map((score, i) => {
                      const origIndex = last5.length - 1 - i;
                      const gameNum = pastReels.length - last5.length + origIndex + 1;
                      const isLatest = i === 0;
                      return (
                        <div key={`session-${i}`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{
                            fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#8A8060",
                            minWidth: 20, textAlign: "right",
                          }}>{gameNum}</span>
                          <div style={{ flex: 1, height: 32, background: "#E8B83008", borderRadius: 8, overflow: "hidden" }}>
                            <div style={{
                              height: "100%", width: `${Math.max((score / maxVal) * 100, 12)}%`,
                              background: isLatest ? "#E8B830" : "#8A8060",
                              borderRadius: 8, display: "flex", alignItems: "center",
                              justifyContent: "flex-end", paddingRight: 10,
                              transition: "width 0.6s ease",
                            }}>
                              <span style={{
                                fontFamily: "'Space Mono', monospace", fontSize: 12,
                                fontWeight: 700, color: "#141410",
                              }}>{score}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {showBestBar && (
                      <div style={{
                        display: "flex", alignItems: "center", gap: 12, marginTop: 4,
                        borderTop: "1px solid #E8B83010", paddingTop: 12,
                      }}>
                        <span style={{
                          fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#E8B830",
                          minWidth: 20, textAlign: "right",
                        }}>★</span>
                        <div style={{ flex: 1, height: 32, background: "#E8B83008", borderRadius: 8, overflow: "hidden" }}>
                          <div style={{
                            height: "100%", width: `${Math.max((allTimeBest / maxVal) * 100, 12)}%`,
                            background: "#E8B830", borderRadius: 8, opacity: 0.6,
                            display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 10,
                          }}>
                            <span style={{
                              fontFamily: "'Space Mono', monospace", fontSize: 12,
                              fontWeight: 700, color: "#141410",
                            }}>{allTimeBest}</span>
                          </div>
                        </div>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#8A8060", letterSpacing: 1 }}>BEST</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* All-time best */}
            {pastReels.length > 0 && (() => {
              const allTimeBest = Math.max(...pastReels);
              const bestRank = getMilestone(allTimeBest);
              return (
                <div style={{
                  background: "#E8B83006", borderRadius: 16, padding: "20px 24px",
                  marginBottom: 32, textAlign: "center", border: "1px solid #E8B83008",
                }}>
                  <div style={{
                    fontSize: 11, letterSpacing: 2, color: "#8A8060",
                    textTransform: "uppercase", marginBottom: 16, fontFamily: "'Space Mono', monospace",
                  }}>All-Time Best</div>
                  <div style={{
                    fontSize: 48, fontFamily: "'Space Mono', monospace", fontWeight: 700,
                    color: "#E8B830", lineHeight: 1, marginBottom: 4,
                  }}>{allTimeBest}</div>
                  <div style={{
                    fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    letterSpacing: 3, color: "#8A8060", textTransform: "uppercase",
                  }}>{bestRank.title}</div>
                </div>
              );
            })()}

            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={startGame} style={{
                background: "#E8B830", color: "#141410", border: "none",
                padding: "14px 36px", borderRadius: 30,
                fontSize: 14, fontWeight: 700, fontFamily: "'Syne', sans-serif",
                letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.target.style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; }}
              >
                PLAY AGAIN
              </button>
              <button onClick={() => {
                const m = getMilestone(chain);
                const url = window.location.href;
                const text = `I played Reel and scored ${chain}. I am a legit ${m.title}. How about you?`;
                if (navigator.share) {
                  navigator.share({ title: "Reel", text, url }).catch(() => {});
                } else if (navigator.clipboard) {
                  navigator.clipboard.writeText(text + " " + url);
                }
              }} style={{
                background: "transparent", color: "#E8B830",
                border: "1.5px solid #E8B83040",
                padding: "14px 28px", borderRadius: 30,
                fontSize: 14, fontWeight: 700, fontFamily: "'Syne', sans-serif",
                letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = "#E8B83080"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "#E8B83040"; }}
              >
                SHARE
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0; }
          30% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes confettiBurst {
          0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
          10% { transform: translate(calc(-50% + var(--tx) * 0.5), calc(-50% + var(--ty) * 0.5)) scale(1.3) rotate(calc(var(--rot) * 0.4)); opacity: 1; }
          60% { transform: translate(calc(-50% + var(--tx) * 0.9), calc(-50% + var(--ty) * 0.9)) scale(0.8) rotate(calc(var(--rot) * 0.8)); opacity: 0.8; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty) + 10vh)) scale(0) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes confettiFlash {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
          15% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
        }
        ::selection { background: #E8B83030; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #141410; }
        ::-webkit-scrollbar-thumb { background: #8A8060; border-radius: 4px; }
      `}</style>
    </div>
  );
}
