const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')

function upload() {
    const url = 'mongodb+srv://csin:heml0@cluster0.msiih3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    const storage = new GridFsStorage({
        url: url,
        file: (req, file) => {
            return new Promise((resolve, _reject) => {
                const fileInfo ={
                    filename: file.originalname,
                    bucketName: 'filesBucket'
                }
                resolve(fileInfo)
            })
        }
    })

    return multer({ storage })
}

module.exports = { upload }