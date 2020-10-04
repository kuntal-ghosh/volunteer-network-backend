const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cd3jp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// let collection;
// client.connect(async (err) => {
//   try {
//     collection = await client.db("volunteer-network").collection("events");
//     // getting all events
//     console.log(collection);
//     console.log("connected");
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.close();
//   }
// });

// router.get("/", function (req, res) {
//   console.log("request successful");
//   const result = collection.find().toArray();
//   console.log(result);
//   res.send(result);
// });

// // adding a event
// router.post("/add", function (req, res) {
//   const { title, date, description, image } = req.body;
//   console.log(title, date, description, image);
//   res.send("one event added");
// });

// // adding multiple events

// router.post("/addmany", function (req, res) {});

module.exports = router;
