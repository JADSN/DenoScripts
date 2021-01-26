-- Profiles

CREATE TABLE public.profiles
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    username character varying NOT NULL,
    bio character varying NOT NULL,
    image character varying NOT NULL,
    following boolean NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.profiles
    OWNER to postgres;

-- Authors

CREATE TABLE public.author
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    username character varying,
    bio character varying NOT NULL,
    image character varying NOT NULL,
    following integer NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.author
    OWNER to postgres;
    
 
-- Comments
 
 CREATE TABLE public.comments
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    created_at date NOT NULL,
    updated_at date,
    PRIMARY KEY (id),
    CONSTRAINT author_id_fk FOREIGN KEY (id)
        REFERENCES public.author (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE public.comments
    OWNER to postgres;  
