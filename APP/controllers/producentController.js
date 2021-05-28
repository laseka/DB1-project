const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.producent", (error, result) => {
            if (error) {
                return response.status(400).render('pages/producent', {producent: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/producent', {producent: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}


const addProducent = (request, response) => {
    const { nazwa, email } = request.body;
    console.log( nazwa, email );

    try {

        const addQuery = pool.query('INSERT INTO sklep.producent (nazwa_producent, email_producent) VALUES ($1, $2)', [nazwa, email], (error, result) => {
            if (error) {
                return response.status(400).render('pages/producent', {producent: 0, result: error.message})
            } else {
                var producent;
                const producentQuery = pool.query("SELECT * FROM sklep.producent ORDER BY id_producent", (error, result) => {
                    if (error) {
                        return response.status(400).render('pages/producent', {producent: 0, result: "Wystąpił błąd przy pobieraniu tabeli producent"});
                    } else {
                        producent = result.rows;
                    }
                });

                return response.status(200).render('pages/producent', {producent: producent, result: "Udało się dodać producent"});
            }
        });        
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    getTable,
    addProducent
}