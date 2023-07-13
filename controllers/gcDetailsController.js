const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getgcDetails = async (req, res) => {
    const sqlgetdetails= `SELECT * FROM accounts INNER JOIN guidancecdetails ON accounts.accountID = guidancecdetails.accountID Where accounts.accountID = ?`

    db.query(sqlgetdetails,[req.params.accID], (err,result)=>{
        res.send(result);
       
    })  

}

const editgcDetails = async (req, res) => {
    if(req.body.type === 'details'){
        const {accID, lastname, firstname, middlename, username, contactNumber, type} = req.body
        
        const sqledit= `UPDATE accounts SET username = ? WHERE accountID = ?`
        db.query(sqledit,[username,accID], (err,result)=>{
            if(err) return res.sendStatus(500)

            const editdet = 'UPDATE guidancecdetails SET lastname = ?,firstname = ?, middlename = ?, contactNumber = ? WHERE accountID = ?'
            db.query(editdet,[lastname, firstname, middlename, contactNumber,accID], (err,result)=>{
                if(err) return res.sendStatus(500)
                res.sendStatus(200)
            }) 
        })  
    }else if (req.body.type === 'password'){
        const {accID, bycrptOldpas,oldpassword, newpassword} = req.body

        let compare = '';
        bcrypt.compare(oldpassword, bycrptOldpas, function(err, result) {
            compare += result;
        })

        const hashed = await bcrypt.hash(newpassword , 10); // true

        if(compare === 'false') return res.sendStatus(404)

        if(compare === 'true') {
            const sqlupdatepass= "UPDATE accounts set password = ? WHERE accountID = ?";
                db.query(sqlupdatepass,[hashed,accID],(err,result)=>{
                    res.sendStatus(200)
                })
        }
       
    }
   
}



module.exports = {
    getgcDetails,
    editgcDetails
}
