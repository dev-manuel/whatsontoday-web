# --- !Ups

ALTER TABLE location ALTER COLUMN latitude DROP NOT NULL;
ALTER TABLE location ALTER COLUMN longitude DROP NOT NULL;


# --- !Downs

UPDATE location SET latitude = 0 WHERE latitude IS NULL;
UPDATE location SET longitude = 0 WHERE longitude IS NULL;
ALTER TABLE location ALTER COLUMN latitude SET NOT NULL;
ALTER TABLE location ALTER COLUMN longitude SET NOT NULL;