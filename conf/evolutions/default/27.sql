# --- !Ups

INSERT INTO category (name,parent_fk)
       SELECT t.name,c.id FROM category c,
       (VALUES ('culture'), ('startup'), ('club'), ('dance'), ('festivals'),
       ('rock'), ('heavy metall'), ('hiphop'), ('rnb'), ('jazz'), ('pop'), ('folk music'), ('classic'),
       ('reading'), ('opera'), ('theater'), ('musical'), ('show'), ('exhibition'), ('science'), ('lecture'), ('meetup')) AS t (name)
       WHERE c.name = 'all';


# --- !Downs

DELETE FROM category WHERE name in ('culture', 'startup', 'club', 'dance', 'festivals',
       'rock', 'heavy metall', 'hiphop', 'rnb', 'jazz', 'pop', 'folk music', 'classic',
       'reading', 'opera', 'theater', 'musical', 'show', 'exhibition', 'science', 'lecture', 'meetup');
