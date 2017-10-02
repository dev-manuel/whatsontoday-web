# --- !Ups

CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR
);

# --- !Downs

DROP TABLE IF EXISTS test;