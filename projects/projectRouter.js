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

  // confirmed working, can't post a new user without the description or name provided.
router.post("/", (req, res) => {
    const project = req.body;
    if (!project.name || !project.description) {
        return res.status(404).json({ error: 'Please provide complete project information in order to post a new one.'})
    }
    projectDB
    .insert(project)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json({ error: "Error adding new project to the database."});
    });
});

// confirmed working, can't update without name or description
router.put("/:id", (req, res) => {
    const project = req.body;
    const { id } = req.params;
    if (project.name && project.description) {
      projectDB
        .update(id, project)
        .then(count => {
          if (count) {
            projectDB.get(id).then(project => {
              res.json(project);
            });
          } else {
            res.status(404).json({
              message:
                "The project with the specified ID does not exist within the DB."
            });
          }
        })
        .catch(() => {
          res
            .status(500)
            .json({ error: "The project information could not be modifed." });
        });
    } else {
      res.status(400).json({ errorMessage: "Please provide more project info." });
    }
  });


  //confirmed working. Deletes all actions associated with the project ID so 
  //no ghost data remains in the database
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    projectDB
      .remove(id)
      .then(count => {
        if (count) {
          projectDB.getProjectActions(id).then(actions => {
            actions.map(action => {
              console.log("action.id", action.id);
              actionDB.remove(action.id).then(() => {
                console.log("Action Deleted!");
              });
            });
            res.json({ message: "This project successfully deleted." });
          });
        } else {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "The project could not be removed from the DB." });
      });
  });

module.exports = router;