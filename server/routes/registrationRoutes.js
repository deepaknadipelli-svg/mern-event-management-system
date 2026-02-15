const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const protect = require("../middleware/protect");

const router = express.Router();

// Register for event
router.post("/:eventId", protect, async (req, res) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const alreadyRegistered = await Registration.findOne({
    user: req.user._id,
    event: event._id,
  });

  if (alreadyRegistered) {
    return res.status(400).json({ message: "Already registered" });
  }

  const registrationCount = await Registration.countDocuments({
    event: event._id,
  });

  if (registrationCount >= event.capacity) {
    return res.status(400).json({ message: "Event is full" });
  }

  await Registration.create({
    user: req.user._id,
    event: event._id,
  });

  res.status(200).json({ message: "Registered successfully" });
});

router.delete("/:registrationId", protect, async (req, res) => {
  const registration = await Registration.findById(
    req.params.registrationId
  );

  if (!registration) {
    return res.status(404).json({
      message: "Registration not found",
    });
  }

  if (
    registration.user.toString() !==
    req.user._id.toString()
  ) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  await registration.deleteOne();

  res.json({ message: "Registration cancelled" });
});

router.get("/my", protect, async (req, res) => {
  const registrations = await Registration.find({ user: req.user._id })
    .populate("event");

  const today = new Date();

  const upcoming = [];
  const past = [];

  registrations.forEach((reg) => {
    if (new Date(reg.event.date) >= today) {
      upcoming.push(reg);
    } else {
      past.push(reg);
    }
  });

  res.json({
    upcoming,
    past,
  });
});

module.exports = router;