//validation
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().max(10).required(),
	});
	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().max(10).required(),
	});
	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
