const express = require("express");
const projectDB = require("../data/helpers/projectModel");
const actionDB = require("../data/helpers/actionModel");
const router = express.Router();

// endpoints
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

//end of file
module.exports = router;
