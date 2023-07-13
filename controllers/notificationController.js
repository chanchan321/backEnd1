const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const getNotification = async (req, res) => {
    const {type} = req.params
    if(type === 'notif'){
        const sqlget= "SELECT * FROM notificationgc order by timeStamp desc";
        db.query(sqlget,(err,result)=>{
                res.send(result)
        })
    }
    if(type === 'icon'){
        const sqlget= "SELECT * FROM notificationgc where status = ?";
        db.query(sqlget,'unread',(err,result)=>{
                res.send({unread:result.length})
        })
    }

}

const updateNotification = async (req, res) => {
    const {id,type} = req.body
    
    if(type==='once'){
        const sqlupdate= "UPDATE notificationgc SET status = ? WHERE id = ? "
        db.query(sqlupdate,['read',id],(err,result)=>{
                res.send(result)
        })
    }
    if(type==='all'){
        const sqlupdate= "UPDATE notificationgc SET status = ? WHERE 1 "
        db.query(sqlupdate,['read'],(err,result)=>{
                res.send(result)
        })
    }
   

}



const insertNotification = async (req, res) => {
    const {type,message,status} = req.body
    
        const sqlupdate= "INSERT INTO notificationgc (type, message, status) VALUES (?, ?, ?)"
        db.query(sqlupdate,[type,message,status],(err,result)=>{
                res.send(result)
        })

}


module.exports = {
    getNotification,
    updateNotification,
    insertNotification
}
