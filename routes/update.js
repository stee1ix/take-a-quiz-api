const router = require('express').Router();
const User = require('../model/User');

//UPDATE A POST
router.put('/', async (req, res) => {
	try {
		const updatedUser = await User.updateOne(
			{ _id: req.body.id },
			{
				$inc: {
					attempted: 1,
					total: req.body.score,
				},
			}
		);
		res.json(updatedUser);
	} catch (error) {
		res.status(400).send({ message: error });
	}
});

module.exports = router;
