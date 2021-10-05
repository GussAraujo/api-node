const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.get('/', produtosController.todosProdutos);
router.get('/:id', produtosController.umProduto);
router.post('/', produtosController.inserirProduto);
router.patch('/', produtosController.atualizandoProduto);
router.delete('/', produtosController.deletandoProduto);

module.exports = router;