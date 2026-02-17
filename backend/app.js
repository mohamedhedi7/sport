//importing modules
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/sportDB');

const path = require("path")


//create express app
const app = express()
//app config
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/images', express.static(path.join('backend/uploads')))




//routes files importation
const playerRoutes = require("./routes/player-routes")
const userRoutes = require("./routes/user-routes")
const teamRoutes = require("./routes/team-routes")
const matchRoutes = require("./routes/match-routes")
const stadiumRoutes = require("./routes/stadium-routes")
app.use("/matches", matchRoutes)
app.use("/players", playerRoutes)
app.use("/users", userRoutes)
app.use("/teams", teamRoutes)
app.use("/stadiums", stadiumRoutes)




//export app module
module.exports = app