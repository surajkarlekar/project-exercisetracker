const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
let mongoose = require("mongoose");

let date = new Date();
let formattedDate = date.toDateString(); // Returns date in 'Mon Jan 01 1990' format


app.use(express.json()); // for parsing application/json
// To mount the bodyParser middleware in root level which will be called for all routes
app.use(bodyParser.urlencoded({ extended: false }));

// connect the application to the database
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.post("/api/users", function (req, res) {
  let username = req.body.username;
  let _id = uuidv4(); // Generate a new unique ID

  res.json({ username: username , _id: _id });
});

app.get("/api/users", function (req, res) {

  // console.log("res", res);
  console.log("res.response", res.response);
  // This is a placeholder. You should fetch all users from your database.
  let users = [
    { username: "user1", _id: "123456789" },
    { username: "user2", _id: "987654321" }
  ];
  
  res.json(users);
});

// 3) GET request to /api/users/:_id/logs to retrieve a full exercise log of any user

app.post("/api/users/:_id/exercises", function (req, res) {
  let _id = req.params._id;
  let description = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date ? new Date(req.body.date) : new Date();

  // Add the exercise for the user with the given _id
  // The response should be the user object with the exercise fields added
});


// 4) GET request to /api/users/:_id/logs to retrieve a full exercise log of any user
app.get("/api/users/:_id/logs", function (req, res) {
  let _id = req.params._id;

  // Retrieve the full exercise log of the user with the given _id
  // The response should be a user object with a count property and a log array
});


// 5) GET /api/users/:_id/logs with from, to, and limit parameters to retrieve part of the log of any user

app.get("/api/users/:_id/logs", function (req, res) {
  let _id = req.params._id;
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;

  // Retrieve part of the log of the user with the given _id
  // The response should be a user object with a count property and a log array
});




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
