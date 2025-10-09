const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// Create or update a workout for a user on a date & exercise
router.post("/", async (req, res) => {
  // expects: { day, name, date, sets: [{setNumber,reps,weight}] }
  try {
    const { day, name, date, sets } = req.body;
    const userId = req.user.id;

    // Upsert: remove previous and add new (or use update logic)
    await Workout.findOneAndUpdate(
      { userId, day, name, date },
      { userId, day, name, date, sets, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ msg: "Saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get workouts for user (optionally filter by day/name/date range)
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { day, name, startDate, endDate } = req.query;

    const filter = { userId };
    if (day) filter.day = day;
    if (name) filter.name = name;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = startDate;
      if (endDate) filter.date.$lte = endDate;
    }

    const workouts = await Workout.find(filter).sort({ date: 1 });
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete a workout
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const doc = await Workout.findOneAndDelete({ _id: id, userId });
    if (!doc) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
