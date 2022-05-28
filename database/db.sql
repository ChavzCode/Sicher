CREATE DATABASE sicher;

--Users Table
CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(60) NOT NULL,
    PRIMARY KEY(id)
);

--User Links Table
CREATE TABLE links(
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    creationDate TIMESTAMP NOT NULL DEFAULT current_timestamp,
    user_id INT(11) NOT NULL,
    PRIMARY KEY(id),
    KEY user_id (user_id),
    CONSTRAINT user_FK
    FOREIGN KEY (user_id)
    REFERENCES users (id)
);

--User Tokens
CREATE TABLE API(
    id INT(11) NOT NULL AUTO_INCREMENT,
    userToken VARCHAR(60) NOT NULL,
    updatedTime DATETIME NOT NULL DEFAULT current_timestamp,
    availabilityUntil DATETIME NOT NULL,
    userApi INT(11) NOT NULL,
    PRIMARY KEY(id),
    KEY userApi (userApi),
    CONSTRAINT userApi_FK
    FOREIGN KEY (userApi)
    REFERENCES users (id)
);

--Shared Links Imported by Api
CREATE TABLE shared(
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    ulr VARCHAR(255) NOT NULL,
    description TEXT,
    creationDate TIMESTAMP NOT NULL DEFAULT current_timestamp,
    sharedBy VARCHAR(60) NOT NULL,
    clientId INT(11) NOT NULL,
    PRIMARY KEY(id),
    KEY clientId (clientId),
    CONSTRAINT client_FK
    FOREIGN KEY (clientId)
    REFERENCES users (id)
);




