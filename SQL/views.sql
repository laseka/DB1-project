--view z listą produktów
drop view if exists sklep.lista_produktow;
create view sklep.lista_produktow as
    select produkt.id_produkt, nazwa_produkt, cena_produkt, nazwa_producent
    from sklep.produkt
    join sklep.producent on produkt.id_producent = producent.id_producent
    order by produkt.id_produkt;


--view z liczbą produktów w każdej kategorii
drop view if exists sklep.produkty_w_kategorii;
create view sklep.produkty_w_kategorii as select
    (select count(*) from sklep.kategoria_produkt kp where k.id_kategoria = kp.id_kategoria) as produkty,
    k.nazwa_kategoria, k.opis_kategoria
    from sklep.kategoria k
    order by produkty desc;


--view z rankingiem kategorii produktów wg średniej ceny produktów w kategorii
drop view if exists sklep.ranking_cen;
create view sklep.ranking_cen as
    select rank() over ( order by (avg(cena_produkt)) desc) as ranking,
    k.nazwa_kategoria, k.opis_kategoria, round(avg(cena_produkt)::numeric, 2) as cena
    from sklep.produkt
    join sklep.kategoria_produkt kp on produkt.id_produkt = kp.id_produkt
    join sklep.kategoria k on k.id_kategoria = kp.id_kategoria
    group by k.id_kategoria having count(kp.id_produkt) >= 2;


--view do wyświetlania danych zamówień o łącznym koszcie powyżej 1000
drop view if exists sklep.zamowienia_info;
create view sklep.zamowienia_info as
    select z.id_zamowienie, zp.liczba_produktow, p.nazwa_produkt, k.email_klient,
           z.koszt_zamowienia, z.data_zlozenia_zamowienia::date, z.data_dostarczenia::date,
           ku.nazwa_firmy
    from sklep.zamowienie z
    join sklep.zamowienie_produkt zp on z.id_zamowienie = zp.id_zamowienie
    join sklep.produkt p on zp.id_produkt = p.id_produkt
    join sklep.klient k on z.id_klient = k.id_klient
    join sklep.kurier ku on z.id_kurier = ku.id_kurier
    where z.koszt_zamowienia > 1000.00;


