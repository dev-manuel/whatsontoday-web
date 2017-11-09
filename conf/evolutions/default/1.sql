# --- !Ups

CREATE TABLE event (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR,
    fromtime TIMESTAMP,
    totime TIMESTAMP,
    creator_fk BIGSERIAL,
    category_fk BIGSERIAL
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR,
    pwhash VARCHAR,
    email VARCHAR
);

CREATE TABLE category (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR,
    parent_fk BIGSERIAL
);

CREATE TABLE participant (
    user_fk BIGSERIAL,
    event_fk BIGSERIAL
);

# --- !Downs

DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS participant;
DROP TABLE IF EXISTS category;