# --- !Ups

INSERT INTO login (pwhash,email,provider_id,provider_key)
       VALUES ('c','admincreator@whats-on.co','credentials','admincreator@whats-on.co');

INSERT INTO organizer (login_fk,name)
       SELECT l.id,'admincreator' FROM login l WHERE l.email = 'admincreator@whats-on.co';

ALTER TABLE event
      DROP CONSTRAINT location_creator_fk;

UPDATE event p SET creator_fk = (
       SELECT o.id FROM organizer o WHERE o.name = 'admincreator');

ALTER TABLE event
      ADD CONSTRAINT event_creator_fk
      FOREIGN KEY (creator_fk)
      REFERENCES organizer
      ON DELETE CASCADE;

# --- !Downs

ALTER TABLE event
      DROP CONSTRAINT event_creator_fk;

UPDATE event p SET creator_fk = (
       SELECT l.id FROM login l WHERE l.email = 'admin@whats-on.co');

ALTER TABLE event
      ADD CONSTRAINT location_creator_fk
      FOREIGN KEY (creator_fk)
      REFERENCES login
      ON DELETE CASCADE;

DELETE FROM organizer WHERE name = 'admincreator';
DELETE FROM login WHERE email = 'admincreator@whats-on.co';
