--trigger do sprawdzania poprawnego dodania klienta

CREATE OR REPLACE FUNCTION check_klient()
RETURNS TRIGGER
AS
$$
DECLARE
	rec RECORD;
BEGIN
	SELECT * INTO rec FROM sklep.klient k WHERE NEW.id_klient = k.id_klient;
	IF rec IS NULL THEN
		RAISE EXCEPTION 'Niepoprawne dane';
		RETURN NULL;
	ELSEIF NEW.email_klient !~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$' THEN
		RAISE EXCEPTION 'Podano niepoprawny adres email.';
		RETURN NULL;
	ELSEIF LENGTH(NEW.haslo) < 4 THEN
		RAISE EXCEPTION 'Hasło musi mieć conajmniej 4 znaki';
		RETURN NULL;
	END IF;

RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';


DROP TRIGGER IF EXISTS sprawdz_klienta ON sklep.klient;
CREATE TRIGGER sprawdz_klienta AFTER INSERT OR UPDATE ON sklep.klient
FOR ROW EXECUTE PROCEDURE check_klient();


--trigger do sprawdzania poprawnego dodawania/updateowania produktu

CREATE OR REPLACE FUNCTION check_produkt()
RETURNS TRIGGER
AS
$$
DECLARE
	rec RECORD;
BEGIN
	SELECT * INTO rec FROM sklep.produkt p WHERE NEW.id_produkt = p.id_produkt;
	IF rec IS NULL THEN
		RAISE EXCEPTION 'Niepoprawne dane';
		RETURN NULL;
	ELSEIF NEW.nazwa_produkt !~ '[ A-Za-z]+$' THEN
		RAISE EXCEPTION 'Podano błędną nazwę produktu';
		RETURN NULL;
	ELSEIF NOT (select exists(select 1 from sklep.producent where id_producent=NEW.id_producent)) THEN
		RAISE EXCEPTION 'Podano błędne id producenta';
		RETURN NULL;
	END IF;

RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';


DROP TRIGGER IF EXISTS sprawdz_produkt ON sklep.produkt;
CREATE TRIGGER sprawdz_produkt AFTER INSERT OR UPDATE ON sklep.produkt
FOR ROW EXECUTE PROCEDURE check_produkt();

