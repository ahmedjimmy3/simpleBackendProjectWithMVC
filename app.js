const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()



const exp = require('constants');
const { log } = require('console');
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const ejs = require('ejs')
const studentsRouter = require('./routes/students')
const userRouter =require('./routes/user')
const authRouter = require('./routes/auth')




// connection database
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/IT',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('Database connected...');
}).catch((err)=>{
    console.log(err);
})

const logging = require('./middlewares/logging')



app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())
app.use("/assets",express.static("public"))
app.use(cookieParser())
app.use(helmet())
app.set("template engine","ejs")
//custom middleware
app.use((req,res,next)=>{
    console.log('logging..')
    next()
})
app.use('/api/students',studentsRouter)
app.use('/api/users',userRouter)
app.use('/api/login',authRouter)
app.use(logging)




const port = process.env.PORT||3000;  




app.get('/',(req,res,next)=>{
    console.log('Stage 1')
    next()
},(req,res)=>{
    console.log('Request received')
    // res.send('This is server response')
    res.sendFile(path.join(__dirname,'/main.html'))
})

app.get('/welcome.html',(req,res)=>{
    console.log(req.query)
    res.sendFile(path.join(__dirname,'/welcome.html'))
})

app.post('/welcome.html',(req,res)=>{
    console.log(req.body)
    res.cookie('userNm',Buffer.from(req.body.fnm).toString("base64"))
    res.cookie('userAge',25,{httpOnly:true})
    res.send(`Thanks ${req.body.fnm} ${req.body.lnm} for sending data`)
})  
app.get('/abc',(req,res)=>{
    console.log(Buffer.from(req.cookies.userNm,'base64').toString())
    console.log(req.cookies.userAge)
    res.sendStatus(200)
}) 




app.listen(port,()=>{console.log(`Listening ${port}..!!!`)})