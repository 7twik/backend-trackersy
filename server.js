require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();
const bp = require('body-parser')
const routes=require("./routes/route");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI ,()=> console.log("connected to db"));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

//app.use(
//	cors({
//		origin: "https://trackersy.onrender.com",
//		methods: "GET,POST,PUT,DELETE",
//		credentials: true,
//	})
//);
const corsOptions = {
    origin: 'https://trackersy.onrender.com/',
    credentials: true,
    optionSuccessStatus: 200
}

//app.use(cors(corsOptions));

//app.use(function (req, res, next) {
  //  res.header('Access-Control-Allow-Origin', "https://trackersy.onrender.com");
    //res.header('Access-Control-Allow-Headers', true);
//    res.header('Access-Control-Allow-Credentials', true);
  //  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //next();
//});

// app.get('/user/:id', function (req, res, next) {
//   res.json({user: 'CORS enabled'})
//
app.use("/auth", authRoute);
app.use("",routes);




const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
