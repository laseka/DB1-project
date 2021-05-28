const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.opinie", (error, result) => {
            if (error) {
                return response.status(400).render('pages/opinie', {opinie: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/opinie', {opinie: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}


const addOpinia = (request, response) => {
    const { produktId, klientId, data, ocena, tresc } = request.body;
    console.log( produktId, klientId, data, ocena, tresc );

    try {

        const addQuery = pool.query('INSERT INTO sklep.opinie (id_produkt, id_klient, data, ocena, opinia_tresc) VALUES ($1, $2, $3, $4, $5)', [produktId, klientId, data, ocena, tresc], (error, result) => {
            if (error) {
                return response.status(400).render('pages/opinie', {opinie: 0, result: error.message})
            } else {
                var opinie;
                const opinieQuery = pool.query("SELECT * FROM sklep.opinie ORDER BY data", (error, result) => {
                    if (error) {
                        return response.status(400).render('pages/opinie', {opinie: 0, result: "Wystąpił błąd przy pobieraniu tabeli opinie"});
                    } else {
                        opinie = result.rows;
                    }
                });

                return response.status(200).render('pages/opinie', {opinie: opinie, result: "Udało się dodać opiniea"});
            }
        });        
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    getTable,
    addOpinia
}