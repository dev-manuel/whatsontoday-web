# --- !Ups

ALTER TABLE event ADD COLUMN short_description varchar NOT NULL DEFAULT '';

# --- !Downs

ALTER TABLE event DROP COLUMN short_description;
