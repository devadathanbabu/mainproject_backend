const express = require("express");
const resultModel = require("../models/resultModel");
const Student = require("../models/studentModel"); // Assuming studentModel is the model for student documents
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const { admissionNo, semester, sub1, sub2, sub3, sub4, sub5, sub6, sub7 } = req.body;
        
        // Find the student document based on admissionNo
        const student = await Student.findOne({ admissionNo });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Create a new result document with the found user's _id
        const result = new resultModel({
            userId: student._id,
            semester,
            sub1,
            sub2,
            sub3,
            sub4,
            sub5,
            sub6,
            sub7
        });

        // Save the new result document
        await result.save();
        
        res.json({ status: "success", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/viewall", async (req, res) => {
    try {
        // Retrieve all result documents and populate the userId field with name, admissionNo, and branch
        const results = await resultModel.find()
            .populate("userId", "name admissionNo branch -_id")
            .exec();
        
        res.json({status: "success", results});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
