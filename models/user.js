const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
    },
    date: {
        type: String,
        default: Date.now()
    }
});

module.exports = User = mongoose.model("User", UserSchema);
