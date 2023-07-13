const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const changeDateTime = async (req, res) => {
    const {eventInfo, date, time} = req.body

    if(eventInfo.eventName === 'Appointment'){
        const sqlresched= "UPDATE calendarevents SET setDate = ?,setTime = ? WHERE eventID = ?";
        db.query(sqlresched,[date, JSON.stringify(time), eventInfo.eventID],(err,result)=>{
            if(result){
                const sqlresched= "UPDATE appointmentrequestlist SET timeRequested = ?,dateRequested = ?, reschedTime = ?, reschedDate = ? WHERE eventID = ?";
                    db.query(sqlresched,[JSON.stringify(time),date,JSON.stringify(time),date, eventInfo.eventID],(err,result)=>{
                    res.send('rescheduled')
                    })
            }
        })

    }else{
    const sqlresched= "UPDATE calendarevents SET setDate = ?,setTime = ? WHERE eventID = ?";
        db.query(sqlresched,[date, JSON.stringify(time), eventInfo.eventID],(err,result)=>{
         res.send('rescheduled')
        })
    }
 

    

}



module.exports = {
    changeDateTime
}
