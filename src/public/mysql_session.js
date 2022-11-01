const mysql = require("mysql")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'iob',
    timezone:"08:00"
})

connection.connect();

export default connection;