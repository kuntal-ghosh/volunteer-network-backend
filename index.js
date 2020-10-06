const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const ObjectID = require("mongodb").ObjectID;
const cors = require("cors");
// importing routes
const event = require("./routes/event");
const volunteer = require("./routes/volunteer");
// body parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cd3jp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 3000,
  keepAlive: 1,
  // reconnectTries: 30,
  // reconnectInterval: 1000,
});

app.get("/", function (req, res) {
  res.send("welcome to volunteer app");
});

client.connect(async (err) => {
  try {
    const eventCollection = await client
      .db("volunteer-network")
      .collection("events");
    // getting all events
    // console.log(collection);
    console.log("connected");

    app.get("/api/events/", async function (req, res) {
      // console.log("request successful");
      console.info("request received");
      try {
        const result = await eventCollection.find({}).toArray();
        if (result) {
          res.send(result);
          console.log("request successful");
        }
      } catch (error) {
        console.log(error);
      } finally {
        // client.close();
      }
      // console.log(result);
    });

    // finding one event
    app.get("/api/events/findone/:id", async function (req, res) {
      // console.log("request successful");
      console.info("request received");
      const { id } = req.params;
      console.log(id);
      try {
        const result = await eventCollection
          .find({ _id: ObjectID(id) })
          .toArray();
        if (result) {
          res.send(result[0]);
          console.log("request successful");
        }
      } catch (error) {
        console.log(error);
      } finally {
        // client.close();
      }
      // console.log(result);
    });

    // adding a event
    app.post("/api/events/add", async function (req, res) {
      console.log("request received");

      const event = req.body;
      // console.log(title, date, description, image);
      try {
        const response = await eventCollection.insertOne(event);
        if (response.insertedCount > 0) {
          res.send(response);
          console.log("request successful");
        }
      } catch (err) {
        console.log("this is an error");
        console.log(err);
      } finally {
        // client.close();
        console.log("closed");
      }
      // res.send("one event added");
    });

    // adding multiple events

    app.post("/api/events/addmany", function (req, res) {});
  } catch (error) {
    console.log(error);
  }

  //volunteers api Collection

  try {
    const volunteerCollection = await client
      .db("volunteer-network")
      .collection("volunteers");
    // getting all events
    // console.log(collection);
    console.log("connected");

    // getting all volunteers
    app.get("/api/volunteers", async function (req, res) {
      console.log("request successful");
      try {
        const response = await volunteerCollection.find({}).toArray();
        if (response) {
          res.send(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        // client.close();
      }
    });

    // get one voluteer

    app.get("/api/volunteers/:name", async function (req, res) {
      console.log("request successful");
      const { name } = req.params;
      try {
        const response = await volunteerCollection
          .find({
            name: name,
          })
          .toArray();
        if (response) {
          res.send(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        // client.close();
      }
    });

    // adding a volunteer
    app.post("/api/volunteers/add", async function (req, res) {
      const volunteer = req.body;
      // console.log(title, date, description, image);
      try {
        const response = await volunteerCollection.insertOne(volunteer);
        if (response.insertedCount > 0) {
          res.send(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        // client.close();
      }
    });

    // adding multiple volunteer

    app.post("/api/volunteers/addmany", async function (req, res) {
      const volunteers = req.body;
      // console.log(title, date, description, image);
      try {
        const response = await volunteerCollection.insertMany(volunteer);
        if (response.insertedCount > 0) {
          res.send("items added successfully");
        }
      } catch (error) {
        console.log(error);
      } finally {
        // client.close();
      }
    });

    // deleting a volunteer
    app.delete("/api/volunteers/delete/:id", async function (req, res) {
      const id = req.params.id;
      // console.log(title, date, description, image);
      try {
        const response = await volunteerCollection.deleteOne({
          _id: ObjectID(id),
        });
        if (response.deletedCount > 0) {
          // console.log(response);
          return res.send("one item deleted successfully");
        } else {
          return res.status(404).send("item not found");
          res.end();
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log("closed");
        // client.close();
      }
    });
  } catch (error) {
    console.log(error);
  }

  // client.close();
});

// app.use("/api/events", event);
// app.use("/api/volunteers", volunteer);
app.listen(port, () => {
  console.log("server started on port", port);
});
