let isLoggedIn = require('../../utils/is.logged.in');

let express = require('express');

let router = express.Router();
let controller = require('./tasks.controller');

router.use(isLoggedIn);

router.get('/', controller.getAllTasks);
router.get('/id:taskID', controller.getOneTask);
router.delete('/delete/:taskID', controller.deleteTask);
router.post('/create', controller.createTask);
router.put('/edit/:taskID', controller.editTask);

// TO DO -- add wild card to handle non-existent endpoints in the /tasks/* with a 404 message

module.exports = router;