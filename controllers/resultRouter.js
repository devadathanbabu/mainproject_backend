const express = require("express");
const resultModel = require("../models/resultModel");
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const data = req.body;
        if (!data.userId || !data.semester || !data.sub1 || !data.sub2 || !data.sub3 || !data.sub4 || !data.sub5 || !data.sub6 || !data.sub7) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }
        
        const mark = new resultModel(data);
        const result = await mark.save();
        
        res.json({ status: "success", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/viewall", async (req, res) => {
    try {
        const results = await resultModel.find()
            .populate("userId", "name admissionNo branch -_id")
            .exec();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
