const express = require("express");
const router = express.Router();

// getting all events
router.get("/", function (req, res) {
  console.log("request successful");
  res.send("success");
});

// adding a event
router.post("/addone", function (req, res) {
  const { title, date, description, image } = req.body;
  console.log(title, date, description, image);
  res.send("one event added");
});

// adding multiple events

router.post("/addmany", function (req, res) {});

module.exports = router;
