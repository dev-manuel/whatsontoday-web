# --- !Ups

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

DROP TABLE IF EXISTS imageentity;
