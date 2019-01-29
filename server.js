const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const dojo = require("./routes/api/dojo");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//Bodyparser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = process.env.MONGODB_URI || require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
	.connect(
		db,
		{useNewUrlParser: true}
	)
	.then(() => console.log("MongoDB Connected..."))
	.catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//Use routes
app.use("/api/dojo", dojo);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	//Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
