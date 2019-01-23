const express = require("express");
const projectDB = require("../data/helpers/projectModel");
const actionDB = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/", (req, res) => {
  projectDB
    .get()
    .then(projects => {
      res.json(projects);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projectDB
    .get(id)
    .then(projects => {
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

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  projectDB
    .getProjectActions(id)
    .then(actions => {
      if (actions) {
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

router.post("/", (req, res) => {
  const project = req.body;
  if (project) {
    actionDB
      .get(project.action_id)
      .then(projects => {
        if (projects) {
          projectDB
            .insert(project)
            .then(project => {
              res.status(201).json(project);
            })
            .catch(() => {
              res.status(500).json({
                error:
                  "Project could not be saved to the DB."
              });
            });
        } else {
          res.status(404).json({ message: "This project does not exist." });
        }
      })
      .catch(() => {
        res.status(404).json({
          error: "Information about the project could not be retrieved."
        });
      });
  } else {
    res.status(400).json({ error: "Please provide more info" });
  }
});

router.put('/:id', (req, res) => {
    const project = req.body
    const { id } = req.params
    if (project.name) {
      projectDB
        .update(id, project)
        .then(count => {
          if (count) {
            projectDB.get(id).then(project => {
              res.json(project)
            })
          } else {
            res.status(404).json({
              message: 'The project with the specified ID does not exist within the DB.'
            })
          }
        })
        .catch(() => {
          res
            .status(500)
            .json({ error: 'The project information could not be modifed.' })
        })
    } else {
      res.status(400).json({ errorMessage: 'Please provide more project info.' })
    }
  })

  router.delete('/:id', (req, res) => {
    const { id } = req.params
    projectDB
      .remove(id)
      .then(count => {
        if (count) {
          res.json({ message: 'This project successfully deleted.' })
        } else {
          res.status(404).json({
            message: 'The project with the specified ID does not exist.'
          })
        }
      })
      .catch(() => {
        res.status(500).json({ error: 'The project could not be removed from the DB.' })
      })
  })

module.exports = router;
