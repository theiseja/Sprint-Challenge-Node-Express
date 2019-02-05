const express = require("express");
const projectDB = require("../data/helpers/projectModel");
const actionDB = require("../data/helpers/actionModel");
const router = express.Router();

// tested and works fine use /api/actions in postman
router.get("/", (req, res) => {
  actionDB
    .get()
    .then(actions => {
      res.json(actions);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The actions could not be retrived from the server." });
    });
});

// tested and works fine use /api/actions in postman
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

// tested and works fine use /api/actions in postman
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

// tested and works fine use /api/actions in postman
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const action = req.body;

  if (action.project_id && action.description && action.notes) {
    projectDB
      .get(action.project_id)
      .then(response => {
        console.log("the response is:", response);
        actionDB
          .update(id, action)
          .then(count => {
            if (count === null) {
              res.status(404).json({
                message: "That action ID is invalid."
              });
            } else {
              actionDB.get(id).then(action => {
                res.json(action);
              });
            }
          })
          .catch(err => {
            res.status(500).json({
              message: "Unable to update this action."
            });
          });
      })
      .catch(err => {
        res.status(404).json({
          message: "Invalid project ID."
        });
      });
  } else if (action.project_id && action.description && action.notes) {
    res.status(400).json({
      message: "Actions need notes."
    });
  } else if (action.project_id && action.notes) {
    res.status(400).json({
      message: "Actions need a description."
    });
  } else if (action.notes && action.description) {
    res.status(400).json({
      message: "Actions need a valid project ID."
    });
  } else {
    res.status(400).json({
      message: "Actions need a valid project ID, name and a description."
    });
  }
});

//tested and works fine use /api/actions/ in postman
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
