const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const addcounselingRec = async (req, res) => {
            const {eventID, lrn,nature,result,date,oldRec,type} = req.body
            oldRec.push({
                nature:nature,
                result:result,
                date:date
            })
            
            if(type === 'Referral'){
                const sqlUpdate = 'Update studpis set counsellingRec = ? Where LRN = ?;'
                db.query(sqlUpdate,[JSON.stringify(oldRec),lrn],(err,result)=>{
                if(err) return res.sendStatus(500)

                const sqlUpdate = 'Update calendarevents set status = ? Where eventID = ?;'
                    db.query(sqlUpdate,['done',eventID],(err,result)=>{
                    if(err) return res.sendStatus(500)

                            const sqlUpdate = 'Update refferralrequest set status = ? Where eventID = ?;'
                                db.query(sqlUpdate,['done',eventID],(err,result)=>{
                                if(err) return res.sendStatus(500)
                                    res.sendStatus(200)
                                    
                                })
                    })
            })
            }else if(type === 'Appointment'){
               
            
                const sqlUpdate = 'Update studpis set counsellingRec = ? Where LRN = ?;'
                db.query(sqlUpdate,[JSON.stringify(oldRec),lrn],(err,result)=>{
                if(err) return res.sendStatus(500)

                const sqlUpdate = 'Update calendarevents set status = ? Where eventID = ?;'
                    db.query(sqlUpdate,['done',eventID],(err,result)=>{
                    if(err) return res.sendStatus(500)

                            const sqlUpdate = 'Update appointmentrequestlist set status = ? Where eventID = ?;'
                                db.query(sqlUpdate,['done',eventID],(err,result)=>{
                                if(err) return res.sendStatus(500)
                                    res.sendStatus(200)

                                })
                    })
            })
        }
            
    }

   


module.exports = {
    addcounselingRec,
}
