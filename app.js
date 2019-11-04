const express = require('express');
const app = express();
const mongoose = require('mongoose'); //instanciando mongoose
const bodyParser = require('body-parser');
const config = require('./config/config');

const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options); //Banco conectado!
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
});//vai ficar ouvindo e me avisar se acontecer algo de diferente

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados!');
})

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!');
})

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const indexRouter = require('./Routes/index');
const usersRouter = require('./Routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen('3000');

module.exports = app;