const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getCounseling = async (req, res) => {
   
    // const getEvents = `SELECT * FROM calendarevents WHERE (eventName = 'Appointment' || eventName = 'Counselling' || eventName = 'Referral') && (status = 'done') ORDER BY setDate Desc`
    const getEvents = `SELECT * FROM calendarevents WHERE (((eventName = 'Appointment' || eventName = 'Referral') && (status = 'done')) || (eventName = 'Counselling') ) ORDER BY setDate Desc;`
    db.query(getEvents,(err,result)=>{
        // console.log(result)
      return res.send(result);
       
    })  
   

    

   
  
    
}

  

module.exports = {
    getCounseling
}
