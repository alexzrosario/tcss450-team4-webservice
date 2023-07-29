//express is the framework we're going to use to handle requests
const { request, response } = require('express');
const express = require('express')

//retrieve the router object from express
var router = express.Router()

// Properties
const validation = require('../utilities').validation
let isStringProvided = validation.isStringProvided
const requestWeather = require('request'); 
var API_KEY = process.env.WEATHER_API_KEY;
var slotOneWeather;
var slotOneTemp;
var slotOneTime;

var slotTwoWeather;
var slotTwoTemp;
var slotTwoTime;

var slotThreeWeather;
var slotThreeTemp;
var slotThreeTime;

var slotFourWeather;
var slotFourTemp;
var slotFourTime;

var slotFiveWeather;
var slotFiveTemp;
var slotFiveTime;

var userCity = 'Tacoma';


// This method will call the weather API 
function forecast() { 

    var url = `http://api.openweathermap.org/data/2.5/forecast?`
                +`q=${userCity}&appid=${API_KEY}`



        requestWeather({ url: url, json: true }, function (error, response) { 

        if (error) { 
            console.log('Unable to connect to Forecast API'); 
        }  else { 

            slotOneWeather = response.body.list[0].weather[0].main
            slotOneTemp = response.body.list[0].main.temp
            slotOneTime = response.body.list[0].dt

            slotTwoWeather = response.body.list[1].weather[0].main
            slotTwoTemp = response.body.list[1].main.temp
            slotTwoTime = response.body.list[1].dt

            slotThreeWeather = response.body.list[2].weather[0].main
            slotThreeTemp = response.body.list[2].main.temp 
            slotThreeTime = response.body.list[2].dt

            slotFourWeather = response.body.list[3].weather[0].main
            slotFourTemp = response.body.list[3].main.temp
            slotFourTime = response.body.list[3].dt

            slotFiveWeather = response.body.list[4].weather[0].main
            slotFiveTemp = response.body.list[4].main.temp
            slotFiveTime = response.body.list[4].dt

        } 
    }) 
}

forecast()


router.get("/", (request, response) => { 
    forecast()
    response.json({
        slotOneWeather: slotOneWeather,
        slotOneTemp: slotOneTemp,
        slotOneTime: slotOneTime,
        slotTwoWeather: slotTwoWeather,
        slotTwoTemp: slotTwoTemp,
        slotTwoTime: slotTwoTime,
        slotThreeWeather: slotThreeWeather,
        slotThreeTemp: slotThreeTemp,
        slotThreeTime: slotThreeTime,
        slotFourWeather: slotFourWeather,
        slotFourTemp: slotFourTemp,
        slotFourTime: slotFourTime,
        slotFiveWeather: slotFiveWeather,
        slotFiveTemp: slotFiveTemp,
        slotFiveTime: slotFiveTime
    })
})


// Send the POST request 
router.post("/", (request, res) => {
    
    userCity = request.body.city
    
     var url = `http://api.openweathermap.org/data/2.5/forecast?`
                +`q=${userCity}&appid=${API_KEY}`



        requestWeather({ url: url, json: true }, function (error, response) { 

        if (error) { 
            console.log('Unable to connect to Forecast API'); 
        }  else { 

            slotOneWeather = response.body.list[0].weather
            slotOneTemp = response.body.list[0].main.temp 
            slotOneTime = response.body.list[0].dt

            slotTwoWeather = response.body.list[1].weather
            slotTwoTemp = response.body.list[1].main.temp
            slotTwoTime = response.body.list[1].dt

            slotThreeWeather = response.body.list[2].weather
            slotThreeTemp = response.body.list[2].main.temp 
            slotThreeTime = response.body.list[2].dt

            slotFourWeather = response.body.list[3].weather
            slotFourTemp = response.body.list[3].main.temp
            slotFourTime = response.body.list[3].dt

            slotFiveWeather = response.body.list[4].weather
            slotFiveTemp = response.body.list[4].main.temp
            slotFiveTime = response.body.list[4].dt

        } 
    }) 
    
    
    res.send({
        slotOneWeather: slotOneWeather,
        slotOneTemp: slotOneTemp,
        slotOneTime: slotOneTime,
        slotTwoWeather: slotTwoWeather,
        slotTwoTemp: slotTwoTemp,
        slotTwoTime: slotTwoTime,
        slotThreeWeather: slotThreeWeather,
        slotThreeTemp: slotThreeTemp,
        slotThreeTime: slotThreeTime,
        slotFourWeather: slotFourWeather,
        slotFourTemp: slotFourTemp,
        slotFourTime: slotFourTime,
        slotFiveWeather: slotFiveWeather,
        slotFiveTemp: slotFiveTemp,
        slotFiveTime: slotFiveTime
    })


})


// "return" the router
module.exports = router
