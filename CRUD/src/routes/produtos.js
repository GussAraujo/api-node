const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.route('/')
  .get(produtosController.todosProdutos)
  .post(produtosController.inserirProduto)
  .patch(produtosController.atualizandoProduto)
  .delete(produtosController.deletandoProduto)

router.get('/:id', produtosController.umProduto);

module.exports = router;