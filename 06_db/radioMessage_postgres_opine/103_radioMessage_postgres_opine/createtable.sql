CREATE TABLE public.radiosv2
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    datetime bigint,
    decibels integer,
    direction character varying,
    protocol character varying,
    signal integer,
    clockoffset integer,
    frequencyhz integer,
    message character varying,
    PRIMARY KEY (id)
);

ALTER TABLE public.radiosv2
    OWNER to postgres;