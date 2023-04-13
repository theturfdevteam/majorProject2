if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")

const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")

const  port = 5001;
const router = require("./routes/index.js");
const req = require("express/lib/request.js");
const bodyParser = require("body-parser")

const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
//app.use(methodOverride("_method"))

app.get("/",(req,res)=>{
    res.redirect("/user/home")
})
app.use("/user",router);






app.listen(port,()=>{
    console.log(`connected at port ${port}`)
})
