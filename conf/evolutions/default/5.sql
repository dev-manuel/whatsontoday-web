# --- !Ups

CREATE FUNCTION fromangle(FLOAT) RETURNS FLOAT
  AS 'select $1/180*pi()'
    LANGUAGE SQL
    IMMUTABLE
    RETURNS NULL ON NULL INPUT;

CREATE FUNCTION geodistance(FLOAT, FLOAT, FLOAT, FLOAT) RETURNS FLOAT
    AS 'select acos( sin(fromangle($1)) * sin(fromangle($3)) 
        + cos(fromangle($1)) * cos(fromangle($1))
        + cos(fromangle($2-$4))) * 6371'
    LANGUAGE SQL
    IMMUTABLE
    RETURNS NULL ON NULL INPUT;

# --- !Downs

DROP FUNCTION geodistance;
DROP FUNCTION fromAngle;