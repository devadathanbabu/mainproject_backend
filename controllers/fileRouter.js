const express=require("express")
const multer=require("multer")
const path = require('path');
const fileModel=require("../models/fileModel")
const router=express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Append current timestamp to filename to make it unique
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Endpoint for uploading a file
  router.post('/uploadFile', upload.single('file'), async (req, res) => {
    try {
      const { filename, path } = req.file;
      const newFile = new fileModel({ filename, path });
      await newFile.save();
      res.status(200).send('File uploaded successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading file');
    }
  });
  
  // Endpoint for retrieving all files
  router.get('/fileviewing', async (req, res) => {
    try {
      const files = await fileModel.find();
      res.json(files);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching files');
    }
  });

module.exports=router