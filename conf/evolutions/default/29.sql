# --- !Ups

ALTER TABLE images ADD COLUMN copyright VARCHAR DEFAULT NULL;


# --- !Downs

ALTER TABLE images DROP COLUMN copyright;
