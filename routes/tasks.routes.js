const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks.controller");
const middleware = require("../middlewares/auth.middleware");

router.post(
    "/", 
    [middleware.verifyToken], 
    tasksController.createTask
);
router.put(
    "/:taskId", 
    [middleware.verifyToken], 
    tasksController.updateTask
);
router.delete("/:taskId", 
[middleware.verifyToken], 
tasksController.deleteTask
);
router.get(
    "/:id", 
    [middleware.verifyToken], 
    tasksController.getAllUserTasks
);

module.exports = router;