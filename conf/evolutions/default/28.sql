# --- !Ups

ALTER TABLE event
      DROP CONSTRAINT event_creator_fk;

UPDATE event e SET creator_fk = (
       SELECT l.id FROM login l
       JOIN organizer o ON l.id = o.login_fk
       WHERE e.creator_fk=o.id);

ALTER TABLE event
      ADD CONSTRAINT event_creator_fk
      FOREIGN KEY (creator_fk)
      REFERENCES login
      ON DELETE CASCADE;


ALTER TABLE participant
      DROP CONSTRAINT participant_user_fk;

ALTER TABLE participant RENAME COLUMN user_fk TO login_fk;

UPDATE participant p SET login_fk = (
       SELECT l.id FROM login l
       JOIN users u ON l.id = u.login_fk
       WHERE p.login_fk=u.id);

ALTER TABLE participant
      ADD CONSTRAINT participant_login_fk
      FOREIGN KEY (login_fk)
      REFERENCES login
      ON DELETE CASCADE;

ALTER TABLE rating
      DROP CONSTRAINT rating_user_fk;

ALTER TABLE rating RENAME COLUMN user_fk TO login_fk;

UPDATE rating r SET login_fk = (
       SELECT l.id FROM login l
       JOIN users u ON l.id = u.login_fk
       WHERE r.login_fk=u.id);

ALTER TABLE rating
      ADD CONSTRAINT rating_login_fk
      FOREIGN KEY (login_fk)
      REFERENCES login
      ON DELETE CASCADE;

# --- !Downs

ALTER TABLE event
      DROP CONSTRAINT event_creator_fk;

UPDATE event e SET creator_fk = (
       SELECT o.id FROM organizer o
       JOIN login l ON l.id = o.login_fk
       WHERE e.creator_fk=l.id);

ALTER TABLE event
      ADD CONSTRAINT event_creator_fk
      FOREIGN KEY (creator_fk)
      REFERENCES login
      ON DELETE CASCADE;


ALTER TABLE participant
      DROP CONSTRAINT participant_login_fk;

ALTER TABLE participant RENAME COLUMN login_fk TO user_fk;

UPDATE participant p SET user_fk = (
       SELECT u.id FROM users u
       JOIN login l ON l.id = u.login_fk
       WHERE p.user_fk=l.id);

ALTER TABLE participant
      ADD CONSTRAINT participant_user_fk
      FOREIGN KEY (user_fk)
      REFERENCES users
      ON DELETE CASCADE;


ALTER TABLE rating
      DROP CONSTRAINT rating_login_fk;

ALTER TABLE rating RENAME COLUMN login_fk TO user_fk;

UPDATE rating r SET user_fk = (
       SELECT u.id FROM users u
       JOIN login l ON l.id = u.login_fk
       WHERE r.user_fk=l.id);

ALTER TABLE rating
      ADD CONSTRAINT rating_user_fk
      FOREIGN KEY (user_fk)
      REFERENCES users
      ON DELETE CASCADE;
