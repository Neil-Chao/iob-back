import mysql from "mysql";
// var mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'iob'
})

connection.connect();

connection.query('SELECT * from user', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.end()