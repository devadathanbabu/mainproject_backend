const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")

const multer = require("multer");

const studentRouter=require("./controllers/studentRouter")
const teacherRouter=require("./controllers/teacherRouter")

const path = require('path');


const app=express()

app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

const upload = multer({ storage: storage });



mongoose.connect("mongodb+srv://devadathan:10028030@cluster0.knxmb.mongodb.net/studentPortalDb?retryWrites=true&w=majority",
{useNewUrlParser:true})

app.use("/api/student",studentRouter)
app.use("/api/teacher",teacherRouter)


app.post('/api/upload', upload.single('file'), (req, res) => {
    // Multer stores the uploaded file in req.file
    // Handle the file as needed (e.g., save to database, process, etc.)
    const filename = req.file.originalname;
    
    // Log the filename
    console.log('Uploaded file:', filename);

    // Send the filename back in the response
    res.send(`File ${filename} uploaded successfully`);
});


// Route for serving uploaded files
app.get('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;

    // Construct the file path based on the filename
    const filePath = path.join(__dirname, 'uploads', filename);

    // Send the file as a response
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error sending file');
        }
    });
});



app.listen(3000,()=>{
    console.log("Server Running")
})