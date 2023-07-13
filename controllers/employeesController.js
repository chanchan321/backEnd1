

const db = require('../middleware/myDB');
const jwt = require('jsonwebtoken')
const path = require('path');

const cron = require('node-cron')
const moment = require('moment')
const fs = require('fs')
const spawn = require('child_process').spawn
// var wstream = fs.createWriteStream('dumpfilename.sql');


const mysqldump = require('mysqldump')


//     export of database //////////////////////////////////////////////



const updateAllEmployees = async (req, res) => {

  const jsonFILLE ={
    sy:'2021-20d24',
    pb:{name:'chanhcsan',
        age:1,
        gender:'MALExx'
        },
}
  
    const sqlGET= `SELECT id FROM accounts WHERE name = ?;`
    db.query(sqlGET, (err,result)=>{
         res.send(result);
    })  

    //  const sql= `UPDATE accounts SET pis = ? WHERE id = 1`
// db.query(sql,JSON.stringify(jsonFILLE), (err,result)=>{
//      res.send(result);
// })  
   
}

const getAllEmployees  = async (req, res) => {
     
        ////JWT/////
        const user = { name: req.params.name }
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        const toAcc =JSON.stringify(accessToken)
        const toRef =JSON.stringify(refreshToken)
        const sql= "SELECT * FROM `accounts` WHERE name = ?";
        db.query(sql,[user.name], (err,result)=>{
          if(result){
              const sqlz= `UPDATE accounts SET accessjwt = ? , refreshjwt = ? WHERE id = ?`
              db.query(sqlz,[toAcc,toRef,result[0].id], (err,result)=>{
                res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: true, maxAge: 24 * 60 * 60 * 1000 });
                res.cookie('jwtA', accessToken);
                res.send(result);
              })  
          }else{
            // res.send(err);
          }
          
          })  


        // const sqlz= `UPDATE accounts SET jwtAccess = ? , jwtRefresh = ? WHERE id = 1`

        // 
           




}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}


module.exports = {
  getAllEmployees,
  updateAllEmployees
}

//    import  of database //////////////////////////////////////////////


// const Importer = require('mysql-import');
// const mysql = require("mysql");


// var waterfall = require('async-waterfall');   


// const getAllEmployees = async (req, res) => {

    
//     deletess();

//     setTimeout(()=>{
//         createzz();
//     },2000)
//     setTimeout(()=>{
//         importz();
//         res.send('success')
//     },4000)
//     // deletess();
//     // createzz();
//     // importz();

//     function deletess()  {
//         var del = mysql.createConnection({
//                 host: "localhost",
//                 user: "root",
//                 password: "",
//                 database: "dbtestings"
//             });


//         del.connect(function(err) {
//         if (err) throw err;
//         var sql = "DROP DATABASE dbtestings";
//         del.query(sql, function (err, result) {
//           if (err) throw err;
//           console.log("Table deleted");
//         })
//       })
      
//     }

  
      
     
      
//       function createzz() {

//             var cre = mysql.createConnection({
//                     host: "localhost",
//                     user: "root",
//                     password: ""
//                 });

//         cre.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         cre.query("CREATE DATABASE  dbtestings", function (err, result) {
//           if (err) throw err;
//           console.log("Database created");
//         })
//       })
//       }

    
  
//     function importz() {

//           const host = 'localhost';
//             const user = 'root';
//             const password = '';
//             const database = 'dbtestings';
            
//             const importer = new Importer({host, user, password, database});
                
//                 importer.onProgress(progress=>{
//                 var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
//                 console.log(`${percent}% Completed`);
//                 });
                
//                 importer.import('dbfile/dump.sql').then(()=>{
//                 var files_imported = importer.getImported();
//                 console.log(`${files_imported.length} SQL file(s) imported.`);
//                 }).catch(err=>{
//                 console.error(err);
//                 })
//     }

       
//    ;
    

    
        
//     //  const sql= `UPDATE accounts SET pis = ? WHERE id = 1`
//     // db.query(sql,JSON.stringify(jsonFILLE), (err,result)=>{
        
//     //      res.send(result);
//     //      console.log(result)
//     // })  

//     // const sqlGET= `SELECT pis FROM accounts WHERE id = 1;`
//     // db.query(sqlGET, (err,result)=>{

//     //      res.send(result);

//     // })  
   
//     // res.json(data.employees);


    
// }

