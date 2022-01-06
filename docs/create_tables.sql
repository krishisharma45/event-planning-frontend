DROP TABLE IF EXISTS public.events;
CREATE TABLE public.events (
    id integer NOT NULL,
    event_name character varying,
    venue character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

DROP TABLE IF EXISTS public.family;
CREATE TABLE public.family (
    id integer NOT NULL,
    family_name character varying,
    members integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

DROP TABLE IF EXISTS public.family_events;
CREATE TABLE public.family_events (
    id integer NOT NULL,
    family_id integer,
    event_id integer,
    attending integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

DROP TABLE IF EXISTS public.auth;
CREATE TABLE public.auth (
    family_name character varying,
    secret_id  integer NOT NULL,
    family_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
