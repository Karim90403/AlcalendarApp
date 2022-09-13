require('dotenv').config()
const express = require('express');
const cors = require('cors');
const api = require('./api');
const path = require('path');

const app = express()

app.use(express.json())
app.use(cors())
// app.use(express.static(path.join(__dirname, "dist")))
app.get("/hello", res => {
    res.json({success: "helo"})
})

app.use("/api", api)


app.listen(process.env.PORT, () => {
    console.log(`App ran at ${process.env.PORT}`)
})