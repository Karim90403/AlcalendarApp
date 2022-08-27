const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
// const dataSchema = require('./assets/schemas/dataSchema')
const mongoose = require('mongoose');

// const connection = mongoose.connect("").then(err => {
//     try {
//         console.log("Connected to MongoDB");
//     } catch {
//         console.log(err);
//     }
// })

app.post("/list", async (req, res) => {
    try {
        // res.status(200).json({ hardDays: allData.myData, notHardDays: allData.herData })
        console.log("It's alive!!")
    } catch (error) {
        console.log(error);
    }

})

module.exports = app