const config = require('config');
const express = require("express");
const Joi = require('joi');
const bodyParser = require('body-parser')
Joi.objectId = require('joi-objectid')(Joi);
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const properties = require('./routes/properties.route');
const platforms = require('./routes/platform.route');
const lead = require('./routes/lead.route');
const project = require('./routes/project.route');
const users = require('./routes/users.route');
const auth = require('./routes/auth.route');
const events = require('./routes/events.route');
const sendMail = require('./routes/sendmail.route');
var cors = require('cors');
const app = express();

app.use(cors())

if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined');
  process.exit(1);
}

//When in development
let db_uri = "mongodb://localhost:27017/newsletter";
 
//When in production
if (process.env.NODE_ENV == 'production') {
    db_uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DATABASE_URI}:${process.env.DATABASE_PORT}/?authSource=admin`;
}

mongoose.connect(db_uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.log('Something went wrong', err));

//initialize our express app
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/project', project);
app.use('/api/lead', lead);
app.use('/api/events', events);
app.use('/api/send', sendMail);
// app.use('/api/platforms', platforms);
// app.use('/api/properties', properties);

const port = process.env.PORT || 4005;
app.listen(port, () => {console.log(`Listening on port ${port}...`); console.log('Node Env', process.env.NODE_ENV); console.log('DB', db_uri)});
