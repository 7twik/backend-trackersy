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

mongoose.connect("mongodb+srv://7twik:zKqW0UzgQO3G3iMy@cluster0.sjxr9uv.mongodb.net/Trackersy" ,()=> console.log("connected to db"));
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

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
// app.use(cors()) //and this

// app.get('/user/:id', function (req, res, next) {
//   res.json({user: 'CORS enabled'})
// })
app.use("/auth", authRoute);
app.use("",routes);


// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));

//   app.get("/", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// );
// app.get("/Home", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// );
// app.get("/Admin", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// );
// app.get("/Adminz", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// );
// app.get("/Cart", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// );
// app.get("/Register", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));