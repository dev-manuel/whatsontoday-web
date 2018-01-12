# --- !Ups
ALTER TABLE participant
      DROP CONSTRAINT participant_user_fk;

UPDATE participant p SET user_fk = (
       SELECT u.id FROM users u
              JOIN login l ON l.id = u.login_fk
              WHERE l.id=p.user_fk);

ALTER TABLE participant
      ADD CONSTRAINT participant_user_fk
      FOREIGN KEY (user_fk)
      REFERENCES users
      ON DELETE CASCADE;

# --- !Downs

ALTER TABLE participant
      DROP CONSTRAINT participant_user_fk;

UPDATE participant p SET user_fk = (
       SELECT l.id FROM login l
              JOIN users u ON l.id = u.login_fk
              WHERE u.id=p.user_fk);

ALTER TABLE participant
      ADD CONSTRAINT participant_user_fk
      FOREIGN KEY (user_fk)
      REFERENCES login
      ON DELETE CASCADE;
