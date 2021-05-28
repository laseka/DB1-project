const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.kategoria_produkt", (error, result) => {
            if (error) {
                return response.status(400).render('pages/kategoria_produkt', {kategoria_produkt: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/kategoria_produkt', {kategoria_produkt: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}


const addKategoriaProdukt = (request, response) => {
    const { produktId, kategoriaId } = request.body;
    console.log( produktId, kategoriaId );

    try {

        const addQuery = pool.query('INSERT INTO sklep.kategoria_produkt (id_produkt, id_kategoria) VALUES ($1, $2)', [produktId, kategoriaId], (error, result) => {
            if (error) {
                return response.status(400).render('pages/kategoria_produkt', {kategoria_produkt: 0, result: error.message})
            } else {
                var kategoria_produkt;
                const kategoria_produktQuery = pool.query("SELECT * FROM sklep.kategoria_produkt", (error, result) => {
                    if (error) {
                        return response.status(400).render('pages/kategoria_produkt', {kategoria_produkt: 0, result: "Wystąpił błąd przy pobieraniu tabeli kategoria_produkt"});
                    } else {
                        kategoria_produkt = result.rows;
                    }
                });

                return response.status(200).render('pages/kategoria_produkt', {kategoria_produkt: kategoria_produkt, result: "Udało się dodać kategoria_produkt"});
            }
        });        
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    getTable,
    addKategoriaProdukt
}