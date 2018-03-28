# --- !Ups

CREATE TABLE userroles (
       login_fk BIGINT REFERENCES login ON DELETE CASCADE NOT NULL,
       role_fk BIGINT REFERENCES roles ON DELETE CASCADE NOT NULL,
       scope varchar NOT NULL DEFAULT 'global',
       organizer_fk BIGINT REFERENCES organizer ON DELETE CASCADE DEFAULT NULL,
       location_fk BIGINT REFERENCES location ON DELETE CASCADE DEFAULT NULL
);
INSERT INTO userroles (login_fk,role_fk) SELECT l.id,l.role_fk FROM login l;
ALTER TABLE login DROP COLUMN role_fk;

# --- !Downs

ALTER TABLE login ADD COLUMN role_fk BIGINT REFERENCES roles ON DELETE CASCADE DEFAULT NULL;
UPDATE login SET role_fk = (SELECT r.id FROM roles r WHERE r.name = 'DEFAULT');
ALTER TABLE login ALTER COLUMN role_fk SET NOT NULL;
DROP TABLE userroles;
