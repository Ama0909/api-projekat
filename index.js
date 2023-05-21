const express = require("express");
const app = express();
const request = require("request");

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.json');



const PORT = process.env.PORT || 3001;
const apiKey = '442d74bed1674ff492542e63cd69c772';

const specs = swaggerJsdoc({
    swaggerDefinition: swaggerOptions,
    apis: ['**/*.js'], // Specify the files where you added Swagger annotations
});



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



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

/**
 * @swagger
 * /weather/current/:location:
 *   get:
 *     summary: Get weather information
 *     description: Retrieve weather information for a specific location
 *     responses:
 *        200:
 *          description: Success
 */





