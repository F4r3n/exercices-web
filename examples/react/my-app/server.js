const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const got = require('got')
const result = require('dotenv').config()
const jsonParser = bodyParser.json()

app.use(express.static(path.join(__dirname, 'build')));

const icons = new Map()
icons.set(802, 14)
icons.set(801, 8)
icons.set(800, 2)
icons.set(803, 25)
icons.set(804, 25)

icons.set(500,  17)
icons.set(501,  17)
icons.set(502,  18)
icons.set(503,  18)
icons.set(504,  19)
icons.set(511,  17)
icons.set(520,  17)
icons.set(521,  18)
icons.set(522,  18)
icons.set(531,  19)

icons.set(600,  21)
icons.set(601,  22)
icons.set(602,  23)
icons.set(611,  21)
icons.set(612,  22)
icons.set(613,  23)
icons.set(615,  21)
icons.set(616,  22)
icons.set(620,  21)
icons.set(621,  22)
icons.set(622,  23)


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
    const id = fBody.weather[0].id
    let iconUrl = "weather_icons/1.svg";
    console.log(id)
    if(icons.has(id)) {
        iconUrl = `weather_icons/${icons.get(id)}.svg`
    }
    else {
        let otherID = Math.floor(id/100)*100;
        if(icons.has(otherID))
        {
            iconUrl = `weather_icons/${icons.get(id)}.svg`
        }
    }


    if(fBody.weather.length) {    
        weather = {
                title: fBody.weather[0].main,
                description: fBody.weather[0].description,
                image: iconUrl
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