const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const dotenv = require('dotenv')
const mong = require('mongoose')

dotenv.config()

const app = express()

//database
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const url = 'mongodb+srv://singhchaittanya:cQ1ha40v7spwGkKm@cluster0.a22ney6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mong.connect(url, options)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MondoDB:', err))

