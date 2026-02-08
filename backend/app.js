//importing modules
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/sportDB');

const session = require("express-session")
const multer = require("multer")
const path = require("path")


//create express app
const app = express()
//app config
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const secretKey = 'hedi2026';
app.use(session({
    secret: secretKey,
}));
app.use('/images', express.static(path.join('backend/uploads')))


//models import
const Player = require("./models/player")
const User = require("./models/user")
const Team = require("./models/team")
const Stadium = require("./models/stadium")

//routes files importation
const playerRoutes = require("./routes/player-routes")
const userRoutes = require("./routes/user-routes")
const teamRoutes = require("./routes/team-routes")
const matchRoutes = require("./routes/match-routes")
const apiRoutes = require("./routes/api-routes")

app.use("/matches", matchRoutes)
app.use("/api", apiRoutes)
app.use("/players", playerRoutes)
app.use("/users", userRoutes)
app.use("/teams", teamRoutes)
const stadiumRoutes = require("./routes/stadium-routes")

let teamsTab = [
    { id: 1, name: "RMD", foundation: 1902, owner: "salah" },
    { id: 2, name: "FCB", foundation: 1899, owner: "hedi" },
    { id: 3, name: "CA", foundation: 1920, owner: "ali" },
]
let playersTab = [
    { id: 1, name: "Messi", age: 38, position: "Rw", number: 10, teamId: 1 },
    { id: 2, name: "CR7", age: 40, position: "ST", number: 7, teamId: 3 },
    { id: 3, name: "Xavi", age: 45, position: "MD", number: 6, teamId: 1 },
]

let stadiumsTab = [
    { id: 1, name: "Santiago", country: "Spain", capacite: 100000, teamId: 1 },
    { id: 2, name: "Camp", country: "Spain", capacite: 85000, teamId: 2 },
    { id: 3, name: "Hamadi Agrbi", country: "Tunisia", capacite: 60000, teamId: 3 },
]
// app.ACTION_HTTP("/PATH",(req,res)=>{})









app.post("/stadiums", (req, res) => {
    console.log("Business Logic : add stadium");
    Team.findById(req.body.teamId).then((foundTeam) => {
        if (!foundTeam) {
            return res.json({ msg: "Team not found" })
        }
        let stadium = new Stadium(req.body);
        stadium.save((err, doc) => {
            console.log("error : " + err);
            console.log("doc : " + doc);
            if (err) {
                res.json({ msg: "Error adding stadium" })
            }
            else {
                foundTeam.stadiumId = doc._id;
                foundTeam.save();
                res.json({ msg: "stadium added succesfully" })
            }

        });
    });
})









app.get("/players/search/:playerName", (req, res) => {
    console.log("Business Logic : get match by team");
    let player = req.params.playerName
    let foundPlayer = playersTab.find((elm) => elm.name == player);
    console.log(foundPlayer);
    if (!foundPlayer) {
        res.json({ msg: `player ${player} is not found" })` })
    } else {
        let foundTeam = teamsTab.find((elm) => elm.id == foundPlayer.teamId);
        (!foundTeam) ? res.json({ msg: `player ${player} has no team`, player: foundPlayer }) : res.json({ player: foundPlayer, team: foundTeam })
    }
})
app.get("/teams/search/:teamName", (req, res) => {
    console.log("Business Logic : get match by team");
    let team = req.params.teamName
    let foundTeam = teamsTab.find((elm) => elm.name == team);
    console.log(foundTeam);
    if (!foundTeam) {
        res.json({ msg: `team ${team} is not found" })` })
    } else {
        let foundPlayers = playersTab.filter((elm) => elm.teamId == foundTeam.id);
        (foundPlayers.length == 0) ? res.json({ msg: `team ${team} has no players`, team: foundTeam }) : res.json({ team: foundTeam, players: foundPlayers })
    }
})

app.post("/stadium", (req, res) => {
    console.log("Business Logic : add stadium");
    let obj = req.body
    stadiumsTab.push(obj)
    res.json({ msg: "Object added succesfully" })
})

app.get("/stadium", (req, res) => {
    res.json({ t: stadiumsTab })
})

app.get("/stadium/search/:stadiumName", (req, res) => {
    let stadium = req.params.stadiumName
    let foundStadium = stadiumsTab.find((elm) => elm.name == stadium);
    console.log(foundStadium);
    (!foundStadium) ? res.json({ msg: `there is no stadium with name ${stadium}` }) : res.json({ stadium: foundStadium });
})

app.get("/stadium/searchTeam/:stadiumName", (req, res) => {
    console.log("Business Logic : get match by team");
    let stadium = req.params.stadiumName
    let foundStadium = stadiumsTab.find((elm) => elm.name == stadium);
    if (!foundStadium) {
        res.json({ msg: `there is no stadium with name ${stadium}` })
    }
    else {
        let foundTeam = teamsTab.filter((elm) => elm.id == foundStadium.teamId);
        (foundTeam.length == 0) ? res.json({ msg: `stadium ${stadium} has no team`, stadium: foundStadium }) : res.json({ stadium: foundStadium, team: foundTeam })
    }
})

//export app module
module.exports = app