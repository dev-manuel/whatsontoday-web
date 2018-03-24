# --- !Ups

ALTER TABLE event
	ADD CONSTRAINT event_location_fk 
	FOREIGN KEY (location_fk) 
	REFERENCES location 
	ON DELETE CASCADE;

ALTER TABLE event
	ADD CONSTRAINT location_creator_fk 
	FOREIGN KEY (creator_fk) 
	REFERENCES users
	ON DELETE CASCADE;

ALTER TABLE category
	ADD CONSTRAINT category_parent_fk
	FOREIGN KEY (parent_fk) 
	REFERENCES category
	ON DELETE CASCADE;
	
ALTER TABLE participant
	ADD CONSTRAINT participant_user_fk
	FOREIGN KEY (user_fk) 
	REFERENCES users
	ON DELETE CASCADE;
	
ALTER TABLE participant
	ADD CONSTRAINT participant_event_fk
	FOREIGN KEY (event_fk) 
	REFERENCES event
	ON DELETE CASCADE;

ALTER TABLE rating
	ADD CONSTRAINT rating_user_fk
	FOREIGN KEY (user_fk) 
	REFERENCES users
	ON DELETE CASCADE;

# --- !Downs

ALTER TABLE event
	DROP CONSTRAINT event_location_fk;

ALTER TABLE event
	DROP CONSTRAINT location_creator_fk;

ALTER TABLE category
	DROP CONSTRAINT category_parent_fk;
	
ALTER TABLE participant
	DROP CONSTRAINT participant_user_fk;
	
ALTER TABLE participant
	DROP CONSTRAINT participant_event_fk;

ALTER TABLE rating
	DROP CONSTRAINT rating_user_fk;