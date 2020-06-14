const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();

// Route Import
const getRoute = require('./routes/getRoute');

const app = express();

app.use(bodyParser.json());

app.use(cors());

// Route Call
app.use(getRoute);

app.listen(process.env.PORT || 8000);