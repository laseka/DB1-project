const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.lista_produktow", (error, result) => {
            if (error) {
                return response.status(400).render('pages/index', {produkty: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/index', {produkty: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    getTable
}