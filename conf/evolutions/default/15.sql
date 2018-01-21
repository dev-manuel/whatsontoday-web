# --- !Ups

ALTER TABLE users ADD COLUMN avatar varchar DEFAULT NULL;

ALTER TABLE organizer ADD COLUMN avatar varchar DEFAULT NULL;

# --- !Downs

ALTER TABLE users DROP COLUMN avatar;

ALTER TABLE organizer DROP COLUMN avatar;
