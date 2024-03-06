const mongoose=require("mongoose")
const teacherSchema=new mongoose.Schema(
    {
       
    name: { 
        type: String, 
        required: true 
    },
    facultyId: { 
        type: String, 
        required: true 
    },
    branch: { 
        type: String, 
        required: true 
    },
    dob: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    phoneNo: { 
        type: String, 
        required: true 
    },
    alternatePhoneNo: { 
        type: String },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ 
    },
    password: { 
        type: String, 
        required: true 
    }

    }
)

module.exports=mongoose.model("teacher",teacherSchema)