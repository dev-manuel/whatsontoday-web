# --- !Ups

ALTER TABLE login ADD COLUMN user_type varchar DEFAULT 'user';

UPDATE login l SET user_type = 'user'
       WHERE EXISTS (SELECT 1 FROM users u WHERE u.login_fk = l.id);

UPDATE login l SET user_type = 'organizer'
       WHERE EXISTS (SELECT 1 FROM organizer o WHERE o.login_fk = l.id);

# --- !Downs

ALTER TABLE login DROP COLUMN user_type;
