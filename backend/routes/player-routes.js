const express = require("express")
//router : mini router for navigation
const router = express.Router();

const Player = require("./models/player")
const Team = require("./models/team")

//business logic : get all players
router.get("/players", (req, res) => {
    console.log("Business Logic : get all players");
    Player.find().populate("tId").then((tab) => {
        console.log("tab : ", tab);
        res.json({ players: tab })
    });
})

//business logic : get player by id
router.get("/players/:id", (req, res) => {
    console.log("Business Logic : get player by id");
    Player.findById(req.params.id).then((obj) => {
        console.log("obj : ", obj);
        (obj) ? res.json({ foundPlayer: obj }) : res.json({ msg: "no found player" });
    });
})

//business logic : add player
router.post("/players", (req, res) => {
    console.log("Business Logic : add player", req.body);
    Team.findById(req.body.teamId).then((foundTeam) => {
        if (!foundTeam) {
            return res.json({ msg: "Team not found" })
        }
        let player = new Player({
            name: req.body.name,
            age: req.body.age,
            position: req.body.position,
            number: req.body.number,
            tId: new mongoose.Types.ObjectId(req.body.teamId)
        });
        console.log(player);
        player.save((err, doc) => {
            console.log("error : " + err);
            console.log("doc : " + doc);
            if (err) {
                res.json({ msg: "Error adding player" })
            }
            else {
                foundTeam.playersId.push(doc._id);
                foundTeam.save();
                res.json({ msg: "Player added succesfully" })
            }

        });
    });
})

//business logic : edit player  
router.put("/players", (req, res) => {
    console.log("Business Logic : edit player");
    Player.updateOne({ _id: req.body._id }, req.body).then((result) => {
        console.log("result : ", result);
        (result.matchedCount == 0) ? res.json({ msg: `Player N° ${req.body._id} is not found`, isUpdated: false }) : res.json({ msg: "Player edited succesfully", isUpdated: true })
    });
})

module.exports = router