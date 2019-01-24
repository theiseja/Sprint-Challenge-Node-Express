const express = require("express");
const projectDB = require("../data/helpers/projectModel");
const actionDB = require("../data/helpers/actionModel");
const router = express.Router();

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
  if (action) {
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
          error: "Information about the project could not be retrieved."
        });
      });
  } else {
    res.status(400).json({ error: "Please provide more info" });
  }
});
router.put("/:id", (req, res) => {
  const action = req.body;
  const { id } = req.params;
  if (action) {
    actionDB
      .update(id, action)
      .then(count => {
        if (count) {
          actionDB.get(id).then(action => {
            res.json(action);
          });
        } else {
          res.status(404).json({
            message: "The action with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "The action information could not be modifed." });
      });
  } else {
    res.status(400).json({ errorMessage: "Please provide more info" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actionDB
    .remove(id)
    .then(count => {
      if (count) {
        res.json({
          message: "Action has been successfully deleted from the DB."
        });
      } else {
        res.status(404).json({
          message: "The action with that ID does not exist within the DB."
        });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The action could not be removed from the DB." });
    });
});

module.exports = router;
