# --- !Ups

ALTER TABLE location ADD COLUMN zip varchar DEFAULT NULL;

# --- !Downs

ALTER TABLE location DROP COLUMN zip;