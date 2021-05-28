const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.kategoria", (error, result) => {
            if (error) {
                return response.status(400).render('pages/kategoria', {kategoria: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/kategoria', {kategoria: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}


const addKategoria = (request, response) => {
    const { nazwa, opis } = request.body;
    console.log( nazwa, opis );

    try {

        const addQuery = pool.query('INSERT INTO sklep.kategoria (nazwa_kategoria, opis_kategoria) VALUES ($1, $2)', [nazwa, opis], (error, result) => {
            if (error) {
                return response.status(400).render('pages/kategoria', {kategoria: 0, result: error.message})
            } else {
                var kategoria;
                const kategoriaQuery = pool.query("SELECT * FROM sklep.kategoria ORDER BY id_kategoria", (error, result) => {
                    if (error) {
                        return response.status(400).render('pages/kategoria', {kategoria: 0, result: "Wystąpił błąd przy pobieraniu tabeli kategoria"});
                    } else {
                        kategoria = result.rows;
                    }
                });

                return response.status(200).render('pages/kategoria', {kategoria: kategoria, result: "Udało się dodać kategoria"});
            }
        });        
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    getTable,
    addKategoria
}