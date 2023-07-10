const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    dept:{ 
        type:String,
        required:true,
        default:"SD"
    },
    fn:{
        type:String,
        trim:true,
        required:true,
        minLength:3,
        maxLength:50,
    },
    id:{
        type:Number,
        required:true,
    },
    ln:{
        type:String,
        trim:true,
        required:true,
        minLength:3,
        maxLength:50,
    }
})

const Student = mongoose.model("names" , studentSchema)

module.exports = Student