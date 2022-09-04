const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const dataSchema = require('./assets/schemas/dataSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb+srv://admin:!EotU322@cluster0.kcwdz.mongodb.net/calendar").then(err => {
    try {
        console.log("Connected to MongoDB");
    } catch {
        console.log(err);
    }
})

app.post("/registration", async (req, res) => {
    connection
    try {
        let data = res.status(200).json({ login: req.body.login , password: req.body.password })
        bcrypt.hash(data.req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
        });
    } catch (error) {
        console.log(error);
    }

})

app.post("/login", async (req, res) => {
    connection
    try {
        res.status(200).json({ login: req.body.login , password: req.body.password })
    } catch (error) {
        console.log(error);
    }

})

app.get("getData", async (req, res) => {
    try {
        res.status(200).json({ hardDays: req.body.hardDays , notHardDays: req.body.notHardDays })
    } catch (error) {
        console.log(error);
    }

})

app.post("/submitData", async (req, res) => {
    try {
        res.status(200).json({ hardDays: req.body.hardDays , notHardDays: req.body.notHardDays })
    } catch (error) {
        console.log(error);
    }

})

module.exports = app