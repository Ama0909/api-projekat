var unirest = require('unirest');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    unirest.get("https://community-open-weather-map.p.rapidapi.com/weather")
        .header("X-RapidAPI-Key", "a099191771msh8e3076e860f669ap107c80jsn41a4de727c4a")
        .header("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com")
        .query({
            'appid': '2038061',
            'lon': '12.4924',
            'lat': '41.8902',
            'units': 'metric',
            'mode': 'html'
        })
        .end(function (result) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(result.body);
            console.log('Colosseum, I am coming!');
        });
})
app.listen(8081, function () {
    console.log('Server running at https://128.0.0.1:8082/');
})