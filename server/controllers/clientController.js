const Client = require('../models/client')

const getClients = (req, res) => {
    Client.find({}, (error, client) => {
        return error ? res.json(error) : res.json(client) 
    })
}

const addClient = (req, res) => {
    const filedata = req.file
    console.log(filedata)


    const newClient = new Client({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        surName: req.body.surName,
        select: req.body.select,
        date: req.body.date,
        phones: JSON.parse(req.body.phones),
        emails: JSON.parse(req.body.emails),
        Channel: JSON.parse(req.body.Channel),
        image: filedata != undefined ? filedata.originalname :  ''
    })
    Client.create(newClient, (error, client) => {
        return error ? res.json(error) : res.json(client)
    })
}

const download = (req, res) => {
    const filedata = req.file
    if(!filedata) res.send("Ошибка при загрузке файла")
    res.json(filedata.originalname)
}

const updateClient = (req, res) => {

    const filedata = req.file 
    let tmpImage 
    
    if (!filedata) {
        Client.findOne({ _id: req.params.id }, ( error, client ) => {
            return error ? res.json(error) : tmpImage = client.image
        })
    } else {
        tmpImage = req.file.originalname
    }
    const newClient = new Client({
        _id: req.params.id,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        surName: req.body.surName,
        select: req.body.select,
        date: req.body.date,
        phones: JSON.parse(req.body.phones),
        emails: JSON.parse(req.body.emails),
        Channel: JSON.parse(req.body.Channel),
        image: tmpImage
    })

    Client.findOneAndUpdate({ _id: req.params.id }, newClient, ( error, client ) => {
        return error ? res.json(error) : res.json( newClient )
    })
}

const deleteClient = (req, res) => {
    Client.findByIdAndDelete(req.params.id, (error, client) => {
        return error ? res.json(error) : res.json(client)
    })
}

module.exports = { getClients, addClient, updateClient, deleteClient, download }