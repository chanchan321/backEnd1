const db = require('../middleware/myDB');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


const registerAccount = async (req, res) => {
  const id = crypto.randomBytes(16).toString("hex");
  const pisID = crypto.randomBytes(4).toString("hex");
  const { user , pwd , type, lrn, lastname, firstname, middlename, contact, gradeL} = req.body;


  const personalBG = {
        lrn:'',
        lastname:'',
        firstname:'',
        middlename:'',
        age:'',
        dateOfBirth:'',
        placeOfBirth:'',
        gender:'',
        birthAmongSib:'',
        citizenship:' ',
        religion:'',
        civilStatus:'',
        currentAddress:'',
        permanentAddress:'',
        landline:'',
        cellphoneNo:'',
        eMail:'',
        languageSpoken:''
  }
  const familyBG ={
        father :
        {
              status:'',
              name:' ',
              age:'',
              religion:'',
              nationality:'',
              educationalAttainment:'tagaBanay',
              occupation:'  ',
              positionEmployer:'',
              officeBusinessAddress:'',
              contactNumber:''
          },
          mother :
          {
                status:'',
                name:' ',
                age:'',
                religion:'',
                nationality:'',
                educationalAttainment:'',
                occupation:'  ',
                positionEmployer:'',
                officeBusinessAddress:'',
                contactNumber:''
            },
        guardian:
              {
        relationshipW:'',
        name:' ',
        age:'',
        religion:'',
        nationality:'',
        educationalAttainment:'',
        occupation:'  ',
        positionEmployer:'',
        officeBusinessAddress:'',
        contactNumber:'',
        monthStayed:''
    }
  }

  const newMaritalStatus = {
    married:'',
    livingTogether:'',
    singleParent:false,
    widow:'',
    temporarySeperated:'',
    permanentlySeperated:'',
    marriedAnnulled:'',
    fatherOfw:'',
    motherOfw:'',
    fatherWpartner:'',
    motherWpartner:''
}

const educbg2= {
  subjectWithLowestGrade:'',
  subjectWithHighestGrade:'',
  awards:'',
  newscholarship:{
      fourpis:false,
      cibi:false,
      sistersCharity:false,
      others:''
      }
}

const unique = {
  friendsInschool:'',
  outsideInschool:'',
  specialInterest:'',
  hobbies:'',
  characteristicsThatDescibeU:'',
  presentFears:'',
  disabilities:'',
  chronicIllness:'',
  medicinesRegTaken:'',
  accidentsExperienced:'',
  operationsExp:'',
  immunizations:'',

  consultedPsy:'',
  howmanysessionPsy:'',
  forwhatPsy:'',

  consultedCoun:'',
  howmanysessionCoun:'',
  forwhatCoun:'',

  emerContact:'',
  address:'',
  contactNumber:'',

}

  
     const sqlregStud= `INSERT INTO accounts (accountID , userType, username, password) VALUES (?,?,?,?);`
 
     const hashed = await bcrypt.hash(pwd , 10); // true
    
     db.query(sqlregStud,[id,type,lrn,hashed], (err,result)=>{
    
      if(!err){
        const sqlregPis= `INSERT INTO studpis(LRN, accountID, lastname, firstname, middlename, contactNumber, gradeLevel, pisID, counsellingRec, guidanceRec) VALUES (?,?,?,?,?,?,?,?,?,?)`
        db.query(sqlregPis,[lrn, id, lastname, firstname, middlename, '0', gradeL, pisID, JSON.stringify([]), JSON.stringify([])], (err,result)=>{
          
              if(!err){
                const sqlregPis= `INSERT INTO piscontent (pisID, personalBackground, familyBackground, siblings, maritalStatus, educationalInformation, educbg2, uniqueHealthCosult, homeSketch, dateComplete) VALUES (?,?,?,?,?,?,?,?,?,?)`
                db.query(sqlregPis,[pisID, JSON.stringify(personalBG), JSON.stringify(familyBG),JSON.stringify([]), JSON.stringify(newMaritalStatus) , JSON.stringify([]), JSON.stringify(educbg2), JSON.stringify(unique),JSON.stringify([]),JSON.stringify([])], (err,result)=>{
                  
                  res.send(result)
                })  
              }
                   
        })  
      }

      })  

}


module.exports = {
  registerAccount
}
