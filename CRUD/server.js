const express = require('express');
const app = express();
const rotaProdutos = require('./src/routes/produtos');
const rotaPedidos = require('./src/routes/pedidos');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

app.listen(3000, () => {
    console.log('Servidor Rodando!');
});

app.use((req, res, next) => {
    const erro = Error('Não encontrado!');
    erro.status = 404;
    next(erro);
});