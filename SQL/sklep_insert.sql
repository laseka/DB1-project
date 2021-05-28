--inserty bez wpisanych id żeby się generowały automatycznie

SET SEARCH_PATH TO sklep;

INSERT INTO sklep.producent (nazwa_producent, email_producent) VALUES ('Electronics', 'electronics@gmail.com');
INSERT INTO sklep.producent (nazwa_producent, email_producent) VALUES ('ATB Meble', 'ATBmeble@gmail.com');
INSERT INTO sklep.producent (nazwa_producent, email_producent) VALUES ('DEFRA', 'defra@gmail.com');


SET SEARCH_PATH TO sklep;

INSERT INTO sklep.produkt (nazwa_produkt, cena_produkt, id_producent) VALUES ('szafa', '699.99', '2');
INSERT INTO sklep.produkt (nazwa_produkt, cena_produkt, id_producent) VALUES ('stolik', '63.99', '3');
INSERT INTO sklep.produkt (nazwa_produkt, cena_produkt, id_producent) VALUES ('kuchenka', '350.00', '1');
INSERT INTO sklep.produkt (nazwa_produkt, cena_produkt, id_producent) VALUES ('telewizor', '1500.99', '1');
INSERT INTO sklep.produkt (nazwa_produkt, cena_produkt, id_producent) VALUES ('fotel', '489.99', '2');


SET SEARCH_PATH TO sklep;

INSERT INTO sklep.kategoria (nazwa_kategoria, opis_kategoria) VALUES ('salon', 'meble oraz akcesoria przeznaczone do salonu');
INSERT INTO sklep.kategoria (nazwa_kategoria, opis_kategoria) VALUES ('kuchnia', 'meble oraz akcesoria przeznaczone do kuchni');
INSERT INTO sklep.kategoria (nazwa_kategoria, opis_kategoria) VALUES ('AGD', 'artykuły AGD');
INSERT INTO sklep.kategoria (nazwa_kategoria, opis_kategoria) VALUES ('sypialnia', 'meble oraz akcesoria przeznaczone do sypialni');
INSERT INTO sklep.kategoria (nazwa_kategoria, opis_kategoria) VALUES ('meble', 'sprzęt użytkowy przeznaczony do wyposażenia wnętrz');
INSERT INTO sklep.kategoria (nazwa_kategoria, opis_kategoria) VALUES ('akcesoria', 'artykuły nie zaliczające się do mebli lub AGD');


SET SEARCH_PATH TO sklep;

INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ('1', '4');
INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ('1', '5');
INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ('2', '5');
INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ('2', '1');
INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ('3', '3');
INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ('3', '2');
INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ('4', '3');
INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ('4', '1');
INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ('5', '5');
INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ('5', '1');


SET SEARCH_PATH TO sklep;

INSERT INTO sklep.klient (email_klient, haslo) VALUES ('kowalski1@gmail.com', 'qwerty');
INSERT INTO sklep.klient (email_klient, haslo) VALUES ('basia98@gmail.com', 'sklep12345');
INSERT INTO sklep.klient (email_klient, haslo) VALUES ('nowak77@gmail.com', 'produkty1');


SET SEARCH_PATH TO sklep;

INSERT INTO sklep.kurier (nazwa_firmy, koszt_dostawy, czas_dostawy) VALUES ('DPD', '5.99', '7');
INSERT INTO sklep.kurier (nazwa_firmy, koszt_dostawy, czas_dostawy) VALUES ('UPS', '8.00', '5');
INSERT INTO sklep.kurier (nazwa_firmy, koszt_dostawy, czas_dostawy) VALUES ('DHL Express', '15.50', '2');


SET SEARCH_PATH TO sklep;

INSERT INTO sklep.opinie (id_produkt, id_klient, data, ocena, opinia_tresc) VALUES ('5', '2', '2021-02-10', '5', 'bardzo wygodny fotel');
INSERT INTO sklep.opinie (id_produkt, id_klient, data, ocena, opinia_tresc) VALUES ('4', '3', '2021-01-08', '4', 'dobra jakość obrazu');


SET SEARCH_PATH TO sklep;

INSERT INTO sklep.zamowienie (id_klient, id_kurier, koszt_zamowienia, data_zlozenia_zamowienia, data_dostarczenia, adres) VALUES ('2', '2', '1477.97', '2021-02-02', '2021-02-07', 'Kraków ul.Dąbska 32');
INSERT INTO sklep.zamowienie (id_klient, id_kurier, koszt_zamowienia, data_zlozenia_zamowienia, data_dostarczenia, adres) VALUES ('3', '3', '1516.49', '2021-01-03', '2021-01-05', 'Bielsko-Biała ul.Przedwiośnie 13');


SET SEARCH_PATH TO sklep;

INSERT INTO sklep.zamowienie_produkt (id_zamowienie, id_produkt, liczba_produktow) VALUES ('1', '5', '3');
INSERT INTO sklep.zamowienie_produkt (id_zamowienie, id_produkt, liczba_produktow) VALUES ('2', '4', '1');



