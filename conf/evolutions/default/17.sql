# --- !Ups

ALTER TABLE event ADD COLUMN description varchar DEFAULT '' NOT NULL;

# --- !Downs

ALTER TABLE event DROP COLUMN description;
