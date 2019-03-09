const express = require("express");
const projectDB = require("../data/helpers/projectModel");
const actionDB = require("../data/helpers/actionModel");
const router = express.Router();

// endpoints

//confirmed working
router.get("/", (req, res) => {
  actionDB
    .get()
    .then(actions => {
      res.json(actions);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The actions could not be retrived from the database." });
    });
});

//confirmed working after testing
router.get("/:id", (req, res) => {
    const { id } = req.params;
    actionDB
      .get(id)
      .then(actions => {
        if (actions) {
          res.json(actions);
        } else {
          res.status(404).json({
            message: "The action with that ID does not exist within the DB."
          });
        }
      })
      .catch(() => {
        res.status(404).json({
          error:
            "Information aobut the action could not be retrieved from the server."
        });
      });
  });

  router.post("/", (req, res) => {
    const action = req.body;
    if (action.project_id && action.description && action.notes) {
      projectDB
        .get(action.project_id)
        .then(projects => {
          if (projects) {
            actionDB
              .insert(action)
              .then(action => {
                res.status(201).json(action);
              })
              .catch(() => {
                res.status(500).json({
                  error: "There was an error while saving action to the database."
                });
              });
          } else {
            res.status(404).json({ message: "This project does not exist." });
          }
        })
        .catch(() => {
          res.status(404).json({
            error:
              "Project using that ID does not exist within the DB, please enter one that is contained within the DB."
          });
        });
    } else {
      res.status(400).json({ error: "Please provide more info" });
    }
  });

//end of file
module.exports = router;
