const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getAllPIS = async (req, res) => {

   const id = req.params.id
    
    
    let pisID =''
        const getpisID= `SELECT pisID from studpis WHERE accountID = ?`
            db.query(getpisID,[id],(err,result)=>{
                if(!result[0].pisID) return res.sendStatus(404)
                pisID += result[0].pisID

                const getpisContent= `SELECT * from piscontent WHERE pisID = ?`
                     db.query(getpisContent,[result[0].pisID],(err,result)=>{
                        res.send({'pisID':pisID,'pis':result[0]})
                        
    
                })  

            })  
            
    }
    const updatePIS = async (req, res) => {

        const pisID = req.body.pisID
        const content = req.body.content
        const tableName = req.body.tableName;

        const sqlUpdate= `UPDATE piscontent SET ${tableName} = ? WHERE pisID = ?`
        db.query(sqlUpdate,[JSON.stringify(content),pisID],(err,result)=>{
            res.send(result);
        })   
    }

    const addPIS = async (req, res) => {

        const id = req.body.id
        const pisID = req.body.pisID
        const personalBG = req.body.personalBG
        const sy = req.body.sy

            const sqlUpdate= `INSERT INTO piscontent (pisID,schoolYear, personalBackground) VALUES (?,?,?);`
                db.query(sqlUpdate,[pisID,sy,JSON.stringify(personalBG)],(err,result)=>{
                    res.send(result);
                })  
    }

module.exports = {
  updatePIS,
  getAllPIS,
  addPIS
}
