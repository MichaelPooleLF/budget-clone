--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."budgetItems" DROP CONSTRAINT IF EXISTS "budgetItems_groupIdRef_fkey";
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.transactions DROP CONSTRAINT IF EXISTS transactions_pkey;
ALTER TABLE IF EXISTS ONLY public.splits DROP CONSTRAINT IF EXISTS splits_pkey;
ALTER TABLE IF EXISTS ONLY public.months DROP CONSTRAINT IF EXISTS months_pkey;
ALTER TABLE IF EXISTS ONLY public."budgetItems" DROP CONSTRAINT IF EXISTS "budgetItems_pkey";
ALTER TABLE IF EXISTS ONLY public."budgetGroup" DROP CONSTRAINT IF EXISTS "budgetGroup_pkey";
ALTER TABLE IF EXISTS public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.transactions ALTER COLUMN "transactionId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.splits ALTER COLUMN "splitId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.months ALTER COLUMN "monthId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."budgetItems" ALTER COLUMN "itemId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."budgetGroup" ALTER COLUMN "groupId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."users_userId_seq";
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public."transactions_transactionId_seq";
DROP TABLE IF EXISTS public.transactions;
DROP SEQUENCE IF EXISTS public."splits_splitId_seq";
DROP TABLE IF EXISTS public.splits;
DROP SEQUENCE IF EXISTS public."months_monthId_seq";
DROP TABLE IF EXISTS public.months;
DROP SEQUENCE IF EXISTS public."budgetItems_budgetItemId_seq";
DROP TABLE IF EXISTS public."budgetItems";
DROP SEQUENCE IF EXISTS public."budgetGroup_budgetGroupId_seq";
DROP TABLE IF EXISTS public."budgetGroup";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: budgetGroup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."budgetGroup" (
    "groupId" integer NOT NULL,
    "groupOrder" integer NOT NULL,
    "monthId" integer NOT NULL,
    "groupName" text DEFAULT 'Untitled'::text NOT NULL,
    "budgetType" text DEFAULT 'expense'::text NOT NULL
);


--
-- Name: budgetGroup_budgetGroupId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."budgetGroup_budgetGroupId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: budgetGroup_budgetGroupId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."budgetGroup_budgetGroupId_seq" OWNED BY public."budgetGroup"."groupId";


--
-- Name: budgetItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."budgetItems" (
    "itemId" integer NOT NULL,
    "itemName" text DEFAULT 'Label'::text NOT NULL,
    repeat text DEFAULT 'false'::text NOT NULL,
    "itemOrder" integer NOT NULL,
    planned numeric(14,2) DEFAULT 0.00 NOT NULL,
    "dueDate" date,
    "groupIdRef" integer NOT NULL
);


--
-- Name: budgetItems_budgetItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."budgetItems_budgetItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: budgetItems_budgetItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."budgetItems_budgetItemId_seq" OWNED BY public."budgetItems"."itemId";


--
-- Name: months; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.months (
    "monthId" integer NOT NULL,
    month text NOT NULL,
    year integer NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: months_monthId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."months_monthId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: months_monthId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."months_monthId_seq" OWNED BY public.months."monthId";


--
-- Name: splits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.splits (
    "splitId" integer NOT NULL,
    "splitAmount" numeric(14,2) NOT NULL,
    "itemIdRef" integer NOT NULL,
    "transactionIdRef" integer NOT NULL
);


--
-- Name: splits_splitId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."splits_splitId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: splits_splitId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."splits_splitId_seq" OWNED BY public.splits."splitId";


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transactions (
    "transactionId" integer NOT NULL,
    "transactionType" text DEFAULT 'expense'::text NOT NULL,
    deleted text DEFAULT 'false'::text NOT NULL,
    "checkNum" text,
    note text,
    "transactionDate" date NOT NULL,
    "transactionName" text
);


--
-- Name: transactions_transactionId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."transactions_transactionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transactions_transactionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."transactions_transactionId_seq" OWNED BY public.transactions."transactionId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "userName" text NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: budgetGroup groupId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."budgetGroup" ALTER COLUMN "groupId" SET DEFAULT nextval('public."budgetGroup_budgetGroupId_seq"'::regclass);


--
-- Name: budgetItems itemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."budgetItems" ALTER COLUMN "itemId" SET DEFAULT nextval('public."budgetItems_budgetItemId_seq"'::regclass);


--
-- Name: months monthId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.months ALTER COLUMN "monthId" SET DEFAULT nextval('public."months_monthId_seq"'::regclass);


--
-- Name: splits splitId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.splits ALTER COLUMN "splitId" SET DEFAULT nextval('public."splits_splitId_seq"'::regclass);


--
-- Name: transactions transactionId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions ALTER COLUMN "transactionId" SET DEFAULT nextval('public."transactions_transactionId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: budgetGroup; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."budgetGroup" ("groupId", "groupOrder", "monthId", "groupName", "budgetType") FROM stdin;
2	2	1	Housing	expense
1	1	1	Giving	expense
\.


--
-- Data for Name: budgetItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."budgetItems" ("itemId", "itemName", repeat, "itemOrder", planned, "dueDate", "groupIdRef") FROM stdin;
1	Charity	false	1	0.00	\N	1
3	New Name	false	3	0.00	\N	1
4	Label	false	2	50.00	2020-12-16	1
\.


--
-- Data for Name: months; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.months ("monthId", month, year, "userId") FROM stdin;
1	December	2020	1
\.


--
-- Data for Name: splits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.splits ("splitId", "splitAmount", "itemIdRef", "transactionIdRef") FROM stdin;
1	10.00	1	1
3	5.00	3	1
4	3.00	4	2
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.transactions ("transactionId", "transactionType", deleted, "checkNum", note, "transactionDate", "transactionName") FROM stdin;
1	expense	false	\N	\N	2020-12-02	\N
2	expense	false	\N	\N	2020-12-14	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "userName") FROM stdin;
1	testuser
\.


--
-- Name: budgetGroup_budgetGroupId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."budgetGroup_budgetGroupId_seq"', 17, true);


--
-- Name: budgetItems_budgetItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."budgetItems_budgetItemId_seq"', 13, true);


--
-- Name: months_monthId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."months_monthId_seq"', 1, true);


--
-- Name: splits_splitId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."splits_splitId_seq"', 4, true);


--
-- Name: transactions_transactionId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."transactions_transactionId_seq"', 2, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, true);


--
-- Name: budgetGroup budgetGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."budgetGroup"
    ADD CONSTRAINT "budgetGroup_pkey" PRIMARY KEY ("groupId");


--
-- Name: budgetItems budgetItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."budgetItems"
    ADD CONSTRAINT "budgetItems_pkey" PRIMARY KEY ("itemId");


--
-- Name: months months_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.months
    ADD CONSTRAINT months_pkey PRIMARY KEY ("monthId");


--
-- Name: splits splits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.splits
    ADD CONSTRAINT splits_pkey PRIMARY KEY ("splitId");


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY ("transactionId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: budgetItems budgetItems_groupIdRef_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."budgetItems"
    ADD CONSTRAINT "budgetItems_groupIdRef_fkey" FOREIGN KEY ("groupIdRef") REFERENCES public."budgetGroup"("groupId") ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

