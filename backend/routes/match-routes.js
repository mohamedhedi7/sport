const express = require("express")
//router : mini router for navigation
const router = express.Router();

const Match = require("../models/match")

//business logic : get all matches
router.get("/", (req, res) => {
    console.log("Business Logic : get all matches");
    Match.find().then((tab) => {
        console.log("tab : ", tab);
        res.json({ matches: tab })
    });
})

//business logic : get match by id
router.get("/:id", (req, res) => {
    console.log("Business Logic : get match by id");
    Match.findById(req.params.id).then((obj) => {
        console.log("obj : ", obj);
        (obj) ? res.json({ foundMatch: obj }) : res.json({ msg: "no found match" });
    });
})

//business logic : delete match by id
router.delete("/:id", (req, res) => {
    console.log("Business Logic : delete match by id");
    Match.deleteOne({ _id: req.params.id }).then((result) => {
        console.log("result : ", result);
        (result.deletedCount == 0) ? res.json({ msg: `Match N° ${req.params.id} is not found`, isDeleted: false }) : res.json({ msg: "Match is Deleted", isDeleted: true })
    });
})

//business logic : add match
router.post("", (req, res) => {
    console.log("Business Logic : add match");
    let match = new Match(req.body);
    match.save((err, doc) => {
        console.log("error : " + err);
        console.log("doc : " + doc);
        err ? res.json({ msg: "Error adding match" }) : res.json({ msg: "Match added succesfully" })
    });
})

//business logic : edit match
router.put("", (req, res) => {
    console.log("Business Logic : edit match");
    Match.updateOne({ _id: req.body._id }, req.body).then((result) => {
        console.log("result : ", result);
        (result.matchedCount == 0) ? res.json({ msg: `Match N° ${req.body._id} is not found`, isUpdated: false }) : res.json({ msg: "Match edited succesfully", isUpdated: true })
    });
})

//business logic : get match by team name
router.get("/search/:teamName", (req, res) => {
    console.log("Business Logic : get match by team");
    let team = req.params.teamName
    Match.find({ $or: [{ teamOne: team }, { teamTwo: team }] }).then((tab) => {
        console.log("tab : ", tab);
        (tab.length == 0) ? res.json({ msg: `there is no match for team ${team}` }) : res.json({ matches: tab })

    })
})

module.exports = router