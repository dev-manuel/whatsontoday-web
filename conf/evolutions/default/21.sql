# --- !Ups

CREATE OR REPLACE FUNCTION geodistance(FLOAT, FLOAT, FLOAT, FLOAT) RETURNS FLOAT
        AS 'select acos( sin(fromangle($1)) * sin(fromangle($3))
        + cos(fromangle($1)) * cos(fromangle($3))
        * cos(fromangle($2-$4))) * 6371'
        LANGUAGE SQL
        IMMUTABLE
        RETURNS NULL ON NULL INPUT;

# --- !Downs

CREATE OR REPLACE FUNCTION geodistance(FLOAT, FLOAT, FLOAT, FLOAT) RETURNS FLOAT
        AS 'select acos( sin(fromangle($1)) * sin(fromangle($3))
        + cos(fromangle($1)) * cos(fromangle($1))
        * cos(fromangle($2-$4))) * 6371'
        LANGUAGE SQL
        IMMUTABLE
        RETURNS NULL ON NULL INPUT;
