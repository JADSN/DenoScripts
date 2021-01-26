-- APP
-- =======================================
CREATE TABLE public.app
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    version character varying NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.app
    OWNER to postgres;

-- =======================================

-- USERS
-- =======================================
CREATE TABLE public."user"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    email character varying NOT NULL,
    token character varying,
    username character varying NOT NULL,
    bio character varying,
    image character varying,
    PRIMARY KEY (id)
);

ALTER TABLE public."user"
    OWNER to postgres;

-- =======================================

-- AUTHORS
-- =======================================

-- Table: public.authors

-- DROP TABLE public.authors;

CREATE TABLE public.authors
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    username character varying COLLATE pg_catalog."default",
    bio character varying COLLATE pg_catalog."default" NOT NULL,
    image character varying COLLATE pg_catalog."default" NOT NULL,
    following integer NOT NULL,
    CONSTRAINT author_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.authors
    OWNER to postgres;

-- =======================================

-- ARTICLES
-- =======================================
-- Table: public.articles

-- DROP TABLE public.articles;

CREATE TABLE public.articles
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    slug character varying COLLATE pg_catalog."default" NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    body character varying COLLATE pg_catalog."default" NOT NULL,
    tag_list character varying COLLATE pg_catalog."default" NOT NULL,
    created_at date NOT NULL,
    update_at date,
    favorited boolean NOT NULL,
    favorites_count integer NOT NULL,
    CONSTRAINT article_pkey PRIMARY KEY (id),
    CONSTRAINT author_id_fk FOREIGN KEY (id)
        REFERENCES public.authors (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.articles
    OWNER to postgres;

-- =======================================

-- COMMENTS
-- =======================================

-- Table: public.comments

-- DROP TABLE public.comments;

CREATE TABLE public.comments
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    created_at date NOT NULL,
    updated_at date,
    CONSTRAINT comments_pkey PRIMARY KEY (id),
    CONSTRAINT author_id_fk FOREIGN KEY (id)
        REFERENCES public.authors (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.comments
    OWNER to postgres;

-- =======================================

-- PROFILES
-- =======================================

-- Table: public.profiles

-- DROP TABLE public.profiles;

CREATE TABLE public.profiles
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    bio character varying COLLATE pg_catalog."default" NOT NULL,
    image character varying COLLATE pg_catalog."default" NOT NULL,
    following boolean NOT NULL,
    CONSTRAINT profiles_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.profiles
    OWNER to postgres;

-- =======================================

-- TAGS
-- =======================================

-- Table: public.tags

-- DROP TABLE public.tags;

CREATE TABLE public.tags
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    description character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tags_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.tags
    OWNER to postgres;

-- =======================================
