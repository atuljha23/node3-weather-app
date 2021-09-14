const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;


//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Atul jha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Atul Jha'
    })
})

app.get('/help', (req, res, next) => {
    res.render('help', {
        title: 'Help Section',
        name: 'Atul Jha',
        info: 'Here you will get all the information regarding the app and how to use it without any issue, to get started navigate to the homepage and start using the app right away.'
    })
})

app.get('/weather', (req, res, next) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a valid address to search weather data.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, placename } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                location: placename,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res, next) => {
    res.render('404', {
        title: '404',
        info: 'Help article not found',
        name: 'Atul Jha'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        info: 'Page not found',
        name: 'Atul'
    })
})

app.listen(port,() => {
    console.log('listening on port 3000')
})
