const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.zamowienie_produkt", (error, result) => {
            if (error) {
                return response.status(400).render('pages/zamowienie_produkt', {zamowienie_produkt: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/zamowienie_produkt', {zamowienie_produkt: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}


const addZamowienieProdukt = (request, response) => {
    const { zamowienieId, produktId, liczba } = request.body;
    console.log( zamowienieId, produktId, liczba );

    try {

        const addQuery = pool.query('INSERT INTO sklep.zamowienie_produkt (id_zamowienie, id_produkt, liczba_produktow) VALUES ($1, $2, $3)', [zamowienieId, produktId, liczba], (error, result) => {
            if (error) {
                return response.status(400).render('pages/zamowienie_produkt', {zamowienie_produkt: 0, result: error.message})
            } else {
                var zamowienie_produkt;
                const zamowienie_produktQuery = pool.query("SELECT * FROM sklep.zamowienie_produkt", (error, result) => {
                    if (error) {
                        return response.status(400).render('pages/zamowienie_produkt', {zamowienie_produkt: 0, result: "Wystąpił błąd przy pobieraniu tabeli zamowienie_produkt"});
                    } else {
                        zamowienie_produkt = result.rows;
                    }
                });

                return response.status(200).render('pages/zamowienie_produkt', {zamowienie_produkt: zamowienie_produkt, result: "Udało się dodać zamowienie_produkt"});
            }
        });        
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    getTable,
    addZamowienieProdukt
}