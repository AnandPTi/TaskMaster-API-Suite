const { Task } = require("../models/task.model");
const { Subtask } = require("../models/subtask.model");

exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const userId = req.user.id;
    const newTask = await Task.create({ title, description, due_date, userId });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.getAllUserTasks = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Query tasks with pagination
    const tasks = await Task.find({
      userId: userId,
      deleted_at: { $eq: null, $type: "null" },
    })
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({ tasks: tasks });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { due_date, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { due_date, status, updated_at: new Date(Date.now()) },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndUpdate(taskId, { deleted_at: new Date() });
    await Subtask.updateMany({task_id: taskId}, { deleted_at: new Date() })
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};