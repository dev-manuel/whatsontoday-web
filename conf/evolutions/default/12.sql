# --- !Ups
ALTER TABLE event
      ALTER COLUMN fromtime SET NOT NULL;

ALTER TABLE event
      ALTER COLUMN totime SET NOT NULL;

ALTER TABLE event
      ALTER COLUMN name SET NOT NULL;

UPDATE login l SET (provider_id,provider_key) = ('credentials','admin@whats-on.co')
       WHERE l.id=1;

ALTER TABLE login
      ALTER COLUMN provider_id SET NOT NULL;

ALTER TABLE login
      ALTER COLUMN provider_key SET NOT NULL;

ALTER TABLE category
      ALTER COLUMN name SET NOT NULL;

ALTER TABLE imageentity
      ALTER COLUMN entity_type SET NOT NULL;

ALTER TABLE location
      ALTER COLUMN latitude SET NOT NULL;

ALTER TABLE location
      ALTER COLUMN longitude SET NOT NULL;

ALTER TABLE location
      ALTER COLUMN name SET NOT NULL;

ALTER TABLE rating
      ALTER COLUMN entity_type SET NOT NULL;

ALTER TABLE rating
      ALTER COLUMN rating SET NOT NULL;

ALTER TABLE organizer
      ALTER COLUMN name SET NOT NULL;

# --- !Downs

ALTER TABLE event
      ALTER COLUMN fromtime DROP NOT NULL;

ALTER TABLE event
      ALTER COLUMN totime DROP NOT NULL;

ALTER TABLE event
      ALTER COLUMN name DROP NOT NULL;

ALTER TABLE login
      ALTER COLUMN provider_id DROP NOT NULL;

ALTER TABLE login
      ALTER COLUMN provider_key DROP NOT NULL;

UPDATE login l SET (provider_id,provider_key) = (NULL,NULL)
       WHERE l.id=1;

ALTER TABLE category
      ALTER COLUMN name DROP NOT NULL;

ALTER TABLE imageentity
      ALTER COLUMN entity_type DROP NOT NULL;

ALTER TABLE location
      ALTER COLUMN latitude DROP NOT NULL;

ALTER TABLE location
      ALTER COLUMN longitude DROP NOT NULL;

ALTER TABLE location
      ALTER COLUMN name DROP NOT NULL;

ALTER TABLE rating
      ALTER COLUMN entity_type DROP NOT NULL;

ALTER TABLE rating
      ALTER COLUMN rating DROP NOT NULL;

ALTER TABLE organizer
      ALTER COLUMN name DROP NOT NULL;
