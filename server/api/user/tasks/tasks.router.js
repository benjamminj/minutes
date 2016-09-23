let express = require('express');

let router = express.Router();
let controller = require('./tasks.controller');

// TO DO -- Eventually, remove :id from endpoint. Pass User ID through session data.
router.get('/:id/tasks', controller.getAllTasks);
router.delete('/:id/tasks/delete/:taskID', controller.deleteTask);
router.post('/:id/tasks/create', controller.createTask);
router.put('/:id/tasks/edit/:taskID', controller.editTask);

module.exports = router;