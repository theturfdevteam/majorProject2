const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const path = require("path")
router = express.Router();


const initializePassport = require(path.resolve(__dirname,"../","passportconfig.js"))
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )

const users = []



router.post("/signup", async(req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users);
        res.redirect("loginPage")
    } catch (error) {
        console.log(error);
        res.redirect("registerPage")
    }
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "loginPage",
    failureFlash: true
}))

router.post("/booking",(req,res)=>{
    const formData = req.body;
    const collection = client.db('turfdata3').collection('bookingdata');
    collection.insertOne(formData, function(err, result) {
    if (err) throw err;
        res.send('Form data saved to MongoDB');
        client.close();
    });
    console.log(req.body)
    res.sendFile(path.resolve(__dirname,"../","public","html","booking.html"))
})
router.post("/contact",(req,res)=>{
    const formData = req.body;
    const collection = client.db('turfdata3').collection('contactus');
    collection.insertOne(formData, function(err, result) {
    if (err) throw err;
        res.send('Form data saved to MongoDB');
        client.close();
    });
    console.log(req.body)
    res.sendFile(path.resolve(__dirname,"../","public","html","home.html"))
})


// router.post("/login",(req,res)=>{
//     const formData = req.body;
//     const collection = client.db('turfdata3').collection('logindata');
//     collection.insertOne(formData, function(err, result) {
//     if (err) throw err;
//         res.send('Form data saved to MongoDB');
//         client.close();
//     });
//     console.log(req.body)
//     res.sendFile(path.resolve(__dirname,"../","public","signlog.html"))
// })

// router.post("/signup",(req,res)=>{
//     const formData = req.body;
//     const collection = client.db('turfdata3').collection('users');
//     collection.insertOne(formData, function(err, result) {
//     if (err) throw err;
//         res.send('Form data saved to MongoDB');
//         client.close();
//     });
//     console.log(req.body)
//     res.sendFile(path.resolve(__dirname,"../","public","signlog.html"))
// })

//MongoDB Client definition
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://theturfdevteam:devteam987@cluster0.iuracqj.mongodb.net/turfdata3?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// this folder containse all the routes for the app
// methods are  get without any parameters
// post when you need any data to be sent
router.get("/home",(req,res)=>{
    //console.log(req.body)
    res.sendFile(path.resolve(__dirname,"../","public","html","home.html"))
})
router.get("/loginPage",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../","public","signlog.html"))
})
router.get("/signupPage",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../","public","signlog.html#signup"))
})
router.get("/bookingPage",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../","public","html","booking.html"))
})

module.exports = router;
