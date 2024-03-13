const { Subtask } = require("../models/subtask.model");
const { Task } = require("../models/task.model");

exports.createSubtask = async (req, res) => {
  try {
    const { task_id } = req.body;
    const newSubtask = await Subtask.create(req.body);
    res.status(201).json(newSubtask);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getAllUserSubtasks = async (req, res) => {
  try {
    const userId = req.params.id;
    const taskId = req.query.taskId;
    const userTasks = await Task.find({ userId });
    const taskIds = userTasks.map((task) => task._id);

    if (req.query.taskId) {
      const userSubtasks = await Subtask.find({
        task_id: { $in: taskId },
        deleted_at: { $eq: null, $type: "null" },
      });
      res.status(200).json({ subtasks: userSubtasks });
    } else {
      const userSubtasks = await Subtask.find({
        task_id: { $in: taskIds },
        deleted_at: { $eq: null, $type: "null" },
      });
      res.status(200).json({ subtasks: userSubtasks });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user subtasks" });
  }
};

exports.getAllSubtasksOfTask = async (req, res) => {
  try {
    const task_id = req.params.id;
    const subtasks = await Subtask.find({ task_id: task_id });
    res.status(200).send({ subtasks: subtasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user subtasks" });
  }
};

exports.updateSubtask = async (req, res) => {
  try {
    const { subtaskId } = req.params;
    const { status } = req.body;
    const updatedSubtask = await Subtask.findByIdAndUpdate(
      subtaskId,
      { status, updated_at: new Date(Date.now()) },
      { new: true }
    );
    res.status(200).json(updatedSubtask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subtask" });
  }
};

exports.deleteSubtask = async (req, res) => {
  try {
    const { subtaskId } = req.params;
    await SubByIdAndUpdate(subtaskId, { deleted_at: new Date() });
    res.status(200).json({ message: "Subtask deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subtask" });
  }
};