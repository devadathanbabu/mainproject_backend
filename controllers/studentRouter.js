const express=require("express")
const studentModel=require("../models/studentModel")
const router=express.Router()
const bcrypt=require("bcryptjs")

hashPasswordGenerator=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)

}

//signup

router.post("/signup",async(req,res)=>{
    let {data}={"data":req.body}
    let password=data.password

    const hashedPassword=await hashPasswordGenerator(password)
    data.password=hashedPassword
    let student=new studentModel(data)
    let result=await student.save()
    res.json({
        status:"success"
    })
})

//signin

router.post("/signin",async(req,res)=>{
    let input=req.body
    let email=req.body.email
    let data=await studentModel.findOne({"email":email})
    if(!data)
    {
        return res.json(
            {
                status:"invalid user"
            }
        )
    }
    console.log(data)
    let dbPassword=data.password
    let inputPassword=req.body.password
    console.log(dbPassword)
    console.log(inputPassword)
    const match=await bcrypt.compare(inputPassword,dbPassword)
    if(!match)
    {
        return res.json(
            {
                status:"invalid password"
            }
        )
    }

    res.json({
        status:"success","userdata":data
    })
})

router.get("/viewall",async(req,res)=>{
    let result=await studentModel.find()
    res.json(result)
 })

module.exports=router