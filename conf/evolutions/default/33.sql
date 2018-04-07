# --- !Ups

CREATE TABLE roles (
       id BIGSERIAL PRIMARY KEY,
       name VARCHAR NOT NULL
);

CREATE TABLE rights (
       id BIGSERIAL PRIMARY KEY,
       name VARCHAR NOT NULL
);

CREATE TABLE rolerights (
       role_fk BIGINT REFERENCES roles NOT NULL,
       right_fk BIGINT REFERENCES rights NOT NULL
);

INSERT INTO roles (name) VALUES ('DEFAULT');

ALTER TABLE login
      ADD COLUMN role_fk BIGINT REFERENCES roles NOT NULL DEFAULT 1;

INSERT INTO rights (name) VALUES ('CreateEvent'), ('ConfirmEvent'), ('CreateCategory'), ('CreateLocation'),
       ('Participate'), ('CreateImage'), ('ConfirmUser');

INSERT INTO roles (name) VALUES ('Admin'), ('ConfirmedUser');

INSERT INTO rolerights
       (SELECT ro.id,ri.id FROM roles ro, rights ri WHERE ro.name = 'Admin');

INSERT INTO rolerights
       (SELECT ro.id,ri.id FROM roles ro, rights ri WHERE ro.name = 'ConfirmedUser'
               AND ri.name in ('CreateEvent', 'ConfirmEvent', 'CreateLocation',
               'Participate', 'CreateImage'));

INSERT INTO rolerights
       (SELECT ro.id,ri.id FROM roles ro, rights ri WHERE ro.name = 'DEFAULT'
               AND ri.name in ('CreateEvent', 'Participate', 'CreateImage'));

ALTER TABLE login
      DROP CONSTRAINT login_role_fk_fkey;

ALTER TABLE login
      ADD CONSTRAINT login_role_fk
      FOREIGN KEY (role_fk)
      REFERENCES roles
      ON DELETE CASCADE;

ALTER TABLE rolerights
      DROP CONSTRAINT rolerights_role_fk_fkey;

ALTER TABLE rolerights
      ADD CONSTRAINT rolerights_role_fk
      FOREIGN KEY (role_fk)
      REFERENCES roles
      ON DELETE CASCADE;

ALTER TABLE rolerights
      DROP CONSTRAINT rolerights_right_fk_fkey;

ALTER TABLE rolerights
      ADD CONSTRAINT rolerights_right_fk
      FOREIGN KEY (right_fk)
      REFERENCES rights
      ON DELETE CASCADE;

# --- !Downs

DELETE FROM rights WHERE name in ('CreateEvent', 'ConfirmEvent', 'CreateCategory', 'CreateLocation',
       'Participate', 'CreateImage', 'ConfirmUser');

DELETE FROM roles name WHERE name in ('Admin', 'ConfirmedUser');

ALTER TABLE login
      DROP CONSTRAINT login_role_fk_fkey;

ALTER TABLE login
      ADD CONSTRAINT login_role_fk_fkey
      FOREIGN KEY (role_fk)
      REFERENCES roles;

ALTER TABLE rolerights
      DROP CONSTRAINT rolerights_role_fk;

ALTER TABLE rolerights
      ADD CONSTRAINT rolerights_role_fk_fkey
      FOREIGN KEY (role_fk)
      REFERENCES roles;

ALTER TABLE rolerights
      DROP CONSTRAINT rolerights_right_fk;

ALTER TABLE rolerights
      ADD CONSTRAINT rolerights_right_fk_fkey
      FOREIGN KEY (right_fk)
      REFERENCES rights;

ALTER TABLE login
DROP COLUMN role_fk;
DROP TABLE rolerights;
DROP TABLE rights;
DROP TABLE roles;
