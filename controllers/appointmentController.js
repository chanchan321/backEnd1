const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getAppointmentReqs = async (req, res) => {

         const getSQL = `SELECT * FROM studpis INNER JOIN appointmentrequestlist ON studpis.LRN = appointmentrequestlist.studLrn;`
        // const getSQL = `SELECT * FROM appointmentrequestlist `
        db.query(getSQL,(err,result)=>{
                 console.log(err)
            res.send(result)
        })
    
}

module.exports = {
    getAppointmentReqs,
}
