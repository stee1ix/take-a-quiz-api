const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		max: 10,
		required: true,
	},
	attempted: {
		type: Number,
		default: 0,
	},
	total: {
		type: Number,
		default: 0,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Users', UserSchema);
