const configureDB=require('./configureDB/db')
const express=require('express')
const cors=require('cors')
require('dotenv').config()
const userRouter=require('./routes/userRoutes')
const app=express()
app.use(express.json())
app.use(cors())
const PORT=3050
configureDB()
app.use('/user',userRouter)
app.listen(PORT,()=>{
    console.log('server running on port', PORT)
}) 