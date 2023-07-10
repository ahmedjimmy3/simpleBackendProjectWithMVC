const { json } = require('body-parser')
const fs = require('fs')
const path = require('path')
const studentPath = path.join(path.dirname(process.mainModule.filename),"data","students.json")

module.exports = class Student{
    constructor(){
        this.name =nm 
        this.dept =dept
    }
    saveStudent(){
        fs.readFile(studentPath,(err,info)=>{
            let Students = []
            if(err){console.log(err);}
            else{
                Students = JSON.parse(info)
                this.id = Students.length+1
                Students.push(this)
                fs.writeFile(studentPath,JSON.stringify(Students),(err)=>{
                    console.log("errror");
                })
            }
        })
    }
    static fetchAllStudents(callback){ 
        fs.readFile(studentPath,(err,info)=>{
            if(!err){
                callback(JSON.parse(info)) 
            }else{
                callback([])
            }
        })
    }
}