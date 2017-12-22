# --- !Ups

CREATE TABLE images (
       id BIGSERIAL PRIMARY KEY,
       name VARCHAR,
       data bytea
);

# --- !Downs

DROP TABLE IF EXISTS images;
