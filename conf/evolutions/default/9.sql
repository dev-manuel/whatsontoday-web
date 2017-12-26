# --- !Ups

CREATE TABLE hasimages (
image_fk BIGSERIAL,
entity_fk BIGSERIAL,
entity_type smallint
);

ALTER TABLE hasimages
      ADD CONSTRAINT hasimages_image_fk
      FOREIGN KEY (image_fk)
      REFERENCES images
      ON DELETE CASCADE;


# --- !Downs

DROP TABLE IF EXISTS hasimages;
