const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const expresshandlebars = require('express-handlebars');
const bodyParser = require('body-parser')

//var app = express();



const articleSchema = new mongoose.Schema({
    link: String
});

const Article = mongoose.model('Article', articleSchema);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log(err)
    }
});

var app = express();

//using css file
//app.use('public', express.static('public'));



app.engine('handlebars', expresshandlebars());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {


    res.render('home');

})


app.get('/scrape', function(req, res) {
    axios.get('https://www.nytimes.com/section/politics').then(function(response) {

        const articles = [];
        const $ = cheerio.load(response.data)

        $('.e1xfvim30').map(function() {
            let header = $(this).contents().text();
            let link = $(this).closest('a').attr('href');

            articles.push({
                header,
                link
            });
        })

        return res.json(articles)

    })
})

app.post('/save-article', function(req, res) {
    Article.create({
        link: req.body.link
    })

    res.sendStatus(200)
})

app.get('/articles', function(req, res) {
    const articles = Article.find();

    res.render('articles', {
        articles
    });
})
app.listen(4000);