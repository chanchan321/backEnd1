const db = require('../middleware/myDB');
const crypto = require("crypto");


const getReferral = async (req, res) => {  

    const sqlgetReferrals= `SELECT * FROM refferralrequest ORDER BY timeSTAMP DESC`
    db.query(sqlgetReferrals,(err,result)=>{
         res.send(result)

  
})

}

const addReferral = async (req, res) => {
    const reqID = crypto.randomBytes(16).toString("hex");
    const content = req.body.content;
        
     const sqlAddReferral= `INSERT INTO refferralrequest (referralID, dateOfReferral, status, employeeID, teacherName, teacherContactNum, designation, nameOfStudent,studLrn, gradeLevel, gender, parentName, parentContactNum, agreeToCounsel, reasonforReferral, initialActions, acknowledgementContent) VALUES 
                             (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
     db.query(sqlAddReferral,[reqID, content.date,'pending' ,content.employeeID, content.referredBy, content.teacherContactNum, content.designation, content.nameOfStudent, content.lrn,content.gradeLevel, content.gender,
                 content.parentGuardian, content.parentGuardianContact, content.agreetoCounsel, content.reasonReferral, content.initalActions, JSON.stringify({})],(err,result)=>{
                    
                if(!result) return res.sendStatus(500)
                 res.send(result)
     })
    
    

}
   
module.exports = {
    getReferral,
    addReferral
}
