# --- !Ups

INSERT INTO users (id,name,pwhash,email)
    VALUES (1,'admin','c','admin@whats-on.co');

INSERT INTO category (id,name,parent_fk) VALUES
	(1,'all',1),
	(2,'sport',1),
	(3,'tech',1);

# --- !Downs

DELETE FROM users WHERE id = 1;
DELETE FROM category WHERE id = 1 OR id = 2 OR id = 3;