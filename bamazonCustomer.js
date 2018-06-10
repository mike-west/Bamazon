var loaded = require("dotenv").config();
var mysql = require("mysql");
var keys = require('./keys');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'm7i8k8e3',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
    connection.query("SELECT * FROM products", function (error, results, fields) {
        if (error) { throw error; }
        console.log(results);
        connection.end(function (err) {
            console.log(err);
        });
    })
});