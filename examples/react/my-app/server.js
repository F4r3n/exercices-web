const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const got = require('got')
const result = require('dotenv').config()
const jsonParser = bodyParser.json()

app.use(express.static(path.join(__dirname, 'build')));


app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

async function requestWeather(cityName) {
try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_KEY}&units=metric`
    const response = await got(url);
    let fBody = JSON.parse(response.body);
    let weather = {}
    if(fBody.weather.length) {    
        weather = {
                title: fBody.weather[0].main,
                description: fBody.weather[0].description,
                image: `http://openweathermap.org/img/w/${fBody.weather[0].icon}.png`
        }
    }

    let body = {
        city: fBody.name,
        temp :{
            temp: fBody.main.temp,
            temp_min : fBody.main.temp_min,
            temp_max: fBody.main.temp_max,
            feels_like: fBody.main.feels_like
        },
        weather : weather
    }
    return body;
 } catch (error) {
     throw error;
 }
}

app.post('/search', jsonParser, async (req, res) => {
    try {
    let response = await requestWeather(req.body.city)
    res.status(200)
    res.json(response);
} catch (error) {
    console.log(error.response.body);
    res.status(401).send()
    return error
 }

});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(process.env.PORT || 8080);