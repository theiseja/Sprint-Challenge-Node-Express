const express = require('express');
const projectDB = require('../data/helpers/projectModel');
const actionDB = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    projectDB.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(() => {
        res.status(500).json({ error: 'The project information could not be retrieved.' });
    });
});

