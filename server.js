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
app.use(express.static('public'));



app.get('/', function(req, res) {


    res.render('home');

})


app.get('/scrape', function(req, res) {


    axios.get('https://www.nytimes.com/section/politics').then(function(response) {

        const articles = [];
        const $ = cheerio.load(response.data)

        $('.e1xfvim30').map(function() {
            let article = $(this).contents().text();
            articles.push(article);
            console.log(article)
        })

        return res.json(articles)

    })

})

app.listen(4000);