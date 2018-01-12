# --- !Ups

INSERT INTO users (name,pwhash,email)
    VALUES ('admin','c','admin@whats-on.co');

INSERT INTO category (name,parent_fk) VALUES
	('all',0);

UPDATE category set parent_fk = (SELECT id FROM category WHERE name = 'all');

INSERT INTO category (name,parent_fk)
	SELECT 'sport',c.id FROM category c WHERE name = 'all';

INSERT INTO category (name,parent_fk)
       SELECT 'tech',c.id FROM category c WHERE name = 'all';

# --- !Downs

DELETE FROM users WHERE email = 'admin@whats-on.co';
DELETE FROM category WHERE name = 'all' OR name = 'sport' OR name = 'tech';
