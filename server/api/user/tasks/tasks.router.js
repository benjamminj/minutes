let express = require('express');

let router = express.Router();
let controller = require('./tasks.controller');

// TO DO -- Eventually, remove :id from endpoint. Pass User ID through session data.
router.get('/tasks', controller.getAllTasks);
router.delete('/tasks/delete/:taskID', controller.deleteTask);
router.post('/tasks/create', controller.createTask);
router.put('/:id/tasks/edit/:taskID', controller.editTask);
router.post('/register', controller.register);

module.exports = router;