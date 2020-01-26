DROP DATABASE IF EXISTS animals_db;
CREATE DATABASE animals_db;

USE animals_db;

DROP TABLE people;
CREATE TABLE people (
	name VARCHAR(200) NOT NULL,
	has_pet BOOLEAN NOT NULL,
	pet_name VARCHAR(50),
	pet_age INTEGER	
);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES 
	("Bob Ross", false, null, null),
    ("Young Jon", true, "Fluffernutter", 6)
;


SELECT * FROM people;