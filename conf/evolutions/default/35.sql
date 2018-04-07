# --- !Ups

ALTER TABLE organizer DROP COLUMN login_fk;
ALTER TABLE login ADD COLUMN avatar varchar DEFAULt NULL;
ALTER TABLE login DROP COLUMN user_type;
UPDATE login l SET avatar =
       (SELECT u.avatar FROM users u WHERE u.login_fk = l.id);
DROP TABLE users;

# --- !Downs

ALTER TABLE organizer ADD COLUMN login_fk BIGINT DEFAULT NULL;
ALTER TABLE login ADD COLUMN user_type varchar DEFAULT 'user';
CREATE TABLE users (
       id BIGSERIAL PRIMARY KEY,
       login_fk BIGINT REFERENCES login NOT NULL,
       avatar VARCHAR DEFAULT NULL
);
INSERT INTO users (login_fk,avatar) SELECT l.id,l.avatar FROM login l;
ALTER TABLE login DROP COLUMN avatar;
