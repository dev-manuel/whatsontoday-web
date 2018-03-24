# --- !Ups

ALTER TABLE login ADD COLUMN confirmed boolean DEFAULT false;


# --- !Downs

ALTER TABLE login DROP COLUMN confirmed;
