const express = require("express");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const router = express.Router();

router.get("/", async (req, res) => {
  const { search, location, category, date } = req.query;

  let query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (location) {
    query.location = location;
  }

  if (category) {
    query.category = category;
  }

  if (date) {
    const selectedDate = new Date(date);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    query.date = {
      $gte: selectedDate,
      $lt: nextDay,
    };
  }

  const events = await Event.find(query);

  const eventsWithSeats = await Promise.all(
    events.map(async (event) => {
      const registeredCount = await Registration.countDocuments({
        event: event._id,
      });

      return {
        ...event._doc,
        availableSeats: event.capacity - registeredCount,
      };
    })
  );

  res.json(eventsWithSeats);
});

router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const registeredCount = await Registration.countDocuments({
    event: event._id,
  });

  res.json({
    ...event._doc,
    availableSeats: event.capacity - registeredCount,
  });
});

module.exports = router;