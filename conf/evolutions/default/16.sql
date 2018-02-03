# --- !Ups

ALTER TABLE rating
      DROP CONSTRAINT rating_user_fk;

ALTER TABLE rating
      ADD CONSTRAINT rating_user_fk
      FOREIGN KEY (user_fk)
      REFERENCES users
      ON DELETE CASCADE;

# --- !Downs

ALTER TABLE rating
      DROP CONSTRAINT rating_user_fk;

ALTER TABLE rating
      ADD CONSTRAINT rating_user_fk
      FOREIGN KEY (user_fk)
      REFERENCES login
      ON DELETE CASCADE;
