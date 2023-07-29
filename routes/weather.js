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
var latitude = -999;
var longitude = -999;
var currentTemp;
var maxTemp;
 var lowTemp;
 var city;
 var weather;
 var userCity = 'Tacoma';


 // This method will call the weather API 
function forecast() { 
    var url;
        if(latitude != -999) {
            url = `http://api.openweathermap.org/data/2.5/weather?`
            +`lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        } else {
            url = `http://api.openweathermap.org/data/2.5/weather?`
            +`q=${userCity}&appid=${API_KEY}`
        }
        requestWeather({ url: url, json: true }, function (error, response) { 
        if (error) { 
            console.log('Unable to connect to Forecast API'); 
        }  else { 
            currentTemp = response.body.main.temp
            maxTemp = response.body.main.temp_max 
            lowTemp = response.body.main.temp_min
            city = response.body.name
            weather = response.body.weather
        } 
    }) 
    
}
// Call POST request first to get city or long and lat, then get
router.get("/", (request, response) => { 
    forecast()
    response.json({
       CurrentTemp: currentTemp,
       maxTemp: maxTemp,
       lowTemp: lowTemp,
       city: city,
       weather: weather
    })
})
// Send the POST request 
// router.post("/", (request, response) => {
//     if(isStringProvided(request.body.long)) {
//         longitude = request.body.long
//         latitude = request.body.lat
//         response.send({
//             //req.body is a reference to arguments in the POST body
//             message : "Got long and lat!"
//         })
//     } else if (isStringProvided(request.body.selectedCity)) { 
//         userCity = request.body.selectedCity
//         latitude = -999
//         longitude = -999
        
//         response.send({
//             //req.body is a reference to arguments in the POST body
//                 message : "Got city!"
//         })
//     } else {
//         response.status(400).send({
//             message: "Missing required information"
//         })
//     }
//     forecast()
// })

// Send the POST request 
router.post("/", (request, res) => {

    userCity = request.body.city


    var url = `http://api.openweathermap.org/data/2.5/forecast?`
                +`q=${userCity}&appid=${API_KEY}`


        requestWeather({ url: url, json: true }, function (error, response) { 
        if (error) { 
            console.log('Unable to connect to Forecast API'); 
        }  else { 

            currentTemp = response.body.main.temp
            maxTemp = response.body.main.temp_max 
            lowTemp = response.body.main.temp_min
            city = response.body.name
            weather = response.body.weather

        } 

    }) 


    res.send({
        CurrentTemp: currentTemp,
        maxTemp: maxTemp,
        lowTemp: lowTemp,
        city: city,
        weather: weather
     })


})

// "return" the router
module.exports = router
