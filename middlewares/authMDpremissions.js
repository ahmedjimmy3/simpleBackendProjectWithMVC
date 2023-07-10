const config = require('config')
const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    const token = req.header('x-auth-token')
    if(!token) return res.status(400).send('Access Denied')
    try{
        const decodedPayload=jwt.verify(token,config.get('jwtSec'))
        if(!decodedPayload) return res.status(401).send("Access denied")
        next()
    }
    catch(err){
        res.status(400).send('Invalid token')
    }
}