const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.zamowienie", (error, result) => {
            if (error) {
                return response.status(400).render('pages/zamowienie', {zamowienie: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/zamowienie', {zamowienie: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}


const addZamowienie = (request, response) => {
    const { klientId, kurierId, koszt, zlozenia, dostarczenia, adres } = request.body;
    console.log( klientId, kurierId, koszt, zlozenia, dostarczenia, adres );

    try {

        const addQuery = pool.query('INSERT INTO sklep.zamowienie (id_klient, id_kurier, kurierId_zamowienia, data_zlozenia_zamowienia, data_dostarczenia, adres) VALUES ($1, $2, $3, $4, $5, $6)', [klientId, kurierId, koszt, zlozenia, dostarczenia, adres], (error, result) => {
            if (error) {
                return response.status(400).render('pages/zamowienie', {zamowienie: 0, result: error.message})
            } else {
                var zamowienie;
                const zamowienieQuery = pool.query("SELECT * FROM sklep.zamowienie ORDER BY id_zamowienie", (error, result) => {
                    if (error) {
                        return response.status(400).render('pages/zamowienie', {zamowienie: 0, result: "Wystąpił błąd przy pobieraniu tabeli zamowienie"});
                    } else {
                        zamowienie = result.rows;
                    }
                });

                return response.status(200).render('pages/zamowienie', {zamowienie: zamowienie, result: "Udało się dodać zamowienie"});
            }
        });        
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    getTable,
    addZamowienie
}