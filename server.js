require("dotenv").config({path: "config/.env"})
const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const app = express();

app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)

app.set('view engine', 'html')
app.set('layout', 'layout')

app.use('/views', express.static(path.join(__dirname + '/views')))
app.use('/public', express.static(path.join(__dirname + '/public')))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(expressLayouts)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const renderRoute = require('./routes/renderRoute')
const apiRoute = require('./routes/apiRoute')

app.use(renderRoute)
app.use('/api', apiRoute)

const start = async () => {
    try {
        await mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => {
                console.log("Database is connected")
            })
            .catch((err) => {
                logger.error(err.message)
                console.error('Internal server error')
            })
        app.listen(process.env.PORT, () => {
            console.log(`http://localhost:${process.env.PORT}`)
        })
    } catch (err) {
        console.error('Internal server error')
    }
}

start()

module.exports = app