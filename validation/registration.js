const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
	let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";  

    if (!Validator.isLength(data.name, {min: 2, max: 30})) {
		errors.name = "Name must be between 2 and 30 characters";
    }

	if (Validator.isEmpty(data.name)) {
		errors.name = "Name field is required";
	}
    
    if (!Validator.isEmail(data.email)) {
		errors.email = "Emial is invalid";
    }

    if (Validator.isEmpty(data.email)) {
		errors.email = "Emial field is required";
    }

    if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
    }

    console.log(errors)
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
