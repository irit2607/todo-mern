const express = require('express');
const route = require('./controllers/routes');
const mongoose = require('mongoose');
const app = express();
const url = require('./config/mongoUrl');

app.use(express.urlencoded({ extended: true},),);

app.use(route);
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
//connect to mongo
mongoose.connect(url, { useNewUrlParser :true, useUnifiedTopology :true, useFindAndModify: false, useCreateIndex : true, }).then(() => console.log("Connected !"),);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Started on PORT : " + PORT,),);