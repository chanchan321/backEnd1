const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const addcounselingRec = async (req, res) => {
            const {lrn,nature,result,date,oldRec} = req.body
            oldRec.push({
                nature:nature,
                result:result,
                date:date
            })
            const sqlUpdate = 'Update studpis set counsellingRec = ? Where LRN = ?;'
            db.query(sqlUpdate,[JSON.stringify(oldRec),lrn],(err,result)=>{
                    res.sendStatus(200)
            })
    }
const getcounsellingRec =  async (req, res) => {
        const lrn = req.params.lrn
        const sqlGet = 'SELECT * from studpis Where LRN = ?;'
        db.query(sqlGet,[lrn],(err,result)=>{
                res.send(result)
        })
        
}

const updatecounsellingRec =  async (req, res) => {
      const {lrn,newR} = req.body
      const sqlupdate = 'UPDATE studpis SET counsellingRec = ? Where LRN = ?;'
      db.query(sqlupdate,[JSON.stringify(newR), lrn],(err,result)=>{
              res.send(result)
      })
        
}
   


module.exports = {
    addcounselingRec,
    getcounsellingRec,
    updatecounsellingRec
}
