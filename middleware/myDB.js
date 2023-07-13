const mysql = require("mysql");

const db = mysql.createConnection({
    host:'db4free.net',
    user:'capstone321',
    password:'CHANCHANchan123',
    database:'dbtesting321'
});




module.exports =  db
