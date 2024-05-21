const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const dotenv = require('dotenv')
const mong = require('mongoose')
const  { upload } = require('./utills/upload')

dotenv.config()

const app = express()

//database
const userName = process.env.MONGO_USER
const pwd = process.env.MONGO_USER_PWD
const url = `mongodb+srv://${userName}:${pwd}@cluster0.msiih3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mong.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MondoDB:', err))

let bucket
mong.connection.on('connected', () => {
    bucket = new mong.mongo.GridFSBucket(mong.connection.db, {
        bucketName: 'filesBucket',
    })
})

//single-file upload

app.post("/upload/file", upload().single("file"), async (req, res) => {
    try {
        res.status(201).json({
            message: "File uploaded suucessfully"
        })
    } catch (err) {
        res.status(400).json({
            error: {
                meesage: "Unable to upload the file",
                error: err
            }
        })
    }
})
app.use(bodyParser.json())
app.use(logger("dev"))


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})