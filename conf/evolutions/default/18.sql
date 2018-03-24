# --- !Ups

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX event_trgm_idx ON event USING GIST (name gist_trgm_ops);

CREATE INDEX location_trgm_idx ON location USING GIST (name gist_trgm_ops);

CREATE INDEX organizer_trgm_idx ON organizer USING GIST (name gist_trgm_ops);

# --- !Downs

DROP INDEX event_trgm_idx;

DROP INDEX location_trgm_idx;

DROP INDEX organizer_trgm_idx;

DROP EXTENSION IF EXISTS pg_trgm;
