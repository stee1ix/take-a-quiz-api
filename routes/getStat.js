const router = require('express').Router();
const User = require('../model/User');

router.post('/', async (req, res) => {
	try {
		const getUser = await User.findOne({ _id: req.body.id });
		res.json({
			username: getUser.username,
			total: getUser.total,
			attempted: getUser.attempted,
		});
	} catch (error) {
		res.status(400).send({ message: error });
	}
});

module.exports = router;
