const mysql = require('mysql');

const pool = mysql.createPool({
    "user": process.env.MSQL_USER,
    "password": process.env.MSQL_PASSWORD,
    "database": process.env.MSQL_DATABASE,
    "host": process.env.MSQL_HOST
});

exports.pool = pool;