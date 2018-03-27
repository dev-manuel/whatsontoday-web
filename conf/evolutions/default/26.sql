# --- !Ups

ALTER TABLE images ADD COLUMN creator_fk BIGINT REFERENCES login ON DELETE CASCADE DEFAULT NULL;

# --- !Downs

ALTER TABLE images DROP COLUMN creator_fk;
