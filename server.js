const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = 3500;
const bodyParser = require('body-parser')
const fs = require('fs')
const db = require('./middleware/myDB');

const cron = require('node-cron')

const mysql = require("mysql");

const fetch = require('node-fetch')

require("dotenv").config();

// custom middleware logger

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// app.use(cors({
//     origin: ["http://localhost:3000","http://localhost:3000/nav/homeS"],
//     methods:['get','post','patch'],
//     credentials: true
//   }));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());


// const dbtest = mysql.createConnection({
//     host:'db4free.net',
//     user:'capstone357',
//     password:'CAPSTONEguidance123',
//     database:'dbtesting357'
// });

// const sqlupdatepass= "SELECT * FROM accounts ";
// dbtest.query(sqlupdatepass,(err,result)=>{
//     console.log(result)
// })

cron.schedule("00 00 06 * * *", async function(){
        let gcContactNum = ''
        const apikey='84b1a789051b7233a14135d35c053e0550cbf734'
                const sqlupdate= "SELECT contactNumber FROM guidancecdetails WHERE accountID = ?"
                        db.query(sqlupdate,['a7a45ac2afe3b2633775998d038d4396'],(err,result)=>{
                                gcContactNum += result[0].contactNumber
                        })
                        const todaydate = new Date();
                        var dd = todaydate.getDate();
                        var mm = todaydate.getMonth()+1; 
                        var yyyy = todaydate.getFullYear();
                        if(dd<10) {dd='0'+dd} 
                        if(mm<10) { mm='0'+mm} 
                        const date =(`${yyyy}-${mm}-${dd}`)
        function Requests(){
                const sqlgetAppointment= "SELECT * FROM appointmentrequestlist Where status = ?";
                db.query(sqlgetAppointment,'pending',(err,result)=>{
                if(err) return console.log(err)
                        const appointment = result.length

                        const sqlgetReferral= "SELECT * FROM refferralrequest Where status = ?";
                        db.query(sqlgetReferral,'pending',(err,result)=>{
                        if(err) return console.log(err)
                                const referral = result.length

                                const type = 'Counseling'
                                const message = `There are ${appointment} appointment and ${referral} referral request pending`
                                const status = 'unread'
        
                                        const sqlupdate= "INSERT INTO notificationgc (type, message, status) VALUES (?, ?, ?)"
                                        db.query(sqlupdate,[type,message,status],(err,result)=>{
                                                if(err) return console.log(err)
                                                const resultNotif = result
                                                // console.log({   
                                                //         constacTNumber:gcContactNum,
                                                //         message:`There are ${complete.length} complete PIS and ${incomplete.length} incomplete PIS form of students`
                                                // })

                                                async function Setcaw () {
                                                        const response= await fetch(`https://sms.teamssprogram.com/api/send?key=${apikey}&phone=${gcContactNum}&sim=${2}&message=${message}&priority=${1}&device=${482}`)                
                                                        const ressponse = response;
                                                }
                                                Setcaw()

                                        })

                        })
                })
        }

        function EventToday(){
                const sqlgetEventsToday= "SELECT * FROM calendarevents WHERE status = ? and setDate = ?";
                db.query(sqlgetEventsToday,['ongoing', date],(err,result)=>{
                        if(err) return console.log(err)
                
                        if(!result[0]) return console.log('dont send SMS')
                        /////////////////////////////////////////////////SMS ONLY---------------------------------------------------- to gc
                        if(result[0]){
                                const message = `You have ${result.length} event/s Today !! Login to view Details`
                                async function Setcaw () {
                                        const response= await fetch(`https://sms.teamssprogram.com/api/send?key=${apikey}&phone=${gcContactNum}&sim=${2}&message=${message}&priority=${1}&device=${482}`)                
                                        const ressponse = response;
                                }
                                Setcaw()

                        } 
                })
        }

        function HowManySubmitted(){
                const sqlgetPIS= "SELECT * FROM piscontent";
                db.query(sqlgetPIS,(err,result)=>{

                        if(err) return console.log(err)
                        const complete =result[0] && result.filter((value)=> value.statusComp === 'complete');
                        const incomplete =result[0] && result.filter((value)=> value.statusComp === 'incomplete');

                        const type = 'PIS'
                        const message = `There are ${complete.length} complete PIS and ${incomplete.length} incomplete PIS form of students`
                        const status = 'unread'

                                const sqlupdate= "INSERT INTO notificationgc (type, message, status) VALUES (?, ?, ?)"
                                db.query(sqlupdate,[type,message,status],(err,result)=>{
                                        if(err) return console.log(err)
                                        const resultNotif = result
                                        // console.log({   
                                        //         constacTNumber:gcContactNum,
                                        //         message:`There are ${complete.length} complete PIS and ${incomplete.length} incomplete PIS form of students`
                                        // })

                                        async function Setcaw () {
                                                const response= await fetch(`https://sms.teamssprogram.com/api/send?key=${apikey}&phone=${gcContactNum}&sim=${2}&message=${message}&priority=${1}&device=${482}`)                
                                                const ressponse = response;
                                        }
                                        Setcaw()


                                })
                })
        }

        function CompletePis(){
                const dayNames = ["Sunday","7","8","9","10","11","12"];    
                                                                                                                                
                if(dayNames[todaydate.getDay()] === 'Sunday'){
                                console.log('dont Send!')
                }else{                                                                                                       
                const gradeL =dayNames[todaydate.getDay()]                                                                      
                const messageTOstud = 'Please Complete your PIS information as soon as possible                              -Guidance System (Please dont Reply)'

                const getSQL = `SELECT * FROM studpis INNER JOIN piscontent ON studpis.pisID = piscontent.pisID Where piscontent.statusComp = ? AND studpis.gradeLevel = ?;`
                        db.query(getSQL,['incomplete',gradeL], (err,result)=>{
                                if(err) return console.log(err)
                                const studentsTOsend = result.filter((data)=> (data.contactNumber).length === 13)
                                                                                                                                        
                                        for (let i = 0; i < studentsTOsend.length;  i++) {
                                                console.log(studentsTOsend[i].contactNumber)
                                                console.log(studentsTOsend[i].firstname)
                                                console.log(messageTOstud)
                                        }
                                })
                }
        }

        function ReminderPIS(){
                        
                const dayNames = ["Sunday","7","8","9","10","11","12"];    
                                                                                                                                
                if(dayNames[todaydate.getDay()] === 'Sunday'){
                        console.log('dont Send!')
                }else{
                const gradeL =dayNames[todaydate.getDay()]
                const messageTOstud = 'Please Complete your PIS information as soon as possible                                                                 -Guidance System (Please dont Reply)'
                        const getSQL = `SELECT * FROM studpis INNER JOIN piscontent ON studpis.pisID = piscontent.pisID Where piscontent.statusComp = ? AND studpis.gradeLevel = ?;`
                        db.query(getSQL,['incomplete',gradeL], (err,result)=>{
                        if(err) return console.log(err)
                        
                        const studentsTOsend = result.filter((data)=> (data.contactNumber).length === 13)
                        if(!studentsTOsend[0]) return console.log('NO number')
                                                        ///////////////////////SMS ONLY-------------------------------                                                                                                                
                                        for (let i = 0; i < studentsTOsend.length;  i++) {
                                                const studNumber = studentsTOsend[i].contactNumber
                                                const message = studentsTOsend[i].firstname+' '+messageTOstud
                                                async function Setcaw () {
                                                        const response= await fetch(`https://sms.teamssprogram.com/api/send?key=${apikey}&phone=${studNumber}&sim=${2}&message=${message}&priority=${1}&device=${482}`)                
                                                        const ressponse = response;
                                                }
                                                Setcaw()
                                        }
                        })
                }
                
        }

        function NoticeForAppointment(){
                const getSQL = `SELECT * FROM appointmentrequestlist INNER JOIN studpis ON appointmentrequestlist.studLrn = studpis.LRN Where appointmentrequestlist.dateRequested = ? AND status = ?;`
                        db.query(getSQL,[date,'ongoing'], (err,result)=>{
                                if(err) return console.log(err)
                                // console.log(result)
                                const studentsTOsend = result.filter((data)=> (data.contactNumber).length === 13)
                                if(!result[0]) return console.log('dont send SMS')
                                for (let i = 0; i < studentsTOsend.length;  i++) {
                                        const studNUmber = studentsTOsend[i].contactNumber
                                        const message = studentsTOsend[i].firstname +`  Your Appointment is TODAY at ${(JSON.parse([studentsTOsend[i].timeRequested])).toString()}                                                  -Guidance System (Please dont Reply)`
                                        
                                                async function Setcaw () {
                                                        const response= await fetch(`https://sms.teamssprogram.com/api/send?key=${apikey}&phone=${studNUmber}&sim=${2}&message=${message}&priority=${1}&device=${482}`)                
                                                        const ressponse = response;
                                                }
                                                Setcaw()
                                                /////////////////////////////////////////////////////////////////////////////////////////MAY APPOINTMENT ang student i notify
                                }    
                        })        
        }

        function NoticeForReferral() {

                        const getSQL = `SELECT * FROM calendarevents INNER JOIN refferralrequest ON calendarevents.eventID = refferralrequest.eventID Where calendarevents.setDate = ? AND calendarevents.status = ?;`
                        db.query(getSQL,[date,'ongoing'], (err,result)=>{
                                if(err) return console.log(err)
                                // console.log(result)
                                // const studentsTOsend = result.filter((data)=> (data.contactNumber).length === 13)
                                const apikey='84b1a789051b7233a14135d35c053e0550cbf734'
                                const lrn = []
                                const referralReq = result

                                for (let i = 0; i < result.length;  i++) {
                                        lrn.push(result[i].studLrn)
                                }       

                                        for (let i = 0; i < lrn.length;  i++) {
                                        const studLrn = lrn[i]
                                        
                                        const getSQL = `SELECT * FROM studpis INNER JOIN refferralrequest ON studpis.LRN = refferralrequest.studLrn Where studpis.LRN = ? ;`
                                        // const getSQL = `SELECT * FROM studpis Where LRN = ?;`
                                        db.query(getSQL,studLrn, (err,result)=>{
                                                const studentsTOsend = result.filter((data)=> (data.contactNumber).length === 13)
                                                // console.log(studentsTOsend)

                                                for (let i = 0; i < studentsTOsend.length;  i++) {
                                                        const studentsNum = referralReq.filter((data)=> data.studLrn === studentsTOsend[i].studLrn)
                                                        // console.log(studentsNum)
                                                     
                                                              const contactNum = studentsTOsend[i].contactNumber
                                                              const message = 'REMINDER: '+ studentsNum[0].nameOfStudent +' your Counseling session is Today at ' + (JSON.parse(studentsNum[0].setTime)).toString()  + '                                          -Guidance System (Please dont Reply)'
                                                        
                                                        async function Setcaw () {
                                                                const response= await fetch(`https://sms.teamssprogram.com/api/send?key=${apikey}&phone=${contactNum}&sim=${2}&message=${message}&priority=${1}&device=${482}`)                
                                                                const ressponse = response;
                                                        }
                                                        Setcaw()
                                                 }
                                        })

                                } 
                        })
        }

    }, {
       timezone: "Asia/Manila"
     })

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/pis', require('./routes/pis'));
app.use('/appointment', require('./routes/appointment'));
app.use('/availableCal', require('./routes/availableCal'));
app.use('/getStud', require('./routes/getStud'));
app.use('/referral', require('./routes/referral'));
app.use('/gcAppointment', require('./routes/gcAppointment'));
app.use('/getEvents', require('./routes/getEvents'));
app.use('/eventDcalendar', require('./routes/EventDcalendar'));
app.use('/resched', require('./routes/resched'));

app.use('/getAllEvents', require('./routes/getAllEvents'));
app.use('/getstudAccDetails', require('./routes/getstudAccDetails'));

app.use('/counselingRec', require('./routes/counselingRec'));
app.use('/markAsDone', require('./routes/markAsDone'));

app.use('/getEventID', require('./routes/getEventID'));

app.use('/editEvent', require('./routes/editEvent'));

app.use('/gcDetails', require('./routes/gcDetails'));

app.use('/studentAccount', require('./routes/studentAccount'));

app.use('/getCounselingRec', require('./routes/getCounselingRec'));

app.use('/forDasboard', require('./routes/forDasboard'));

app.use('/notification', require('./routes/notification'));

app.use('/toSendSMS', require('./routes/toSendSMS'));


//insert excel in duplicate

//UPDATE ON DUPLICATE
//INSERT INTO `trya`(`id`, `dateee`, `timechosen`, `ddaateee`) VALUES (10,'[value-2]','[value-3]','[value-4]') ON DUPLICATE KEY UPDATE timechosen = 'updatxe';  
// INSERT IGNORE INTO `trya`  (`id`, `dateee`, `timechosen`, `ddaateee`)  VALUES  (10,'[value-2]','[value-3]','[value-4]') 

//INSERT INTO `trya`(`id`, `dateee`, `timechosen`, `ddaateee`) VALUES (10,'[value-2]','[value-3]','[value-4]'),  (152,'[value-2]','[value-3]','[value-4]')  ON DUPLICATE KEY UPDATE timechosen = 'updated22';  

// INSERT INTO `trya`(`id`, `dateee`, `timechosen`, `ddaateee`) VALUES ('1052','[value-2]','[value-3]','[value-4]22222222222222'),('11','[value-2]','[value-3]','[value-41111111]'),('12','[value-2]','[value-3]','[value-41111111]')
app.use('/employees', require('./routes/employees'));




app.all('*', (req, res) => {
        res.send("404 Not Found");
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



