require('dotenv').config({ path: '.env' })

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = process.env.PORT;
const pool = require("./database.js");
const forms = multer();

app.set('view engine', 'ejs');

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(forms.array());
app.use(express.static("general"));


var tableRouter = require('./routes/tableRouter');
var produktRouter = require('./routes/produktRouter');
var producentRouter = require('./routes/producentRouter');
var klientRouter = require('./routes/klientRouter');
var opinieRouter = require('./routes/opinieRouter');
var kurierRouter = require('./routes/kurierRouter');
var kategoriaRouter = require('./routes/kategoriaRouter');
var zamowienieRouter = require('./routes/zamowienieRouter');
var zamowienieProduktRouter = require('./routes/zamowienieProduktRouter');
var kategoriaProduktRouter = require('./routes/kategoriaProduktRouter');
var liczbaProduktowKategoriaRouter = require('./routes/liczbaProduktowKategoriaRouter');
var rankingCenRouter = require('./routes/rankingCenRouter');
var zamowieniaInfoRouter = require('./routes/zamowieniaInfoRouter');


app.use('/', tableRouter);
app.use('/produkt', produktRouter);
app.use('/producent', producentRouter);
app.use('/klient', klientRouter);
app.use('/opinie', opinieRouter);
app.use('/kurier', kurierRouter);
app.use('/kategoria', kategoriaRouter);
app.use('/zamowienie', zamowienieRouter);
app.use('/zamowienie_produkt', zamowienieProduktRouter);
app.use('/kategoria_produkt', kategoriaProduktRouter);
app.use('/liczba_prod_kat', liczbaProduktowKategoriaRouter);
app.use('/ranking_cen', rankingCenRouter);
app.use('/zamowienia_info', zamowieniaInfoRouter);


app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Endpoint Not found'
    })
});


app.listen(port, () => {
    console.log(`App is running on port ${port}.`)
});