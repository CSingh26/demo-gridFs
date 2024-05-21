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
    if (!req.file) {
        return res.status(400).send('No file uploaded.')
    }

    const uploadStream = bucket.openUploadStream(req.file.originalname);
    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', () => {
        res.status(200).send('File Uploaded Successfully');
    });

    uploadStream.on('error', (err) => {
        res.status(500).send('Error uploading file:', err);
    })
})

app.use(bodyParser.json())
app.use(logger("dev"))


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})