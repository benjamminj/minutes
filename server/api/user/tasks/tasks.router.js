let express = require('express');

let router = express.Router();
let controller = require('./tasks.controller');

// TO DO -- Eventually, remove :id from endpoint. Pass User ID through session data.
router.get('/:id/tasks', controller.getAllTasks);

module.exports = router;