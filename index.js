const express = require("express");
const app = express();
const request = require("request");

const PORT = process.env.PORT || 3001;
const apiKey = '442d74bed1674ff492542e63cd69c772';


app.listen(PORT, function () {
    console.log("Node Js Server is Running");
})

app.get('/weather/current/:location', function (req, res) {


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

app.get('/weather/forecast/:location', function (req, res) {

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

app.get('/weather/history/:location', function (req, res) {

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
