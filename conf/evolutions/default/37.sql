# --- !Ups

INSERT INTO rights (name) VALUES ('ConfirmOrganizer'),('CreateOrganizer'),('ConfirmUser');

# --- !Downs

DELETE FROM rights WHERE name in ('ConfirmOrganizer','CreateOrganizer','ConfirmUser');
