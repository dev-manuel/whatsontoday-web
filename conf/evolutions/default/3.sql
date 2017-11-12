# --- !Ups

CREATE TABLE rating (
    id BIGSERIAL PRIMARY KEY,
    rating FLOAT,
    user_fk BIGSERIAL,
    entity_fk BIGSERIAL
);

CREATE TABLE location (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR,
    latitude FLOAT,
    longitude FLOAT
);

ALTER TABLE event
	ADD COLUMN location_fk BIGSERIAL;

# --- !Downs

ALTER TABLE event
	DROP COLUMN IF EXISTS location_fk;
DROP TABLE IF EXISTS rating;
DROP TABLE IF EXISTS location;