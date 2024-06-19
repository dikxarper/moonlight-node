require("dotenv").config({path: "config/.env"})

const express = require("express")
const app = express();


app.listen(process.env.PORT, function() {
    console.log(`Your server is on ${process.env.PORT}`)
})