const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getEventDcalendar = async (req, res) => {
    const {eventID,eventName} = req.params
    
    if(eventName === 'Appointment') {
               const getSQL = `SELECT * FROM appointmentrequestlist INNER JOIN calendarevents ON appointmentrequestlist.eventiD = calendarevents.eventID Where appointmentrequestlist.eventiD = ?;`
                 db.query(getSQL,eventID,(err,result)=>{
                    const event = result[0]
                        const getstudent = `SELECT * FROM studpis where LRN = ?;`
                        db.query(getstudent,event.studLrn,(err,result)=>{
                            res.send({eventInfo:event,studInfo:result[0]})
                        })
                 })
    }else if(eventName === 'Referral'){
        const getSQL = `SELECT * FROM refferralrequest INNER JOIN calendarevents ON refferralrequest.eventiD = calendarevents.eventID Where refferralrequest.eventiD = ?;`
        db.query(getSQL,eventID,(err,result)=>{
           res.send(result[0])
        })
    }
  
}

module.exports = {
    getEventDcalendar,
}
