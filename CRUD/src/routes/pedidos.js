const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.route('/')
  .get(pedidosController.todosPedidos)
  .post(pedidosController.inserirPedido)
  .patch(pedidosController.atualizandoPedido)
  .delete(pedidosController.deletandoPedido)

router.get('/:id', pedidosController.umPedido);

module.exports = router;