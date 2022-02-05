var express = require("express");
var path = require("path");
var routes = require('./routes');
var mysql = require("mysql");
var fileUpload = require('express-fileupload');
var bodyParser = require("body-parser");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db1'


});
connection.connect();
global.db = connection;
 


var app = express();

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE db1';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("database created");
    })
})

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE items(name VARCHAR(255),price int)';
    db.query(sql, (err, result) => {
        if (err) {
            //console.log("error here")
            throw err;
        }
        console.log(result);
        res.send('Items table created');
    })
});


app.get('/additem1', (req, res) => {
    let sql = 'INSERT INTO items VALUES ("Gaming PC",2000)';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Item added into table')
    })
})


app.get('/', (req, res) => {
    let sql = 'SELECT * from items';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        res.render('index', { obj: result });
    })
})

app.get('/create', (req, res) => {
    let sql = "CREATE TABLE ecommerce_items (item_name varchar(255),item_price int,image varchar(255))";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('ecommerce items table created');
    })
})

app.get('/change', (req, res) => {
    let sql = "ALTER TABLE ecommerce_items Modify column item_price varchar(255)";
    db.query(sql, (err, result) => {
        if (err) {
            //console.log("error here")
            throw err;
        }
        console.log(result);
        res.send('Posts table created');
    })
})


app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.get('/form', routes.form);
app.post('/form', routes.form);
app.get('/main',routes.main);


app.listen(app.get("port"), function () {
    console.log("Server started on port " + app.get("port"));
})
