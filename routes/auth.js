const express = require('express')
const router = express.Router()
const validator = require('../middlewares/authMDvalidator')
const config = require('config')
const User = require('../models/usreModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.post('/',validator, async (req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email}).exec()
        if(!user) { return res.status(400).send("Invalid email or password..") }
        // check password
        const validPass = await bcrypt.compare(req.body.password , user.password)
        if(!validPass){ return res.status(400).send("Invalid email or password..") }

        // if(!config.get("jwtSec")){
        //     res.status(500).send("Request failed")
        // }

        const token = jwt.sign({usrid:user._id},"thisistoken")
        // send res
        res.header("x-auth-token",token)
        res.status(200).send('logged in successfully')
    }
    catch(err){
        for(let e in err.errors){
            console.log(err.errors[e].message);
            res.status(400).send("Bad request..some fields are missed")
        }
    }  
    
})


module.exports = router 

