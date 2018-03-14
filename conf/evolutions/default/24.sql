# --- !Ups

CREATE VIEW participant_counts AS
       SELECT e.id as id, p.event_fk as event_fk, count(p.user_fk) as count FROM event e, participant p
       WHERE EXISTS (SELECT user_fk FROM participant p2 WHERE event_fk = e.id AND p2.user_fk = p.user_fk)
       GROUP BY p.event_fk, e.id;

# --- !Downs

DROP VIEW participant_counts;


