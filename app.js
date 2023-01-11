var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routes = require('./routes/indice')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Importa todas las rutas
routes.forEach(ruta => {
    app.use(ruta)
});

var http = require('http');
var server = http.createServer(app);

var port = process.env.PORT || '5000';

const db = require('./database/config/db').sequelize;

server.listen(port);
console.log('Servidor iniciado en puerto ', port);


