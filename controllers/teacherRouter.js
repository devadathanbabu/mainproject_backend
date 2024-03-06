const express=require("express")
const teacherModel=require("../models/teacherModel")
const router=express.Router()
const bcrypt=require("bcryptjs")

hashPasswordGenerator=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)

}

//signup

router.post("/signup",async(req,res)=>{
    let {data}={"data":req.body}


    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(req.body.email)) {
    return res.json({
      status: "error",
      message: "Invalid email format. Please enter a valid email address.",
    });
  }

    const existingUser = await teacherModel.findOne({ "email": data.email });
    if (existingUser) {
        return res.json({
            status: "Email ID already exists",
        });
    }



    let password=data.password

    const hashedPassword=await hashPasswordGenerator(password)
    data.password=hashedPassword
    let teacher=new teacherModel(data)
    let result=await teacher.save()
    res.json({
        status:"success"
    })
})

//signin

router.post("/signin",async(req,res)=>{
    let input=req.body
    let email=req.body.email
    let data=await teacherModel.findOne({"email":email})
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
    let result=await teacherModel.find()
    res.json(result)
 })

module.exports=router