const express = require("express")
const axios = require("axios")
//router : mini router for navigation
const router = express.Router();



//business logic : search weather
router.post("/weather", (req, res) => {
    let apiKey = "ff5513587e0b09cd8c739638f5172e5b"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&routerid=${apiKey}`
    axios.get(apiUrl).then((apiResponse) => {
        console.log("here is res from api ", apiResponse.data.weather[0].icon);
        let r = apiResponse.data;
        let obj = {
            temp: r.main.temp,
            pressure: r.main.pressure,
            humidity: r.main.humidity,
            windSpeed: r.wind.speed,
            country: r.sys.country,
            icon: r.weather[0].icon

        }
        res.json({ weather: obj })
    })
})


module.exports = router