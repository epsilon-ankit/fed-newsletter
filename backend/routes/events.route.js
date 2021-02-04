const { Event, validate } = require("../models/events.model");
const _ = require('lodash');
const express = require("express");
const router = express.Router();

/**
 * @description Add Event
 */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let event = new Event(_.pick(req.body, ["name", "description", "link"]));
  await event.save();
  res.send(event);
});

/**
 * @description Get Events
 */
router.get("/", async (req, res) => {
  let event = await Event.find();
  res.send(event);
});

/**
 * @description Delete Event
 */
router.delete("/:id", async (req, res, next) => {
  await Event.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
    });
  });
});

module.exports = router;
