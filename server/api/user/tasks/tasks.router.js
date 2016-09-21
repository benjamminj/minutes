let express = require('express');

let router = express.Router();
let controller = require('./tasks.controller');

router.get('/', controller.getAllTasks);

module.exports = router;