const express = require("express")
//router : mini router for navigation
const router = express.Router();

const Team = require("../models/team")

//business logic : get all teams
router.get("/", (req, res) => {
    console.log("Business Logic : get all teams");
    Team.find().populate('playersId').then((tab) => {
        console.log("tab : ", tab);
        res.json({ teams: tab })
    });
})

//business logic : get team by id
router.get("/:id", (req, res) => {
    console.log("Business Logic : get team by id");
    Team.findById(req.params.id).then((obj) => {
        console.log("obj : ", obj);
        (obj) ? res.json({ foundTeam: obj }) : res.json({ msg: "no found team" });
    });
})

//business logic : delete team by id
router.delete("/:id", (req, res) => {
    console.log("Business Logic : delete team by id");
    Team.deleteOne({ _id: req.params.id }).then((result) => {
        console.log("result : ", result);
        (result.deletedCount == 0) ? res.json({ msg: `Team N° ${req.params.id} is not found`, isDeleted: false }) : res.json({ msg: "Team is Deleted", isDeleted: true })
    });
})


//business logic : add team
router.post("/", (req, res) => {
    console.log("Business Logic : add team");
    let team = new Team(req.body);
    team.save((err, doc) => {
        console.log("error : " + err);
        console.log("doc : " + doc);
        err ? res.json({ msg: "Error adding team" }) : res.json({ msg: "Team added succesfully" })
    }
    );
})

//business logic : edit team
router.put("/", (req, res) => {
    console.log("Business Logic : edit team");
    Team.updateOne({ _id: req.body._id }, req.body).then((result) => {
        console.log("result : ", result);
        (result.matchedCount == 0) ? res.json({ msg: `Team N° ${req.body._id} is not found`, isUpdated: false }) : res.json({ msg: "Team edited succesfully", isUpdated: true })
    });
})

module.exports = router