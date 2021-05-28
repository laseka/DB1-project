--creating sklep database

DROP SCHEMA IF EXISTS sklep CASCADE;
CREATE SCHEMA sklep;

CREATE SEQUENCE sklep.kurier_id_kurier_seq;

DROP TABLE IF EXISTS sklep.Kurier CASCADE;
CREATE TABLE sklep.Kurier (
                id_kurier INTEGER NOT NULL DEFAULT nextval('sklep.kurier_id_kurier_seq'),
                nazwa_firmy VARCHAR(50) NOT NULL,
                koszt_dostawy DOUBLE PRECISION NOT NULL,
                czas_dostawy INTEGER NOT NULL,
                CONSTRAINT id_kurier PRIMARY KEY (id_kurier)
);


ALTER SEQUENCE sklep.kurier_id_kurier_seq OWNED BY sklep.Kurier.id_kurier;

CREATE SEQUENCE sklep.klient_id_klient_seq;

DROP TABLE IF EXISTS sklep.Klient CASCADE;
CREATE TABLE sklep.Klient (
                id_klient INTEGER NOT NULL DEFAULT nextval('sklep.klient_id_klient_seq'),
                email_klient VARCHAR(50) NOT NULL,
                haslo VARCHAR(30) NOT NULL,
                CONSTRAINT id_klient PRIMARY KEY (id_klient)
);


ALTER SEQUENCE sklep.klient_id_klient_seq OWNED BY sklep.Klient.id_klient;

CREATE SEQUENCE sklep.zamowienie_id_zamowienie_seq;


DROP TABLE IF EXISTS sklep.Zamowienie CASCADE;
CREATE TABLE sklep.Zamowienie (
                id_zamowienie INTEGER NOT NULL DEFAULT nextval('sklep.zamowienie_id_zamowienie_seq'),
                id_klient INTEGER NOT NULL,
                id_kurier INTEGER NOT NULL,
                koszt_zamowienia DOUBLE PRECISION NOT NULL,
                data_zlozenia_zamowienia DATE NOT NULL,
                data_dostarczenia DATE NOT NULL,
                adres VARCHAR(50) NOT NULL,
                CONSTRAINT id_zamowienie PRIMARY KEY (id_zamowienie)
);


ALTER SEQUENCE sklep.zamowienie_id_zamowienie_seq OWNED BY sklep.Zamowienie.id_zamowienie;

CREATE SEQUENCE sklep.producent_id_producent_seq_1;


DROP TABLE IF EXISTS sklep.Producent CASCADE;
CREATE TABLE sklep.Producent (
                id_producent INTEGER NOT NULL DEFAULT nextval('sklep.producent_id_producent_seq_1'),
                nazwa_producent VARCHAR(50) NOT NULL,
                email_producent VARCHAR(50) NOT NULL,
                CONSTRAINT id_producent PRIMARY KEY (id_producent)
);


ALTER SEQUENCE sklep.producent_id_producent_seq_1 OWNED BY sklep.Producent.id_producent;

CREATE SEQUENCE sklep.kategoria_id_kategoria_seq;

DROP TABLE IF EXISTS sklep.Kategoria CASCADE;
CREATE TABLE sklep.Kategoria (
                id_kategoria INTEGER NOT NULL DEFAULT nextval('sklep.kategoria_id_kategoria_seq'),
                nazwa_kategoria VARCHAR(50) NOT NULL,
                opis_kategoria VARCHAR(500) NOT NULL,
                CONSTRAINT id_kategoria PRIMARY KEY (id_kategoria)
);


ALTER SEQUENCE sklep.kategoria_id_kategoria_seq OWNED BY sklep.Kategoria.id_kategoria;

CREATE SEQUENCE sklep.produkt_id_produkt_seq;


DROP TABLE IF EXISTS sklep.Produkt CASCADE;
CREATE TABLE sklep.Produkt (
                id_produkt INTEGER NOT NULL DEFAULT nextval('sklep.produkt_id_produkt_seq'),
                nazwa_produkt VARCHAR(50) NOT NULL,
                cena_produkt DOUBLE PRECISION NOT NULL,
                id_producent INTEGER NOT NULL,
                CONSTRAINT id_produkt PRIMARY KEY (id_produkt)
);


ALTER SEQUENCE sklep.produkt_id_produkt_seq OWNED BY sklep.Produkt.id_produkt;

DROP TABLE IF EXISTS sklep.Zamowienie_produkt CASCADE;
CREATE TABLE sklep.Zamowienie_produkt (
                id_zamowienie INTEGER NOT NULL,
                id_produkt INTEGER NOT NULL,
                liczba_produktow INTEGER NOT NULL,
                CONSTRAINT id_zamowienie_produkt PRIMARY KEY (id_zamowienie, id_produkt)
);


DROP TABLE IF EXISTS sklep.Opinie CASCADE;
CREATE TABLE sklep.Opinie (
                id_produkt INTEGER NOT NULL,
                id_klient INTEGER NOT NULL,
                data DATE NOT NULL,
                ocena INTEGER NOT NULL,
                opinia_tresc VARCHAR(500),
                CONSTRAINT id_opinie PRIMARY KEY (id_produkt, id_klient)
);


DROP TABLE IF EXISTS sklep.Kategoria_produkt CASCADE;
CREATE TABLE sklep.Kategoria_produkt (
                id_produkt INTEGER NOT NULL,
                id_kategoria INTEGER NOT NULL,
                CONSTRAINT id_kategoria_produkt PRIMARY KEY (id_produkt, id_kategoria)
);


ALTER TABLE sklep.Zamowienie ADD CONSTRAINT kurier_zamowienie_fk
FOREIGN KEY (id_kurier)
REFERENCES sklep.Kurier (id_kurier)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE sklep.Opinie ADD CONSTRAINT klient_opinie_fk
FOREIGN KEY (id_klient)
REFERENCES sklep.Klient (id_klient)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE sklep.Zamowienie ADD CONSTRAINT klient_zamowienie_fk
FOREIGN KEY (id_klient)
REFERENCES sklep.Klient (id_klient)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE sklep.Zamowienie_produkt ADD CONSTRAINT zamowienie_zamowienie_produkt_fk
FOREIGN KEY (id_zamowienie)
REFERENCES sklep.Zamowienie (id_zamowienie)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE sklep.Produkt ADD CONSTRAINT producent_produkt_fk
FOREIGN KEY (id_producent)
REFERENCES sklep.Producent (id_producent)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE sklep.Kategoria_produkt ADD CONSTRAINT kategoria_kategoria_produkt_fk
FOREIGN KEY (id_kategoria)
REFERENCES sklep.Kategoria (id_kategoria)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE sklep.Kategoria_produkt ADD CONSTRAINT produkt_kategoria_produkt_fk
FOREIGN KEY (id_produkt)
REFERENCES sklep.Produkt (id_produkt)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE sklep.Opinie ADD CONSTRAINT produkt_opinie_fk
FOREIGN KEY (id_produkt)
REFERENCES sklep.Produkt (id_produkt)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE sklep.Zamowienie_produkt ADD CONSTRAINT produkt_zamowienie_produkt_fk
FOREIGN KEY (id_produkt)
REFERENCES sklep.Produkt (id_produkt)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;