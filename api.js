const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./schemas/dataSchema')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dataSchema = require('./schemas/dataSchema');

const connection = mongoose.connect("mongodb+srv://admin:!EotU322@cluster0.kcwdz.mongodb.net/calendar").then(err => {
    try {
        console.log("Connected to MongoDB");
    } catch {
        console.log(err);
    }
})

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET);
  }

app.post("/registration", async (req, res) => {
    if (!(req.body.login && req.body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
    }
    let seconTry = await User.findOne({ login: req.body.login});
    if (seconTry){
        res.status(400).send({ error: "User has been verify resently" });
    }
    // creating a new mongoose doc from user data
    const token = generateAccessToken({ username: req.body.login });
    const user = new User({login: req.body.login, password: req.body.password, token: token});
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc).catch((err) => 
    res.status(500).send({ error: err.message })));
})

app.post("/login", async (req, res) => {
    const user = await User.findOne({ login: req.body.login });
    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        const token = user.token;
        res.status(200).json({ message: "Valid password", token: token });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
})

app.post("/submitData", async (req, res) => {
    try {
        const user = await User.findOne({ token: req.body.token });
        await dataSchema.updateOne({user}, {strongDays: req.body.hardDays , notStrongDays: req.body.notHardDays})
        res.status(200).json({ message: "Success, data was updated" })
        console.log(user);
    } catch (err) {
        res.status(400).json({ error: err });
        console.log("Alllooooo")
    }

})

app.get("getData", async (req, res) => {
    try {
        const user = await User.findOne({ token: req.body.token });
        res.status(200).json({ hardDays: user.strongDays , notHardDays: user.notStrongDays })
    } catch (error) {
        console.log(error);
    }

})

module.exports = app