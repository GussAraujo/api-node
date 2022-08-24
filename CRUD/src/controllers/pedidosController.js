const mysql = require('../data/mysql').pool;

var pedidosController = {
    // Recebendo todos os pedidos
    todosPedidos: (req, res, next) => {
        mysql.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(`SELECT pedidos.id_pedido,
                        pedidos.quantidade,
                        produtos.id_produto,
                        produtos.nome,
                        produtos.preco
                   FROM pedidos
             INNER JOIN produtos
                     ON produtos.id_produto = pedidos.id_produto`,
                (err, result, field) => {
                    if(err){ return res.status(500).send({ error: err }) };
                    return res.status(200).send({ response: result });
                }
            )
        })
    },

    // Recebendo um pedido específico
    umPedido: (req, res, next) =>{
        mysql.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(
                'SELECT * FROM pedidos WHERE id_pedido = ?',
                [req.params.id],
                (err, result, field) => {
                    if(err){ return res.status(500).send({ error: err }) };
                    if(result.length == 0){
                        return res.status(404).send({ mensagem: 'Pedido não encontrado!' });
                    }
                    return res.status(200).send({ response: result });
                }
            )
        })
    },

    // // Inserindo um pedido
    inserirPedido: (req, res, next) =>{
        mysql.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(
                'SELECT * FROM produtos WHERE id_produto = ?',
                [req.body.id_produto],
                (err, result, field) => {
                    if(err){ return res.status(500).send({ error: err }) }
                    if(result.length == 0){
                        return res.status(404).send({ mensagem: 'Produto não encontrado!' });
                    }
                    conn.query(
                        'INSERT INTO pedidos (id_produto, quantidade) VALUES(?,?)',
                        [req.body.id_produto, req.body.quantidade],
                        (err, result, field) => {
                            conn.release();
                            if(err){ return res.status(500).send({ error: err }) };
                            res.status(201).send({
                                mensagem: 'Pedido inserido!'
                            });
                        }
                    )
                }
            )
        });
    },

    // Atualizando um pedido
    atualizandoPedido: (req, res, next) => {
        mysql.getConnection((err, conn) => {
            if (err) throw err;
    
            conn.query(
                'UPDATE pedidos SET id_produto = ?, quantidade = ? WHERE id_pedido = ?',
                [req.body.id_produto, req.body.quantidade, req.body.id_pedido],
                (err, result, field) => {
                    conn.release();
                    if(err){ return res.status(500).send({ error: err }) };
                    res.status(202).send({
                        mensagem: 'Produto Atualizado!'
                    });
                }
            )
        });
    },

    // Deletando um pedido
    deletandoPedido: (req, res, next) => {
        mysql.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(
                'DELETE FROM pedidos WHERE id_pedido = ?',
                [req.body.id],
                (err, result, field) => {
                    conn.release();
                    if(err){ return res.status(500).send({ error: err }) };
                    res.status(202).send({
                        mensagem: 'Produto Deletado!'
                    });
                }
            )
        });
    }
}

module.exports = pedidosController;