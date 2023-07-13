const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getStud = async (req, res) => {
    const sqlgetStud= `SELECT * FROM studpis INNER JOIN piscontent ON piscontent.pisID = studpis.pisID`
    db.query(sqlgetStud, (err,result)=>{
               res.send(result);
    })  

}


module.exports = {
  getStud
}
