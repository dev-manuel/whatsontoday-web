# --- !Ups

UPDATE images SET content_type = 'image/jpg' WHERE content_type IS NULL;

ALTER TABLE images ALTER COLUMN content_type SET DEFAULT 'image/jpg';
ALTER TABLE images ALTER COLUMN content_type SET NOT NULL;

# --- !Downs

ALTER TABLE images ALTER COLUMN content_type DROP NOT NULL;
ALTER TABLE images ALTER COLUMN content_type SET DEFAULT NULL;
