# --- !Ups

ALTER TABLE event ADD COLUMN price_min NUMERIC(10, 2) DEFAULT NULL;
ALTER TABLE event ADD COLUMN price_max NUMERIC(10, 2) DEFAULT NULL;


# --- !Downs

ALTER TABLE event DROP COLUMN price_min;
ALTER TABLE event DROP COLUMN price_max;
