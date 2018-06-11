var loaded = require("dotenv").config();
var mysql = require("mysql");
var table = require("table");
var format_currency = require("format-currency");
var numeral = require("numeral");
var inquirer = require('inquirer');
var keys = require('./keys');

var connection = mysql.createConnection({
    host: keys.mysql.MYSQL_HOST,
    user: keys.mysql.MYSQL_USER_ID,
    password: keys.mysql.MYSQL_PASSWORD,
    database: 'bamazon'
});

var purchaseInq = function(rowArr) {
    // console.log("Do you want to buy somethng?");
    var choices = [];
    rowArr.forEach(element => {
        choices.push(element.item_id + " " + element.product_name);
    });
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which item do you want to purchase",
                name: "item",
                choices: choices
            }
        ])
    .then(function(inqResponse) {
        console.log(inqResponse);
        let item = inqResponse.item;
        let ix = item.substr(0,item.indexOf(' '));
        console.log(ix);
    });

}

var displayRows = function(rowArr) {
    var curr_opts = { format: '%s%v', symbol: '$'};
    var config = {
        columns: {
            3: {"alignment": "right"},
            4: {"alignment": "right"}
        }
    };
    var rows = [];
    var headings = ["Item Id", "Product", "Department", "Price", "In Stock"];
    rows.push(headings);
    rowArr.forEach(element => {
        var data = [element.item_id, element.product_name, element.department_name, 
            format_currency(element.price, curr_opts),
            (element.stock_quantity > 0)  
            ? numeral(element.stock_quantity).format('0,0')
            : "out of stock"];
        rows.push(data);
    });
    var output = table.table(rows, config);
    console.log(output);
};


connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    // console.log('connected as id ' + connection.threadId);
    connection.query("SELECT * FROM products", function (error, results, fields) {
        if (error) { throw error; }
        // console.log(results);
        displayRows(results);
        purchaseInq(results);
        connection.end(function (err) {
            if (err) {
                console.log(err);
            }
        });
    })
});