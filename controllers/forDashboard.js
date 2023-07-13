const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getRecords = async (req, res) => {

    
    const sqlgetApp= "SELECT * FROM piscontent";
        db.query(sqlgetApp,(err,result)=>{
            const pis =  result

            const sqlgetApp= "SELECT * FROM calendarevents WHERE (((eventName = 'Appointment' || eventName = 'Referral') && (status = 'ongoing')) || (eventName = 'Counselling') )";
            db.query(sqlgetApp,(err,result)=>{
                const tocounsel =  result

                    const sqlgetApp= "SELECT * FROM refferralrequest";
                    db.query(sqlgetApp,(err,result)=>{
                        const referralreq =  result

                            const sqlgetApp= "SELECT * FROM appointmentrequestlist";
                            db.query(sqlgetApp,(err,result)=>{
                                const appointmentreq =  result
                                    res.send({
                                        pis:pis,
                                        tocounsel:tocounsel,
                                        referralreq:referralreq,
                                        appointmentreq:appointmentreq
                                    })
                            })   

                    })   

            })      
         
    })      


   
}


module.exports = {
    getRecords
}
