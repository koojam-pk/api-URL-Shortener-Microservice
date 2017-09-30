const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require('path');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

// Express to serve files from our public folder 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

// var fs = require('fs');

require('./routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log("Server is running at " + PORT);
});