const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

const getEventbyID = async (req, res) => {
    const eventID = req.params.eventID

    const sqlGET= `SELECT * FROM calendarevents WHERE eventID = ?`
    db.query(sqlGET,eventID ,(err,result)=>{
         res.send(result);
    })  
}





module.exports = {
    getEventbyID
}
