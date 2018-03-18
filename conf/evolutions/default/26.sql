# --- !Ups

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

ALTER TABLE login
DROP CONSTRAINT login_role_fk;

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

