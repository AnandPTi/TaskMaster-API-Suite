const express = require("express");
const router = express.Router();
const subtasksController = require("../controllers/subtasks.controller");
const middleware = require("../middlewares/auth.middleware");

router.post(
  "/createsubtask",
  [middleware.verifyToken],
  subtasksController.createSubtask
);
router.put(
  "/:subtaskId",
  [middleware.verifyToken],
  subtasksController.updateSubtask
);
router.delete(
  "/:subtaskId",
  [middleware.verifyToken],
  subtasksController.deleteSubtask
);
router.get(
  "/:id",
  [middleware.verifyToken],
  subtasksController.getAllUserSubtasks
);

module.exports = router;