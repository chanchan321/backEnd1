const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');


const loginAccount = async (req, res) => {
    //from reequest
    const user = req.params.uname;
    const pass = req.params.pass;
    if (!user || !pass) return res.sendStatus(404);

    //from database going to front-end
    let accountID = '';
    let passw = '';
    let type = '';
    let compare = '';
    let LRN = '';
    let contactNum = '';
    

    //get infot of LOGGED IN
    try{
      const sql= "SELECT * FROM accounts WHERE username = ?";
      db.query(sql,[user],(err,result)=>{
        if(!result) return res.send(result)
         
        
        if(!result[0]) return res.send(result)
         accountID += result[0].accountID;
         type += result[0].userType;
         passw += result[0].password;
         
           //LRN 
          if(type === 'student'){
                const sqlLRN= "SELECT * FROM studpis WHERE accountID = ?";
                db.query(sqlLRN,[accountID],(err,result)=>{
                  if(!result) return res.send(result)
                  LRN += result[0].LRN
                  contactNum += result[0].contactNumber

                  bcrypt.compare(pass, passw, function(err, result) {
                    compare += result;
                    if(!result) return res.send(false)
                      res.send([{'accountID':accountID,'type':type,'LRN':LRN,'contactNum':contactNum}]);
                });

            })
          }else if(type === 'gc'){
              bcrypt.compare(pass, passw, function(err, result) {
                compare += result;
                if(!result) return res.send(false)
                  res.send([{'accountID':accountID,'type':type}]);
            });
          }
           
        //compare password
            
          
    })  
    }catch(err){
      console.log('err');
    }
    
}


module.exports = { loginAccount }
