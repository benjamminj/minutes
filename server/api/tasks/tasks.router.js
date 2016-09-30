let isLoggedIn = require('../../utils/is.logged.in');

let express = require('express');

let router = express.Router();
let controller = require('./tasks.controller');

router.use(isLoggedIn);

router.get('/', controller.getAllTasks);
router.delete('/delete/:taskID', controller.deleteTask);
router.post('/create', controller.createTask);
router.put('/edit/:taskID', controller.editTask);

module.exports = router;