const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const passport = require("passport");

//Load input validation
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/registration");

//@route    get api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) => res.json({msg: "yo"}));

//@route    post api/users/login
//@desc     Login user / return JWTToken
//@access   Public
router.post("/login", (req, res) => {
	const {errors, isValid} = validateLoginInput(req.body);

	const email = req.body.email;
	const password = req.body.password;

	//Find user by emial
	User.findOne({email}).then(user => {
		//Check for user
		if (!user) {
			errors.email = "User not found";
			return res.status(404).json(errors);
		}
		//Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				//User matched
				const payload = {id: user.id, name: user.name};
				//sign token

				const secretOrKey = process.env.SECRET_OR_KEY || require("../../config/keys").secretOrKey
				jwt.sign(
					payload,
					secretOrKey,
					{expiresIn: 86400},
					(err, token) => {
						res.json({
							success: true,
							token: `Bearer ${token}`
						});
					}
				);
			} else {
				errors.password = "Password is incorrect";
				return res.status(400).json(errors);
			}
		});
	});
});

//@route    post api/users/test
//@desc     Register a user
//@access   Public
router.post("/register", (req, res) => {
	const {errors, isValid} = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({email: req.body.email}).then(user => {
		if (user) {
			errors.email = "Email already exists";
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

//@route    post api/users/current
//@desc     Return current user
//@access   Private
router.get(
	"/current",
	passport.authenticate("jwt", {session: false}),
	(req, res) => {
		res.json({id: req.user.id, name: req.user.name, email: req.user.email});
	}
);

module.exports = router;
