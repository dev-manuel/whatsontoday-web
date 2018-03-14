# --- !Ups

ALTER TABLE images DROP COLUMN name;

# --- !Downs

ALTER TABLE images ADD COLUMN name varchar DEFAULT '';
