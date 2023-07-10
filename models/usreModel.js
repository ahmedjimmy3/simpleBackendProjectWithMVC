const mongoose  = require('mongoose')
const valid = require('validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(val)=>{return valid.isEmail(val)},
            message:'{Value} is not a valid email'
        }
    },
    name:{
        type:String,
        required:true,
        minlength:3,
        maxLength:50
    },  
    isAdmin:{
        type:Boolean
    },
    password:{
        type:String,
        required:true,
        minLength:5
    }
})

// userSchema.method("getAuthToken" ,function(){
//     const token = jwt.sign({
//         usrid: this._id
//     },config.get("jwtSec"))
//     return token
// })

const User = mongoose.model("users", userSchema)
module.exports = User


