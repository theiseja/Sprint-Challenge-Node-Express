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
  const id = req.params;
  if (!action.project_id || !action.description || !action.notes) {
    res
      .status(404)
      .json({ message: "Please provide complete action information." });
    return;
  }
  actionDB
    .insert(action)
    .then(action => {
      res.status(200).json(action);
    })
  projectDB
  .get(id)
  .then(action => {
    res.status(200).json(action);
  })
    .catch(err => {
      res.status(500).json({ error: "Error adding action to server" });
    });
});

// tested and works fine use /api/actions in postman
router.put("/:id", (req, res) => {
  const action = req.body;
  const { id } = req.params;
  if (!action.project_id || !action.description || !action.notes || !id) {
    res.status(404).json({
      message: "Please provide complete action information and/or ID."
    });
    return;
  }
  actionDB
    .update(id, action)
    .then(updatedAction => {
      if (updatedAction) {
        res.status(200).json(updatedAction);
      } else {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The action could not be updated: " });
    });
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
