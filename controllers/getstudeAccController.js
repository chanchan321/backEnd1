const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getstudDetails = async (req, res) => {
    const accID = req.params.accID

    const sqlgetstudD= "SELECT * FROM accounts INNER JOIN studpis ON accounts.accountID = studpis.accountID Where accounts.accountID = ?";
    db.query(sqlgetstudD,[accID],(err,result)=>{ 
        res.send(result)
    })

    //  const sqlgetstudD= "SELECT * FROM accounts WHERE accountID = ?";
    //     db.query(sqlgetstudD,[accID],(err,result)=>{ 
    //         res.send(result)
    //     })

}


const editstudDetails = async (req, res) => {
    const {type} = req.body   

    if(type === 'details'){
        const {accID, lrn, contactNumber} = req.body
        const sqlgetstudD= "UPDATE studpis set contactNumber = ? Where LRN = ?";
        db.query(sqlgetstudD,[contactNumber, lrn],(err,result)=>{ 
            res.send(result)
            
        })
    }else if (type === 'password'){
        const {accID, bycrptOldpas,oldpassword, newpassword} = req.body

        const hashed = await bcrypt.hash(newpassword , 10); // true

        let compare = '';
        bcrypt.compare(oldpassword, bycrptOldpas, function(err, result) {
            compare += result;


            if(compare === 'false') return res.sendStatus(404)
    
            if(compare === 'true') {
                const sqlupdatepass= "UPDATE accounts set password = ? WHERE accountID = ?";
                    db.query(sqlupdatepass,[hashed,accID],(err,result)=>{
                        res.sendStatus(200)
                    })
            }
        })

      
    }
}   


module.exports = {
    getstudDetails,
    editstudDetails
}
