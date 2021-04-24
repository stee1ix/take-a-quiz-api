const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

//REGISTER
router.post('/register', async (req, res) => {
	//validating the data before we make a user
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if user is already in the database
	const usernameExists = await User.findOne({ username: req.body.username });
	if (usernameExists) return res.status(400).send('Username already exists');

	//hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//create a new user
	const user = new User({
		username: req.body.username,
		password: hashedPassword,
	});
	try {
		const savedUser = await user.save();
		res.send({
			username: savedUser.username,
			total: savedUser.total,
			attempted: savedUser.attempted,
			_id: savedUser.id,
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//LOGIN
router.post('/login', async (req, res) => {
	//validating the data before logging in the user
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if the email exists
	const user = await User.findOne({ username: req.body.username });
	if (!user) return res.status(400).send('username or password is wrong');
	//checking if the password is correct
	const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!validPassword) return res.status(400).send('Invalid Password');

	res.json({
		username: user.username,
		total: user.total,
		attempted: user.attempted,
		_id: user.id,
	});
});

module.exports = router;
