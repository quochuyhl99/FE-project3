const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const listening = () => {
    console.log(`running on localhost: ${port}`);
};
const server = app.listen(port, listening);

// POST request
const addWeather = (req, res) => {
    console.log(req.body);
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
    res.send(projectData);
};
app.post("/add", addWeather);

// GET request
const getWeather = (req, res) => {
    res.send(projectData);
};
app.get("/add", getWeather);
