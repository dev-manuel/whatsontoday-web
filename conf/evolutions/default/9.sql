# --- !Ups

ALTER TABLE users ADD COLUMN provider_id VARCHAR (255);
ALTER TABLE users ADD COLUMN provider_key VARCHAR (255);

CREATE TABLE imageentity (
image_fk BIGSERIAL,
entity_fk BIGSERIAL,
entity_type smallint
);

ALTER TABLE imageentity
    ADD CONSTRAINT hasimages_image_fk
    FOREIGN KEY (image_fk)
    REFERENCES images
    ON DELETE CASCADE;


# --- !Downs

ALTER TABLE users DROP COLUMN provider_id;
ALTER TABLE users DROP COLUMN provider_key;

DROP TABLE IF EXISTS imageentity;
