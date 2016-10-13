let Task = require('./task.model');
let createError = require('../../utils/create.error');

let Controller = {};

Controller.getAllTasks = (req, res, next) => {
  Task.find({ _owner: req.user.id })
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      next(err);
    });
};

Controller.deleteTask = (req, res, next) => {
  Task.findByIdAndRemove(req.params.taskID)
    .then((task) => {
      if (!task) {
        throw createError('NotFound', 'This task does not exist in the database!', 404);
      } else {
        res.status(200).end();
      }
    }).catch((err) => {
      next(err);
    });
};

Controller.createTask = (req, res, next) => {
  Task.create({
    _owner: req.user.id,
    title: req.body.title,
    time: req.body.time,
    description: req.body.description
  }).then((task) => {
    res.status(201).json(task);
  }).catch((err) => {
    next(err);
  });
};

Controller.editTask = (req, res, next) => {
  let edits = {};

  // Only adds title to the edits object if it exists
  if (req.body.title) {
    edits.title = req.body.title;
  }

  // Only adds description to the edits object if it exists
  if (req.body.description) {
    edits.description = req.body.description;
  }

  Task.findByIdAndUpdate(req.params.taskID, edits, { runValidators: true, new: true })
    .then((task) => {
      if (!task) {
        throw createError('NotFound', 'This task does not exist in the database!', 404);
      } else {
        res.status(200).json(task);
      }
    }).catch((err) => {
      next(err);
    });
};

module.exports = Controller;
