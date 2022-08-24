const mysql = require('../data/mysql').pool;

var produtosController = {
    todosProdutos: (req, res, next) => {
        mysql.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(
                'SELECT * FROM produtos',
                (err, result, field) => {
                    conn.release();
                    if(err){ return res.status(500).send({ error: err }) };
                    return res.status(200).send({ response: result });
                }
            )
        })
    },
    
    // Recebendo um só produto
    umProduto: (req, res, next) => {
        mysql.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(
                'SELECT * FROM produtos WHERE id_produto = ?',
                [req.params.id],
                (err, result, field) => {
                    conn.release();
                    if(err){ return res.status(500).send({ error: err }) };
                    return res.status(200).send({ response: result });
                }
            )
        })
    },
    
    // Inserindo um produto
    inserirProduto: (req, res, next) => {
        mysql.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(
                'INSERT INTO produtos (nome, preco) VALUES(?,?)',
                [req.body.nome, req.body.preco],
                (err, result, field) => {
                    conn.release();
                    if(err){ return res.status(500).send({ error: err }) };
                    res.status(201).send({
                        mensagem: 'Produto inserido!'
                    });
                }
            )
        });
    },
    
    // Atualizando um produto
    atualizandoProduto: (req, res, next) => {
        mysql.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(
                'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
                [req.body.nome, req.body.preco, req.body.id],
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
    
    // Deletando um produto
    deletandoProduto: (req, res, next) => {
        mysql.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(
                'DELETE FROM produtos WHERE id_produto = ?',
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
    },
}

module.exports = produtosController;