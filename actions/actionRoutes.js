const express = require('express')
const actionDB = require('../data/helpers/actionModel')
const projectDB = require('../data/helpers/projectModel')
const router = express.Router()

router.get('/', (req, res) => {
    actionDB
    .get()
    .then(actions => {
        res.json(actions)
    })
    .catch(() => {
        res.status(500).json({ error: 'The actions could not be retrived from the server.'})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    actionDB
    .get(id)
    .then(actions => {
        if (actions) {
            res.json(actions)
        } else {
            res.status(404).json({ message: 'The action with that ID does not exist within the DB.'})
        }
    })
    .catch(() => {
        res.status(404).json({ error: 'Information aobut the action could not be retrieved from the server.'})
    })
})


module.exports = router