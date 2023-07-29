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
var dayOneWeather;
var dayOne
var dayOneTempMin = [];
var dayOneTempMax = [];
var dayOneMaxVal;
var dayOneMinVal;

var dayTwoWeather;
var dayTwo
var dayTwoTempMin = [];
var dayTwoTempMax = [];
var dayTwoMaxVal;
var dayTwoMinVal;

var dayThreeWeather;
var dayThree
var dayThreeTempMin = [];
var dayThreeTempMax = [];
var dayThreeMaxVal;
var dayThreeMinVal;

var dayFourWeather;
var dayFour
var dayFourTempMin = [];
var dayFourTempMax = [];
var dayFourMaxVal;
var dayFourMinVal;

var dayFiveWeather;
var dayFive
var dayFiveTempMin = [];
var dayFiveTempMax = [];
var dayFiveMaxVal;
var dayFiveMinVal;

var userCity = 'Tacoma';


// This method will call the weather API 
function forecast() { 

    var url = `http://api.openweathermap.org/data/2.5/forecast?`
                +`q=${userCity}&appid=${API_KEY}`



        requestWeather({ url: url, json: true }, function (error, response) { 

        if (error) { 
            console.log('Unable to connect to Forecast API'); 
        }  else { 

            dayOneWeather = response.body.list[0].weather[0].main
            dayOne = response.body.list[0].dt
            dayOneTempMin.push(response.body.list[0].main.temp_min)
            dayOneTempMax.push(response.body.list[0].main.temp_max)
            dayOneTempMin.push(response.body.list[1].main.temp_min)
            dayOneTempMax.push(response.body.list[1].main.temp_max)
            dayOneTempMin.push(response.body.list[2].main.temp_min)
            dayOneTempMax.push(response.body.list[2].main.temp_max)
            dayOneTempMin.push(response.body.list[3].main.temp_min)
            dayOneTempMax.push(response.body.list[3].main.temp_max)
            dayOneTempMin.push(response.body.list[4].main.temp_min)
            dayOneTempMax.push(response.body.list[4].main.temp_max)
            dayOneTempMin.push(response.body.list[5].main.temp_min)
            dayOneTempMax.push(response.body.list[5].main.temp_max)
            dayOneTempMin.push(response.body.list[6].main.temp_min)
            dayOneTempMax.push(response.body.list[6].main.temp_max)
            dayOneTempMin.push(response.body.list[7].main.temp_min)
            dayOneTempMax.push(response.body.list[7].main.temp_max)

            dayTwoWeather = response.body.list[8].weather[0].main
            dayTwo = response.body.list[8].dt
            dayTwoTempMin.push(response.body.list[8].main.temp_min)
            dayTwoTempMax.push(response.body.list[8].main.temp_max)
            dayTwoTempMin.push(response.body.list[9].main.temp_min)
            dayTwoTempMax.push(response.body.list[9].main.temp_max)
            dayTwoTempMin.push(response.body.list[10].main.temp_min)
            dayTwoTempMax.push(response.body.list[10].main.temp_max)
            dayTwoTempMin.push(response.body.list[11].main.temp_min)
            dayTwoTempMax.push(response.body.list[11].main.temp_max)
            dayTwoTempMin.push(response.body.list[12].main.temp_min)
            dayTwoTempMax.push(response.body.list[12].main.temp_max)
            dayTwoTempMin.push(response.body.list[13].main.temp_min)
            dayTwoTempMax.push(response.body.list[13].main.temp_max)
            dayTwoTempMin.push(response.body.list[14].main.temp_min)
            dayTwoTempMax.push(response.body.list[14].main.temp_max)
            dayTwoTempMin.push(response.body.list[15].main.temp_min)
            dayTwoTempMax.push(response.body.list[15].main.temp_max)

            dayThreeWeather = response.body.list[16].weather[0].main
            dayThree = response.body.list[16].dt
            dayThreeTempMin.push(response.body.list[16].main.temp_min)
            dayThreeTempMax.push(response.body.list[16].main.temp_max)
            dayThreeTempMin.push(response.body.list[17].main.temp_min)
            dayThreeTempMax.push(response.body.list[17].main.temp_max)
            dayThreeTempMin.push(response.body.list[18].main.temp_min)
            dayThreeTempMax.push(response.body.list[18].main.temp_max)
            dayThreeTempMin.push(response.body.list[19].main.temp_min)
            dayThreeTempMax.push(response.body.list[19].main.temp_max)
            dayThreeTempMin.push(response.body.list[20].main.temp_min)
            dayThreeTempMax.push(response.body.list[20].main.temp_max)
            dayThreeTempMin.push(response.body.list[21].main.temp_min)
            dayThreeTempMax.push(response.body.list[21].main.temp_max)
            dayThreeTempMin.push(response.body.list[22].main.temp_min)
            dayThreeTempMax.push(response.body.list[22].main.temp_max)
            dayThreeTempMin.push(response.body.list[23].main.temp_min)
            dayThreeTempMax.push(response.body.list[23].main.temp_max)

            dayFourWeather = response.body.list[24].weather[0].main
            dayFour = response.body.list[24].dt
            dayFourTempMin.push(response.body.list[24].main.temp_min)
            dayFourTempMax.push(response.body.list[24].main.temp_max)
            dayFourTempMin.push(response.body.list[25].main.temp_min)
            dayFourTempMax.push(response.body.list[25].main.temp_max)
            dayFourTempMin.push(response.body.list[26].main.temp_min)
            dayFourTempMax.push(response.body.list[26].main.temp_max)
            dayFourTempMin.push(response.body.list[27].main.temp_min)
            dayFourTempMax.push(response.body.list[27].main.temp_max)
            dayFourTempMin.push(response.body.list[28].main.temp_min)
            dayFourTempMax.push(response.body.list[28].main.temp_max)
            dayFourTempMin.push(response.body.list[29].main.temp_min)
            dayFourTempMax.push(response.body.list[29].main.temp_max)
            dayFourTempMin.push(response.body.list[30].main.temp_min)
            dayFourTempMax.push(response.body.list[30].main.temp_max)
            dayFourTempMin.push(response.body.list[31].main.temp_min)
            dayFourTempMax.push(response.body.list[31].main.temp_max)

            dayFiveWeather = response.body.list[32].weather[0].main
            dayFive = response.body.list[32].dt
            dayFiveTempMin.push(response.body.list[32].main.temp_min) 
            dayFiveTempMax.push(response.body.list[32].main.temp_max)
            dayFiveTempMin.push(response.body.list[33].main.temp_min) 
            dayFiveTempMax.push(response.body.list[33].main.temp_max)
            dayFiveTempMin.push(response.body.list[34].main.temp_min) 
            dayFiveTempMax.push(response.body.list[34].main.temp_max)
            dayFiveTempMin.push(response.body.list[35].main.temp_min) 
            dayFiveTempMax.push(response.body.list[35].main.temp_max)
            dayFiveTempMin.push(response.body.list[36].main.temp_min) 
            dayFiveTempMax.push(response.body.list[36].main.temp_max)
            dayFiveTempMin.push(response.body.list[37].main.temp_min) 
            dayFiveTempMax.push(response.body.list[37].main.temp_max)
            dayFiveTempMin.push(response.body.list[38].main.temp_min) 
            dayFiveTempMax.push(response.body.list[38].main.temp_max)
            dayFiveTempMin.push(response.body.list[39].main.temp_min) 
            dayFiveTempMax.push(response.body.list[39].main.temp_max)

        } 

        // Get the max and min for temp
        dayOneMinVal = Math.min.apply(null, dayOneTempMin)
        dayOneMaxVal = Math.max.apply(null, dayOneTempMax)

        dayTwoMinVal = Math.min.apply(null, dayTwoTempMin)
        dayTwoMaxVal = Math.max.apply(null, dayTwoTempMax)

        dayThreeMinVal = Math.min.apply(null, dayThreeTempMin)
        dayThreeMaxVal = Math.max.apply(null, dayThreeTempMax)

        dayFourMinVal = Math.min.apply(null, dayFourTempMin)
        dayFourMaxVal = Math.max.apply(null, dayFourTempMax)

        dayFiveMinVal = Math.min.apply(null, dayFiveTempMin)
        dayFiveMaxVal = Math.max.apply(null, dayFiveTempMax)

    }) 
}

forecast()

// Call POST request first to get city or long and lat, then get
router.get("/", (request, response) => { 
    //forecast()
    response.json({
        dayOneWeather: dayOneWeather,
        dayOne: dayOne,
        dayOneTempMin: dayOneMinVal,
        dayOneTempMax: dayOneMaxVal,
        dayTwoWeather: dayTwoWeather,
        dayTwo: dayTwo,
        dayTwoTempMin: dayTwoMinVal,
        dayTwoTempMax: dayTwoMaxVal,
        dayThreeWeather: dayThreeWeather,
        dayThree: dayThree,
        dayThreeTempMin: dayThreeMinVal,
        dayThreeTempMax: dayThreeMaxVal,
        dayFourWeather: dayFourWeather,
        dayFour: dayFour,
        dayFourTempMin: dayFourMinVal,
        dayFourTempMax: dayFourMaxVal,
        dayFiveWeather: dayFiveWeather,
        dayFive: dayFive,
        dayFiveTempMin: dayFiveMinVal,
        dayFiveTempMax: dayFiveMaxVal
    })
})


// Send the POST request 
router.post("/", (request, responseA) => {

    userCity = request.body.city
    console.log(userCity)

    var url = `http://api.openweathermap.org/data/2.5/forecast?`
                +`q=${userCity}&appid=${API_KEY}`


        requestWeather({ url: url, json: true }, function (error, response) { 
        if (error) { 
            console.log('Unable to connect to Forecast API'); 
        }  else { 


            dayOneWeather = response.body.list[0].weather[0].main
            dayOne = response.body.list[0].dt
            dayOneTempMin.push(response.body.list[0].main.temp_min)
            dayOneTempMax.push(response.body.list[0].main.temp_max)
            dayOneTempMin.push(response.body.list[1].main.temp_min)
            dayOneTempMax.push(response.body.list[1].main.temp_max)
            dayOneTempMin.push(response.body.list[2].main.temp_min)
            dayOneTempMax.push(response.body.list[2].main.temp_max)
            dayOneTempMin.push(response.body.list[3].main.temp_min)
            dayOneTempMax.push(response.body.list[3].main.temp_max)
            dayOneTempMin.push(response.body.list[4].main.temp_min)
            dayOneTempMax.push(response.body.list[4].main.temp_max)
            dayOneTempMin.push(response.body.list[5].main.temp_min)
            dayOneTempMax.push(response.body.list[5].main.temp_max)
            dayOneTempMin.push(response.body.list[6].main.temp_min)
            dayOneTempMax.push(response.body.list[6].main.temp_max)
            dayOneTempMin.push(response.body.list[7].main.temp_min)
            dayOneTempMax.push(response.body.list[7].main.temp_max)

            dayTwoWeather = response.body.list[8].weather[0].main
            dayTwo = response.body.list[8].dt
            dayTwoTempMin.push(response.body.list[8].main.temp_min)
            dayTwoTempMax.push(response.body.list[8].main.temp_max)
            dayTwoTempMin.push(response.body.list[9].main.temp_min)
            dayTwoTempMax.push(response.body.list[9].main.temp_max)
            dayTwoTempMin.push(response.body.list[10].main.temp_min)
            dayTwoTempMax.push(response.body.list[10].main.temp_max)
            dayTwoTempMin.push(response.body.list[11].main.temp_min)
            dayTwoTempMax.push(response.body.list[11].main.temp_max)
            dayTwoTempMin.push(response.body.list[12].main.temp_min)
            dayTwoTempMax.push(response.body.list[12].main.temp_max)
            dayTwoTempMin.push(response.body.list[13].main.temp_min)
            dayTwoTempMax.push(response.body.list[13].main.temp_max)
            dayTwoTempMin.push(response.body.list[14].main.temp_min)
            dayTwoTempMax.push(response.body.list[14].main.temp_max)
            dayTwoTempMin.push(response.body.list[15].main.temp_min)
            dayTwoTempMax.push(response.body.list[15].main.temp_max)

            dayThreeWeather = response.body.list[16].weather[0].main
            dayThree = response.body.list[16].dt
            dayThreeTempMin.push(response.body.list[16].main.temp_min)
            dayThreeTempMax.push(response.body.list[16].main.temp_max)
            dayThreeTempMin.push(response.body.list[17].main.temp_min)
            dayThreeTempMax.push(response.body.list[17].main.temp_max)
            dayThreeTempMin.push(response.body.list[18].main.temp_min)
            dayThreeTempMax.push(response.body.list[18].main.temp_max)
            dayThreeTempMin.push(response.body.list[19].main.temp_min)
            dayThreeTempMax.push(response.body.list[19].main.temp_max)
            dayThreeTempMin.push(response.body.list[20].main.temp_min)
            dayThreeTempMax.push(response.body.list[20].main.temp_max)
            dayThreeTempMin.push(response.body.list[21].main.temp_min)
            dayThreeTempMax.push(response.body.list[21].main.temp_max)
            dayThreeTempMin.push(response.body.list[22].main.temp_min)
            dayThreeTempMax.push(response.body.list[22].main.temp_max)
            dayThreeTempMin.push(response.body.list[23].main.temp_min)
            dayThreeTempMax.push(response.body.list[23].main.temp_max)

            dayFourWeather = response.body.list[24].weather[0].main
            dayFour = response.body.list[24].dt
            dayFourTempMin.push(response.body.list[24].main.temp_min)
            dayFourTempMax.push(response.body.list[24].main.temp_max)
            dayFourTempMin.push(response.body.list[25].main.temp_min)
            dayFourTempMax.push(response.body.list[25].main.temp_max)
            dayFourTempMin.push(response.body.list[26].main.temp_min)
            dayFourTempMax.push(response.body.list[26].main.temp_max)
            dayFourTempMin.push(response.body.list[27].main.temp_min)
            dayFourTempMax.push(response.body.list[27].main.temp_max)
            dayFourTempMin.push(response.body.list[28].main.temp_min)
            dayFourTempMax.push(response.body.list[28].main.temp_max)
            dayFourTempMin.push(response.body.list[29].main.temp_min)
            dayFourTempMax.push(response.body.list[29].main.temp_max)
            dayFourTempMin.push(response.body.list[30].main.temp_min)
            dayFourTempMax.push(response.body.list[30].main.temp_max)
            dayFourTempMin.push(response.body.list[31].main.temp_min)
            dayFourTempMax.push(response.body.list[31].main.temp_max)

            dayFiveWeather = response.body.list[32].weather[0].main
            dayFive = response.body.list[32].dt
            dayFiveTempMin.push(response.body.list[32].main.temp_min) 
            dayFiveTempMax.push(response.body.list[32].main.temp_max)
            dayFiveTempMin.push(response.body.list[33].main.temp_min) 
            dayFiveTempMax.push(response.body.list[33].main.temp_max)
            dayFiveTempMin.push(response.body.list[34].main.temp_min) 
            dayFiveTempMax.push(response.body.list[34].main.temp_max)
            dayFiveTempMin.push(response.body.list[35].main.temp_min) 
            dayFiveTempMax.push(response.body.list[35].main.temp_max)
            dayFiveTempMin.push(response.body.list[36].main.temp_min) 
            dayFiveTempMax.push(response.body.list[36].main.temp_max)
            dayFiveTempMin.push(response.body.list[37].main.temp_min) 
            dayFiveTempMax.push(response.body.list[37].main.temp_max)
            dayFiveTempMin.push(response.body.list[38].main.temp_min) 
            dayFiveTempMax.push(response.body.list[38].main.temp_max)
            dayFiveTempMin.push(response.body.list[39].main.temp_min) 
            dayFiveTempMax.push(response.body.list[39].main.temp_max)

        } 

        // Get the max and min for temp
        dayOneMinVal = Math.min.apply(null, dayOneTempMin)
        dayOneMaxVal = Math.max.apply(null, dayOneTempMax)

        dayTwoMinVal = Math.min.apply(null, dayTwoTempMin)
        dayTwoMaxVal = Math.max.apply(null, dayTwoTempMax)

        dayThreeMinVal = Math.min.apply(null, dayThreeTempMin)
        dayThreeMaxVal = Math.max.apply(null, dayThreeTempMax)

        dayFourMinVal = Math.min.apply(null, dayFourTempMin)
        dayFourMaxVal = Math.max.apply(null, dayFourTempMax)

        dayFiveMinVal = Math.min.apply(null, dayFiveTempMin)
        dayFiveMaxVal = Math.max.apply(null, dayFiveTempMax)

    }) 
    console.log(dayOneWeather)
    console.log(dayOne)
    console.log(dayOneMinVal)


    responseA.send({
        dayOneWeather: dayOneWeather,
        dayOne: dayOne,
        dayOneTempMin: dayOneMinVal,
        dayOneTempMax: dayOneMaxVal,
        dayTwoWeather: dayTwoWeather,
        dayTwo: dayTwo,
        dayTwoTempMin: dayTwoMinVal,
        dayTwoTempMax: dayTwoMaxVal,
        dayThreeWeather: dayThreeWeather,
        dayThree: dayThree,
        dayThreeTempMin: dayThreeMinVal,
        dayThreeTempMax: dayThreeMaxVal,
        dayFourWeather: dayFourWeather,
        dayFour: dayFour,
        dayFourTempMin: dayFourMinVal,
        dayFourTempMax: dayFourMaxVal,
        dayFiveWeather: dayFiveWeather,
        dayFive: dayFive,
        dayFiveTempMin: dayFiveMaxVal,
        dayFiveTempMax: dayFiveMinVal
    })
})


// "return" the router
module.exports = router

