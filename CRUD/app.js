const express = require('express');
const app = express();
const rotaProdutos = require('./src/routes/produtos');
const rotaPedidos = require('./src/routes/pedidos');

app.use(express.urlencoded({ extended: false })); // apenas dados simples
app.use(express.json()); // só json na entrada

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

// Quando não encontra rota
app.use((req, res, next) => {
    const erro = Error('Não encontrado!');
    erro.status = 404;
    next(erro);
});

module.exports = app;