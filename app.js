require('dotenv').config()
const express = require('express');
const cors = require('cors');
const api = require('./api');
const path = require('path');
const environment = require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", api)
app.use(express.static(path.join(__dirname, "dist")))


app.listen(process.env.PORT, () => {
    console.log(`App ran at ${process.env.PORT}`)
})