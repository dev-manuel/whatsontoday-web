# --- !Ups

ALTER TABLE users ADD COLUMN pwsalt VARCHAR (255);
ALTER TABLE users ADD COLUMN pwhasher VARCHAR (255);

CREATE TABLE images (
id BIGSERIAL PRIMARY KEY,
name VARCHAR,
data bytea
);

# --- !Downs

ALTER TABLE users DROP COLUMN pwsalt;
ALTER TABLE users DROP COLUMN pwhasher;

DROP TABLE IF EXISTS images;
