const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.klient", (error, result) => {
            if (error) {
                return response.status(400).render('pages/klient', {klient: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/klient', {klient: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}


const addKlient = (request, response) => {
    const { email, haslo } = request.body;
    console.log( email, haslo );

    try {

        const addQuery = pool.query('INSERT INTO sklep.klient (email_klient, haslo) VALUES ($1, $2)', [email, haslo], (error, result) => {
            if (error) {
                return response.status(400).render('pages/klient', {klient: 0, result: error.message})
            } else {
                var klient;
                const klientQuery = pool.query("SELECT * FROM sklep.klient ORDER BY id_klient", (error, result) => {
                    if (error) {
                        return response.status(400).render('pages/klient', {klient: 0, result: "Wystąpił błąd przy pobieraniu tabeli klient"});
                    } else {
                        klient = result.rows;
                    }
                });

                return response.status(200).render('pages/klient', {klient: klient, result: "Udało się dodać klienta"});
            }
        });        
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    getTable,
    addKlient
}