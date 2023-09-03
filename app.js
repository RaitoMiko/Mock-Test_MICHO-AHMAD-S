require('dotenv').config();
const express = require('express')
const app = express()

const port = process.env.PORT || 3001
const routes = require('./routes/routes')
const passport = require('./lib/passport')
const bodyParser = require("body-parser");
const handleCors = require("./middlewares/cors");

app.use(handleCors);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use('/', routes)


app.listen(port, (req,res) =>{ 
    console.log('server berjalan di port ' + port);
})