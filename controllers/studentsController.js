const validator = require('../util/studentsValidator')
const Student = require('../models/studentModel')


const getAllStudents =
  ("/",
  (req, res, next) => {
    console.log("request received on students collection");
    next();
  });

const getStudentByID = (req, res) => {
  const id = req.params.id;
  const std = students.find((val, idx, arr) => {
    return val.id == id;
  });
  if (std) {
    res.json(std);
  } else {
    res.send("Not found");
  }
};

const studentsInFront = (req, res) => {
    res.set("Access-Control-Allow-Origin","*")
  // res.json(students)
  Student.fetchAllStudents((obj)=>{
    res.render("students.ejs", { std:obj });
  })
  
};
  
const newStudent = (req, res) => {
  let valid = validator(req.body);
  if (valid) {
    let std = new Student(req.body.name,req.body.dept)
    std.saveStudent()
    res.json(req.body);
  } else {
    res.status(403).send("Forbidden"); 
  }
};
const deleteStudentByID=(req,res)=>{
    let idx = students.findIndex((val,idx,arr)=>{return val.id==req.params.id})
    if(idx!=-1){
        students.splice(idx,1) 
        res.send('Deleted Successfully')    
    }
    else {res.send("ID not found")}
    
}
const updateStudentInfo = (req,res)=>{
    let idx = students.findIndex((val,idx,arr)=>{return val.id==req.params.id})
    if(idx!=-1){
        for(i in req.body){
            students[idx][i]=req.body[i]
        }
        res.json(students[idx])
    }
    else {res.send("ID not found")}
}
module.exports = {
  getAllStudents,
  getStudentByID,
  studentsInFront,
  newStudent,
  deleteStudentByID,
  updateStudentInfo,
};
