# --- !Ups

ALTER TABLE images DROP COLUMN name;

ALTER TABLE login ADD COLUMN user_type varchar DEFAULT 'user';

UPDATE login l SET user_type = 'user'
       WHERE EXISTS (SELECT 1 FROM users u WHERE u.login_fk = l.id);

UPDATE login l SET user_type = 'organizer'
       WHERE EXISTS (SELECT 1 FROM organizer o WHERE o.login_fk = l.id);

ALTER TABLE location ADD COLUMN country varchar NOT NULL DEFAULT '';
ALTER TABLE location ADD COLUMN city varchar NOT NULL DEFAULT '';
ALTER TABLE location ADD COLUMN street varchar NOT NULL DEFAULT '';


# --- !Downs

ALTER TABLE images ADD COLUMN name varchar DEFAULT '';

ALTER TABLE login DROP COLUMN user_type;

ALTER TABLE location DROP COLUMN country;
ALTER TABLE location DROP COLUMN city;
ALTER TABLE location DROP COLUMN street;
