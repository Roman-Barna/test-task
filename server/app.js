const express = require('express')
const multer = require("multer")
const mongoose = require('mongoose')
const clientRouter = require('./routes/clientRouter')
const { PORT, DB_URI, DB_NAME } = require('./config/config')
const cors = require('cors')

const app = express()

app.use(express.static(__dirname + '/uploads'))

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

app.use(multer({ storage: storageConfig }).single("filedata"));

app.use(cors())
app.use('/api/client', clientRouter)

mongoose.connect(`${DB_URI}/${DB_NAME}`, {}, (error) => {
    return error ? console.log(error) : app.listen(PORT, () => console.log('Сервер запущений'))
})