const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {

    try {
        const tableQuery = pool.query("SELECT * FROM sklep.produkty_w_kategorii", (error, result) => {
            if (error) {
                return response.status(400).render('pages/liczba_prod_kat', {view: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/liczba_prod_kat', {view: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    getTable
}