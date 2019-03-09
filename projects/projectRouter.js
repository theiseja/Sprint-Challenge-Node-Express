const express = require('express');
const projectDB = require('../data/helpers/projectModel');
const actionDB = require('../data/helpers/actionModel');
const router = express.Router();


router.get('/', async(req,res) => {
    try{
        const projectDB = await projects.get()
        res.status(200).json(projectsData)
    }catch(err){
        res.status(500).json({ err: 'Unable to retrieve the projects from the database.'})
    }
});


module.exports = router;