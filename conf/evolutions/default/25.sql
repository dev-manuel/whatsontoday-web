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

# --- !Downs

ALTER TABLE login
      DROP COLUMN role_fk;
DROP TABLE rolerights;
DROP TABLE rights;
DROP TABLE roles;
