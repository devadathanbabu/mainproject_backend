const mongoose=require("mongoose")
const studentSchema=new mongoose.Schema(
    {
        name:String,
        admissionNo:String,
        branch:String,
        dob:String,
        gender:String,
        address:String,
        phoneNo:String,
        alternatePhoneNo:String,
        email:String,
        password:String,
        

    }
)

module.exports=mongoose.model("student",studentSchema)