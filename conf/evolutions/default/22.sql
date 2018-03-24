# --- !Ups

ALTER TABLE imageentity ADD COLUMN tag varchar DEFAULT NULL;

# --- !Downs

ALTER TABLE imageentity DROP COLUMN tag;
