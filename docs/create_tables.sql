CREATE TABLE public.events (
    id integer NOT NULL,
    event_name character varying,
    venue character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


CREATE TABLE public.family (
    id integer NOT NULL,
    family_name character varying,
    members integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

CREATE TABLE public.family_events (
    id integer NOT NULL,
    event_id integer,
    family_id integer,
    attending integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

CREATE TABLE public.auth (
    family_name character varying,
    secret_id  integer NOT NULL,
    family_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
