const express = require("express")
const axios = require("axios")
//router : mini router for navigation
const router = express.Router();



//business logic : search weather
router.post("/weather", (req, res) => {
    console.log("Business Logic : search weather", req.body);
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

router.post("/searchTeamPlayers", (req, res) => {
    console.log("Business Logic : search team players from api")
    console.log(req.body);
    let apiUrl = `https://apiv2.allsportsapi.com/football/?met=Teams&teamName=${req.body.name}&APIkey=d603f30d9e184cc8efb474d7535ba2c22af9458b988af4715402a5d785c8aa30`
    axios.get(apiUrl).then(
        (apiResponse) => {
            console.log("here is res from api ", apiResponse);
        })
})
module.exports = router