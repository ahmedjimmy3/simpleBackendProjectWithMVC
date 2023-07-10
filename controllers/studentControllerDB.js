const  Student= require('../models/studentModuleDB')

// create student
let addNewStudent=(req,res)=>{
    let std = new Student({
        dept:req.body.dept,
        fn:req.body.fn,
        id:req.body.id,
        ln:req.body.ln,
    })
    std.save().then(()=>{
        res.status(200).send(std)
    }).catch((err)=>{
        for(let e in err.errors){
            console.log(err.errors[e].message);
            res.status(400).send('Bad Request..')
        }
    })
}

//get student by id
let getStudentById= async (req,res)=>{
    try{
        let std = await Student.findById(req.params.id)
        if(!std){
            return res.status(404).send('Student with this ID is not found')
        }
        else{
            res.status(200).send(std)
        }
    }
    catch(err){
        for(let e in err.errors){
            console.log(err.errors[e].message);
            res.status(400).send('Bad Request..')
        }
    }
}

// get all students
let getAllStudents= async (req,res)=>{
    try{
        let stdS = await Student.find().select({fn:1 , ln:1 , id:1}).sort({id:-1})
        res.status(200).send(stdS)
    }
    catch(err){
        for(let e in err.errors){
            console.log(err.errors[e].message);
            res.status(400).send('Bad Request..')
        }
    }
}

// update student
let updateStudent = async (req,res)=>{
    try{
        let std = await Student.findByIdAndUpdate(req.params.id , req.body,{returnOriginal:false})
        if(!std){
            return res.status(404).send('Student with this ID is not found')
        }
        else{
            res.status(200).send(std)
        }
    }
    catch(err){
        for(let e in err.errors){
            console.log(err.errors[e].message);
            res.status(400).send('Bad Request..')
        }
    }
} 

// delete student
let deleteStudentById = async (req,res)=>{
    try{
        let std = await Student.findByIdAndRemove(req.params.id)
        if(!std){
            return res.status(404).send('Student with this ID is not found')
        }
        else{
            res.status(200).send(std + 'deleted Successfully')
        }
    }
    catch(err){
        for(let e in err.errors){
            console.log(err.errors[e].message);
            res.status(400).send('Bad Request..')
        }
    }
}

module.exports = {
    addNewStudent, 
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudentById
}