const Joi = require('joi');
const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    }
});

const Email = mongoose.model('Email', emailSchema);

function validateEmail(email) {
    const schema = {
        email: Joi.string().min(3).required()
    };

    return Joi.validate(email, schema);
}

exports.emailSchema = emailSchema;
exports.Email = Email;
exports.validate = validateEmail;