const express = require('express')
const jsonParser = express.json()
const clientRouter = express.Router()
const {
    getClients,
    addClient,
    updateClient,
    deleteClient,
    download
} = require('../controllers/clientController')


clientRouter.get('/', getClients)
clientRouter.post('/', jsonParser, addClient)
clientRouter.post('/download', jsonParser, download)
clientRouter.put('/:id', jsonParser, updateClient)
clientRouter.delete('/:id', deleteClient)

module.exports = clientRouter