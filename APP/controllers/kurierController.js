const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.kurier", (error, result) => {
            if (error) {
                return response.status(400).render('pages/kurier', {kurier: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/kurier', {kurier: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}


const addKurier = (request, response) => {
    const { nazwa, koszt, czas } = request.body;
    console.log( nazwa, koszt, czas );

    try {

        const addQuery = pool.query('INSERT INTO sklep.kurier (nazwa_firmy, koszt_dostawy, czas_dostawy) VALUES ($1, $2, $3)', [nazwa, koszt, czas], (error, result) => {
            if (error) {
                return response.status(400).render('pages/kurier', {kurier: 0, result: error.message})
            } else {
                var kurier;
                const kurierQuery = pool.query("SELECT * FROM sklep.kurier ORDER BY id_kurier", (error, result) => {
                    if (error) {
                        return response.status(400).render('pages/kurier', {kurier: 0, result: "Wystąpił błąd przy pobieraniu tabeli kurier"});
                    } else {
                        kurier = result.rows;
                    }
                });

                return response.status(200).render('pages/kurier', {kurier: kurier, result: "Udało się dodać kurier"});
            }
        });        
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getTable,
    addKurier
}