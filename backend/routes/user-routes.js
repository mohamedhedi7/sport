const express = require("express")
const multer = require("multer")
//router : mini router for navigation
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const User = require("../models/user")
//business logic : user signup
// 1 : User signed up succesfully
// 2 : Email already exists
// 3 : Error during signup
router.post("/users/signup", multer({ storage: storage }).single("img"), (req, res) => {
    console.log("Business Logic : user signup");
    User.findOne({ email: req.body.email }).then((foundUser) => {
        if (foundUser) {
            res.json({ msg: "2" })
        }
        else {
            bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
                console.log("here is crypted pwd", cryptedPwd);
                req.body.pwd = cryptedPwd
                req.body.photo = (req.file) ? "http://localhost:3000/images/" + req.file.filename : req.body.photo = "http://localhost:3000/images/a.png"
                let user = new User(req.body);
                user.save((err, doc) => {
                    console.log("error : " + err);
                    console.log("doc : " + doc);
                    err ? res.json({ msg: "3" }) : res.json({ msg: "1" })
                });
            })
        }
    });
})

//business logic : user login
// 1 : login successful
// 2 : Email not found
// 3 : wrong password  
router.post("/users/login", (req, res) => {
    console.log("Business Logic : user login");
    console.log(req.body);
    User.findOne({ email: req.body.email }).then((foundUser) => {
        if (!foundUser) {
            return res.json({ msg: "2" })
        }
        bcrypt.compare(req.body.pwd, foundUser.pwd).then((isEqual) => {
            if (!isEqual) {
                return res.json({ msg: "3" })
            }
            let userToSend = {
                id: foundUser._id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                role: foundUser.role
            }
            let token = jwt.sign(userToSend, secretKey, { expiresIn: '1d' });
            res.json({ msg: "1", user: token })
        })
    });
})



module.exports = router