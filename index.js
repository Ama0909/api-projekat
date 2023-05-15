const express = require("express");
const app = express();
const request = require("request");
const auth = require('basic-auth');


const PORT = process.env.PORT || 3001;
const apiKey = '442d74bed1674ff492542e63cd69c772';

const validCredentials = {

    username: "ama09",
    password: "1234"

};

function checkCredentials(username, password) {

    // Implement the logic to check the username and password

    return username === process.env.USERNAME && password === process.env.PASSWORD;

}

const authMiddleware = (req, res, next) => {

    const credentials = auth(req);

    if (!credentials || !checkCredentials(credentials.name, credentials.pass)) {

        res.status(401).set('WWW-Authenticate', 'Basic realm="Authentication Required"').send('Unauthorized');

    } else {

        next();

    }

}



app.listen(PORT, function () {
    console.log("Node Js Server is Running");
})

app.get('/weather/current/:location', authMiddleware, function (req, res) {


    const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.params.location}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            const weather = JSON.parse(body);
            res.json({ 'currentWeather': weather.main });
        }
    })
})

app.get('/weather/forecast/:location', authMiddleware, function (req, res) {

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${req.params.location}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            const weather = JSON.parse(body);
            res.json({ 'foreacast': weather });
        }
    })




})

app.get('/weather/history/:location', authMiddleware, function (req, res) {

    const url = `https://api.openweathermap.org/data/2.5/history/city?q=${req.params.location}&type=hour&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            const weather = JSON.parse(body);
            res.json({ 'history': weather });
        }
    })
})

