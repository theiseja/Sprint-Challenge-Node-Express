const express = require('express');
const projectDB = require('../data/helpers/projectModel');
const actionDB = require('../data/helpers/actionModel');
const router = express.Router();

//confirmed working
router.get("/", (req, res) => {
    projectDB
      .get()
      .then(projects => {
        res.json(projects);
      })
      .catch(() => {
        res.status(500).json({ error: "Unable to retrieve projects from the database." });
      });
  });

  //confirmed working & can't load a project that doesn't exist
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    projectDB
      .get(id)
      .then(projects => {
        console.log("projects", projects);
        if (projects) {
          res.json(projects);
        } else {
          res.status(404).json({ message: "This project does not exist." });
        }
      })
      .catch(() => {
        res.status(404).json({
          error: "Information about the project could not be retrieved."
        });
      });
  });

  //confirmed working, pulls the actions tied to a specific project ID
  router.get("/:id/actions", (req, res) => {
    const { id } = req.params;
    projectDB
      .getProjectActions(id)
      .then(actions => {
        if (actions.length) {
          res.json(actions);
        } else {
          res
            .status(404)
            .json({ message: "Action does not exist within the DB." });
        }
      })
      .catch(() => {
        res
          .status(404)
          .json({ error: "Info about this action could not be retrieved." });
      });
  });




module.exports = router;