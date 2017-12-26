# --- !Ups

ALTER TABLE users ADD COLUMN provider_id VARCHAR (255);
ALTER TABLE users ADD COLUMN provider_key VARCHAR (255);

# --- !Downs

ALTER TABLE users DROP COLUMN provider_id;
ALTER TABLE users DROP COLUMN provider_key;
