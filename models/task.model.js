const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["TODO","IN_PROGRESS", "DONE"],
    default: "TODO",
  },
  priority: {
    type: Number, 
    default: 2,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = {
  Task,
};
