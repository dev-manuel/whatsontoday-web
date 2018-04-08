# --- !Ups

CREATE TABLE slider_events (
	event_fk BIGINT REFERENCES event NOT NULL,
	number INT NOT NULL
);

# --- !Downs

DROP TABLE slider_events;