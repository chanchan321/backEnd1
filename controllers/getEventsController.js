const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getEvents = async (req, res) => {
    const date = req.params.date

    const sqlGET= `SELECT * FROM calendarevents WHERE setDate = ?`
    db.query(sqlGET,date ,(err,result)=>{
         res.send(result);
    })  
}


const addEvents = async (req, res) => {
    const reqID = crypto.randomBytes(8).toString("hex");
    const {content,date,request} = req.body
    
    if(request === 'other'){
        const sqlAdd= `INSERT INTO calendarevents(eventID, eventName, setDate, setTime, description, place, status) VALUES (?,?,?,?,?,?,?)`
        db.query(sqlAdd,[reqID, content.typeOfevent, date, JSON.stringify(content.availTime), content.description, content.place, 'ongoing'] ,(err,result)=>{
            res.send(result);
        })  
    }else
     if(request === 'referral'){
        const sqlAdd= `INSERT INTO calendarevents(eventID, eventName, setDate, setTime, description, place, status) VALUES (?,?,?,?,?,?,?)`
        db.query(sqlAdd,[reqID, 'Referral', date, JSON.stringify(content.time),' ', ' ', 'ongoing'] ,(err,result)=>{
         
            if(err) return res.sendStatus(404);

                const sqlupdate= `UPDATE refferralrequest SET status = ?, eventID = ? WHERE referralID = ?`
                db.query(sqlupdate,['ongoing',reqID, content.event.referralID] ,(err,result)=>{
                    res.send(result);
                }) 
        }) 
    }else
    if(request === 'appointment'){

       const sqlAdd= `INSERT INTO calendarevents(eventID, eventName, setDate, setTime, description, place, status) VALUES (?,?,?,?,?,?,?)`
       db.query(sqlAdd,[reqID, 'Appointment', date, JSON.stringify(JSON.parse(content.timeRequested)),' ', ' ', 'ongoing'] ,(err,result)=>{
          
           if(err) return res.sendStatus(404);

           if (content.reschedTime){
                const sqlupdate= `UPDATE appointmentrequestlist SET timeRequested = ?, dateRequested = ?, status = ?, response = ?, eventID = ? WHERE requestID = ?`
                db.query(sqlupdate,[ JSON.stringify(JSON.parse(content.reschedTime)),content.reschedDate ,'ongoing', 'Your Appointment Request is Approved!' ,reqID, content.requestID] ,(err,result)=>{
                    res.send(result);
       
                }) 
           }else{
            const sqlupdate= `UPDATE appointmentrequestlist SET timeRequested = ?, dateRequested = ?, status = ?, response = ?, eventID = ? WHERE requestID = ?`
            db.query(sqlupdate,[ JSON.stringify(JSON.parse(content.timeRequested)),date ,'ongoing', 'Your Appointment Request is Approved!' ,reqID, content.requestID] ,(err,result)=>{
                res.send(result);
          
            }) 
           }

               
       }) 
   }
       
}
const editEvents = async (req, res) => {
  

 
}

const delEvents = async (req, res) => {
    const {eventID} = req.params
    const sqldelete= `DELETE FROM calendarevents WHERE eventID = ?`
    db.query(sqldelete,eventID,(err,result)=>{
        if(err) return res.sendStatus(400)
        res.send(result);
    }) 
   
}




module.exports = {
    getEvents,
    addEvents,
    editEvents,
    delEvents
}
