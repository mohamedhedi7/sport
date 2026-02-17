const express = require("express")
//router : mini router for navigation
const router = express.Router();

const Stadium = require("../models/stadium")
const Team = require("../models/team")
//business logic : get all stadiums
router.get("/", (req, res) => {
    console.log("Business Logic : get all stadiums");
    Stadium.find().populate('teamId').then((tab) => {
        console.log("tab : ", tab);
        res.json({ stadiums: tab })
    });
})

//business logic : get stadium by id
router.get("/:id", (req, res) => {
    console.log("Business Logic : get stadium by id");
    Stadium.findById(req.params.id).populate('teamId').then((obj) => {
        console.log("obj : ", obj);
        (obj) ? res.json({ stadium: obj }) : res.json({ msg: "no found stadium" });
    });
})

//business logic : delete stadium by id
router.delete("/:id", (req, res) => {
    console.log("Business Logic : delete stadium by id");
    Stadium.deleteOne({ _id: req.params.id }).then((result) => {
        console.log("result : ", result);
        (result.deletedCount == 0) ? res.json({ msg: `Stadium N° ${req.params.id} is not found`, isDeleted: false }) : res.json({ msg: "Stadium is Deleted", isDeleted: true })
    });
})


//business logic : add stadium
router.post("/", (req, res) => {
    console.log("Business Logic : add stadium");
    let stadium = new Stadium(req.body);
    stadium.save((err, doc) => {
        console.log("error : " + err);
        console.log("doc : " + doc);
        err ? res.json({ msg: "Error adding stadium" }) : res.json({ msg: "Stadium added succesfully" })
    }
    );
})

//business logic : edit stadium
router.put("/", (req, res) => {
    console.log("Business Logic : edit stadium");
    Stadium.updateOne({ _id: req.body._id }, req.body).then((result) => {
        console.log("result : ", result);
        (result.matchedCount == 0) ? res.json({ msg: `Stadium N° ${req.body._id} is not found`, isUpdated: false }) : res.json({ msg: "Stadium edited succesfully", isUpdated: true })
    });
})

module.exports = router