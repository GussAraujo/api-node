const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/', pedidosController.todosPedidos);
router.get('/:id', pedidosController.umPedido);
router.post('/', pedidosController.inserirPedido);
router.patch('/', pedidosController.atualizandoPedido);
router.delete('/', pedidosController.deletandoPedido);

module.exports = router;