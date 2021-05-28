const { response } = require('express');
const pool = require('../database');

const getTable = (request, response) => {
    try {
        const tableQuery = pool.query("SELECT * FROM sklep.produkt", (error, result) => {
            if (error) {
                return response.status(400).render('pages/produkt', {produkt: 0, result: "Wystąpił błąd przy pobieraniu tabeli"});
            } else {
                return response.status(200).render('pages/produkt', {produkt: result.rows, result: ""});
            }
        });    
    } catch (error) {
        console.log(error);
    }
    
}


const addProdukt = (request, response) => {
    const { nazwa, cena, producentId } = request.body;
    console.log( nazwa, cena, producentId );

    try {

        const addQuery = pool.query('INSERT INTO sklep.produkt (nazwa_produkt, cena_produkt, id_producent) VALUES ($1, $2, $3)', [nazwa, cena, producentId], (error, result) => {
            if (error) {
                return response.status(400).render('pages/produkt', {produkt: 0, result: error.message})
            } else {
                var produkty;
                const produktQuery = pool.query("SELECT * FROM sklep.produkt ORDER BY id_produkt", (error, result) => {
                    if (error) {
                        return response.status(400).render('pages/produkt', {produkt: 0, result: "Wystąpił błąd przy pobieraniu tabeli produkt"});
                    } else {
                        produkty = result.rows;
                    }
                });

                return response.status(200).render('pages/produkt', {produkt: produkty, result: "Udało się dodać produkt"});
            }
        });        
    } catch (error) {
        console.log(error);
    }

}


const updateProdukt = (request, response) => {
    const produktId = request.params.id;
    const { empty, nazwa, cena, producentId } = request.body;
    console.log( produktId, nazwa, cena, producentId );

    try {
        const updateQuery = pool.query("UPDATE sklep.produkt SET nazwa_produkt = $2, cena_produkt = $3, id_producent = $4 WHERE id_produkt = $1", [produktId, nazwa, cena, producentId], (error, result) => {
            if (error) {
                //return response.status(400).render('pages/matches', {matches: 0, produkts: 0, result: error.message})
                //return response.status(400).send({message: error.message});
                var message = error.message;
                response.send({stat: 400, message: message});
                return;
            } else {
                //return response.status(200).render('pages/matches', {matches: player, produkts: produkts, result: "Udało się zaktualizować zawodnika"});
                //return response.status(200).send({message: "Udało się zaktualizować zawodnika"});
                response.send({stat: 200, message: "Udało się zaktualizować rekord"});
            }
        });
    } catch (error) {
        console.log(error);
    }
}


const deleteProdukt = (request, response) => {
    const produktId = request.params.id;
    //const n = str.indexOf("x");
    //const matchId = str.substring(0, n);
    //const playerId = str.substring(n + 1, str.length);
    try {
        const deleteQuery = pool.query('DELETE FROM sklep.produkt WHERE id_produkt = $1', [produktId], (error, result) => {
            if (error) {
                //return response.status(400).send({message: "Nie udało się usunąć rekordu"});
                response.send({stat: 400, message: "Nie udało się usunąć rekordu"});
            } else {
                //return response.status(200).send({message: "Usunięto rekord"});
                response.send({stat: 400, message: "Udało się usunąć rekord"});
            }
        });
    } catch(error) {
        console.log(error);
    }
}


module.exports = {
    getTable,
    addProdukt,
    updateProdukt,
    deleteProdukt
}