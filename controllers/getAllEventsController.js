const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getAllEvents = async (req, res) => {

    const sqlGET= `SELECT * FROM calendarevents WHERE status != ?`
    db.query(sqlGET,'canceled',(err,result)=>{
         res.send(result);
    })  
}


module.exports = {
    getAllEvents,
}
