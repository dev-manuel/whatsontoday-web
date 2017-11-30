# --- !Ups

ALTER TABLE rating ADD COLUMN entity_type smallint;

# --- !Downs

ALTER TABLE rating DROP COLUMN entity_type;