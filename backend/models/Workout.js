const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  setNumber: Number,
  reps: Number,
  weight: Number
}, { _id: false });

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  day: String,             // e.g. "chest"
  name: String,            // e.g. "benchpress"
  date: String,            // e.g. "2025-10-09" (store as string for compatibility)
  sets: [SetSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Workout", WorkoutSchema);
