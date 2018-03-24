# --- !Ups

ALTER TABLE images ADD COLUMN content_type varchar DEFAULT NULL;

# --- !Downs

ALTER TABLE images DROP COLUMN content_type;
