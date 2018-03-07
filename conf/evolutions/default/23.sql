# --- !Ups

ALTER TABLE location ADD COLUMN country varchar NOT NULL DEFAULT '';
ALTER TABLE location ADD COLUMN city varchar NOT NULL DEFAULT '';
ALTER TABLE location ADD COLUMN street varchar NOT NULL DEFAULT '';

# --- !Downs

ALTER TABLE location DROP COLUMN country varchar;
ALTER TABLE location DROP COLUMN city varchar;
ALTER TABLE location DROP COLUMN street varchar;
