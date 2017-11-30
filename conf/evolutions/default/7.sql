# --- !Ups

ALTER TABLE event DROP COLUMN category_fk;

CREATE TABLE eventcategory (
    category_fk BIGSERIAL,
    event_fk BIGSERIAL
);

ALTER TABLE eventcategory
	ADD CONSTRAINT eventcategory_event 
	FOREIGN KEY (event_fk) 
	REFERENCES event
	ON DELETE CASCADE;
	
ALTER TABLE eventcategory
	ADD CONSTRAINT eventcategory_category
	FOREIGN KEY (category_fk) 
	REFERENCES category
	ON DELETE CASCADE;

# --- !Downs

DROP TABLE IF EXISTS eventcategory;

ALTER TABLE event ADD COLUMN category_fk BIGSERIAL;