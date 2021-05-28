const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.ranking_cen", (error, result) => {
            if (error) {
                return response.status(400).render('pages/ranking_cen', {ranking: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/ranking_cen', {ranking: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    getTable
}