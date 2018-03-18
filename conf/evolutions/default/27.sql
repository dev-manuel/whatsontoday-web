# --- !Ups

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

# --- !Downs

DELETE FROM rights WHERE name in ('CreateEvent', 'ConfirmEvent', 'CreateCategory', 'CreateLocation',
       'Participate', 'CreateImage', 'ConfirmUser');

DELETE FROM roles name WHERE name in ('Admin', 'ConfirmedUser');
