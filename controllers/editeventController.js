const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const editevent = async (req, res) => {
    const {eventID, place, description} = req.body

        const sqlUpdate= `UPDATE calendarevents SET description = ?, place = ? WHERE eventID = ?;`
        db.query(sqlUpdate,[description, place, eventID], (err,result)=>{
            if(err) return res.sendStatus(500)
            res.send(result)
        
        }) 
}


module.exports = {
    editevent
}
