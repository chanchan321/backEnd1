const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getAvailableCal = async (req, res) => {
    
     const available = req.params.date;

        // const sqlgetApp= "SELECT timechosen FROM trya WHERE dateee = ?";
        // db.query(sqlgetApp,[available],(err,result)=>{
        //          res.send(result)
            
        //     })     
            
            const sqlgetApp= "SELECT setTime FROM calendarevents WHERE (setDate = ?) AND (status != ?)";
        db.query(sqlgetApp,[available,'canceled'],(err,result)=>{
                res.send(result)
            
            })      
}

module.exports = {
    getAvailableCal,
}
