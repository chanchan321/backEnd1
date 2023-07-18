const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getAppointmentReq = async (req, res) => {

    const lrn = req.params.lrn;

        const sqlgetApp= "SELECT * FROM appointmentRequestList WHERE studLrn = ?";
        db.query(sqlgetApp,[lrn],(err,result)=>{
                 console.log(result)
                if(result[0] === undefined) return res.sendStatus(204)
                // res.send(result[0])
                // res.send(result)
                // console.log(result)
                const allReq = result.filter((reqeust)=> reqeust.status === 'pending')
                // console.log(allReq)
                if(allReq[0]) return res.send(allReq[0])
                const rechedallReq = result.filter((reqeust)=> reqeust.status === 'ongoing')
                //  console.log(rechedallReq)
                res.send(rechedallReq[0]) 
             

    })
    

}

const addAppointmentReq = async (req, res) => {
    const reqID = crypto.randomBytes(16).toString("hex");
    const content = req.body.content;
    const lrn = req.body.lrn;
        //    (content.dateRequested)
                const sqladdAppointment= `INSERT INTO appointmentRequestList (requestID,dateOfRequest, studLrn, timeRequested, dateRequested, reason, status, reschedTime, reschedDate , response, eventID) VALUES (?,?,?,?,?,?,?,?,?,?,?);`

                db.query(sqladdAppointment,[reqID, content.dateOfRequest, lrn, JSON.stringify(content.timeRequested), content.dateRequested, content.reason, content.status, null, null, null, null], (err,result)=>{
                     res.send(result);
                   
                    
                })  
    }
   
    const editAppointmentReq = async (req, res) => {
        const {content, date, request, message} = req.body
        if(request === 'cancel'){
                    const sqlUpdateAppointment= `UPDATE appointmentRequestList SET status = ? WHERE requestID = ?;`
                    db.query(sqlUpdateAppointment,['canceled', content.requestID], (err,result)=>{
                        if(err) return res.sendStatus(500)
                        if(content.status === 'pending') return res.sendStatus(200) 

                            if(content.status === 'ongoing') {
                                const sqlUpdateAppointment= `UPDATE calendarevents SET status = ? WHERE eventID = ?;`
                                db.query(sqlUpdateAppointment,['canceled', content.eventID], (err,result)=>{
                                    if(err) return res.sendStatus(500)
                                    res.sendStatus(200)
                                
                                })  

                        }
                    
                    })  
        
        }else
            if(request === 'suggest'){
                const sqlUpdateAppointment= `UPDATE appointmentRequestList SET timeRequested = ?, dateRequested = ?, reschedTime = ?, reschedDate = ?, response = ? WHERE requestID = ?;`

                db.query(sqlUpdateAppointment,[JSON.stringify(content.time), date, JSON.stringify(content.time), date, message, content.event.requestID], (err,result)=>{
                    if(err) return res.sendStatus(500)
                    res.sendStatus(200);
                    
                })  
            }
           

        }

    const deleteAppointmentReq = async (req, res) => {
            const id = req.params.id;
                    const sqldeleteAppointment= `DELETE FROM appointmentrequestlist WHERE requestID = ?`

                    db.query(sqldeleteAppointment,id, (err,result)=>{
                        if(err) return res.sendStatus(500)
                        res.sendStatus(200);
                        
                    })  
        }
       

module.exports = {
    getAppointmentReq,
    addAppointmentReq,
    editAppointmentReq,
    deleteAppointmentReq
}
