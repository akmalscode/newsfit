const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const expresshandlebars = require('express-handlebars');








const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const app = express();

app.engine('handlebars', expresshandlebars());
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {


    res.render('home');

})


app.get('/screpe', function(res, res) {


    axios.get('https://www.nytimes.com/').then(function(response) {

        console.log(response);

    })

})

app.listen(5000);