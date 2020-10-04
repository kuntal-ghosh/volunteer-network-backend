const express = require("express");
const app = express();
const port = process.env.port || 8000;
const bodyParser = require("body-parser");

// importing routes
const event = require("./routes/event");

// body parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/api/events", event);

app.listen(port, () => {
  console.log("server started on port", port);
});
