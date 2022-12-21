const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    surName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    select: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    phones: {
        type: [],
        required: true
    },
    emails: {
        type: [],
        required: true
    },
    Channel: {
        type: [],
        required: true
    },
    image: {
        type: String
    }
}, { versionKey: false })

const Client = mongoose.model('Client', clientSchema)

module.exports = Client