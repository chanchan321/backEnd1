const mysql = require("mysql");

const db = mysql.createConnection({
    host:'db4free.net',
    user:'capstone357',
    password:'CAPSTONEguidance123',
    database:'dbtesting357'
});




module.exports =  db
