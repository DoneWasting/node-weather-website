// Requiring packages and modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');


const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engineand views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));


// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App hbs',
        name: 'David Sequera'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'David Sequera'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Please contact us anytime you need help',
        name: 'David Sequera',
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude , (error, forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
           error: 'You must provide a search term'
       });
    } 

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'David Sequera',
        error: 'Help article not found',
        title: 'Page 404'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        name: 'David Sequera',
        error: 'Page not found',
        title: 'Page 404'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});