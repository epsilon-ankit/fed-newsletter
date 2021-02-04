const Joi = require("joi");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  }
});

const Event = mongoose.model("Event", eventSchema);

function validateEvent(event) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().max(200).required(),
    link: Joi.string().allow('')
  };
  return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validateEvent;
