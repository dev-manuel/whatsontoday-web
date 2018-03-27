ALTER TABLE event ADD COLUMN short_description varchar NOT NULL DEFAULT '';
ALTER TABLE event ALTER COLUMN totime DROP NOT NULL;


# --- !Downs

ALTER TABLE event DROP COLUMN short_description;
UPDATE event SET totime = fromtime WHERE totime IS NULL;
ALTER TABLE event ALTER COLUMN totime SET NOT NULL;
