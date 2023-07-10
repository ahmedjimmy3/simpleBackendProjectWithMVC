const express = require('express')
const router = express.Router()
const userValidator = require('../middlewares/userMDValidator')
const User= require('../models/usreModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

// register
router.post('/' , userValidator,async (req,res)=>{
    // check already exist
    try{
        let user = await User.findOne({email:req.body.email}).exec()
        if(user){
            return res.status(400).send("User already registered")
        }
        // create new user to be add to DB
        let sault = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(req.body.password , sault)
        let us = new User({
            email:req.body.email,
            name:req.body.name,
            password:hashPassword
        })
        await us.save()
        // const token = jwt.sign({usrid:us._id},config.get('jwtSec'))
        // res.header("x-auth-token",token)
        res.status(200).send("OK")
    }
    catch(err){
        for(let e in err.errors){
            console.log(err.errors[e].message);
            res.status(400).send("Bad request..some fields are missed")
        }
    }    


})

module.exports = router