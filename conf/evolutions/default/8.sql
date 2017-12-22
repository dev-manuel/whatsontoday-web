# --- !Ups

ALTER TABLE users ADD COLUMN pwsalt VARCHAR (255);
ALTER TABLE users ADD COLUMN pwhasher VARCHAR (255);

# --- !Downs

ALTER TABLE users DROP COLUMN pwsalt;
ALTER TABLE users DROP COLUMN pwhasher;
