const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")

const studentRouter=require("./controllers/studentRouter")
const teacherRouter=require("./controllers/teacherRouter")


const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://devadathan:10028030@cluster0.knxmb.mongodb.net/studentPortalDb?retryWrites=true&w=majority",
{useNewUrlParser:true})

app.use("/api/student",studentRouter)
app.use("/api/teacher",teacherRouter)

app.listen(3001,()=>{
    console.log("Server Running")
})