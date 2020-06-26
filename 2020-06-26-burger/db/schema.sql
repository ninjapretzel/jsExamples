DROP DATABASE IF EXISTS burgerApp;
CREATE DATABASE burgerApp;
USE burgerApp;

CREATE TABLE burger (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
	devoured boolean NOT NULL,
	PRIMARY KEY id
);
