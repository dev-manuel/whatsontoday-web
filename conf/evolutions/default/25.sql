# --- !Ups

ALTER TABLE event ALTER COLUMN totime DROP NOT NULL;

# --- !Downs

UPDATE event SET totime = fromtime WHERE totime IS NULL;
ALTER TABLE event ALTER COLUMN totime SET NOT NULL;
