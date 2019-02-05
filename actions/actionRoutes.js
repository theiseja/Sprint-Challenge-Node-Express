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
  } else {
    res.status(400).json({
      message: "Actions need a valid project ID, name and a description."
    });
  }
});

//tested and works fine use /api/actions/:id in postman
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  actionDB.remove(id)
    .then(count => {
      console.log(count)
      res
        .status(200)
        .json({message:`Action successfully removed from DB.`})
    })
    .catch(err => {
      res
        .status(500)
        .catch({message: "Failed to remove Action from DB."})
    })
})
module.exports = router;
