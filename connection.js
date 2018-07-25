
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Untukapa',
    database: 'nodeblog',
    multipleStatements: true
});

connection.connect();

module.exports = connection;
