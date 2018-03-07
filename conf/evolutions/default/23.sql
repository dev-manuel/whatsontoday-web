# --- !Ups

ALTER TABLE location ADD COLUMN country varchar NOT NULL DEFAULT '';
ALTER TABLE location ADD COLUMN city varchar NOT NULL DEFAULT '';
ALTER TABLE location ADD COLUMN street varchar NOT NULL DEFAULT '';

# --- !Downs

ALTER TABLE location DROP COLUMN country;
ALTER TABLE location DROP COLUMN city;
ALTER TABLE location DROP COLUMN street;
