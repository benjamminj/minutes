# MINUTES
Node app for simple time management

### Overview

MINUTES is a Node.js app that allows you to start a timer and save the end result with a title and description. This is perfect for habit tracking, billable hours, or any activity in which you may need to monitor *how long* you're doing what you're doing.

### API

#### Endpoints

| Endpoint          | Purpose                          | Type   | Parameters                                      |
| -----------       | ---------------                  | -----  | ----------------------------------------------- | 
| /user/signup      | Signs a user in                  | POST   | <ul><li>username\*</li><li>password\*</li></ul> | 
| /user/login       | Logs a user into their account   | POST   | <ul><li>username\*</li><li>password\*</li></ul> |
| /user/logout      | Logs a user out of their account | GET    | <ul><li>none</li></ul>                          |
| /tasks            | Retrieves all of a user's tasks  | GET    | <ul><li>none</ul></li>                          |
| /tasks/delete/:id | Removes a task with a given id   | DELETE | <ul><li>none</li></ul>                          | 
| /tasks/create     | Save a new task in the database  | POST   | <ul><li>title</li><li>date</li><time\*><li>time\*</li><li>description</li></ul> |
| /tasks/edit/:id   | Edit a single task               | PUT    | <ul><li>title</li><li>description</li></ul>     | 
\* indicates a required parameter

### Installation
##### Clone the repository
`git clone https://github.com/benjaminj6/minutes-app.git`

##### Install Dependencies
`npm install`

##### Start the app
`npm start`
*Make sure that you are running MongodDB before you start

### Run Tests
All of the tests for MINUTES are written in Mocha using the Chai assertion library.
`$ npm test`

### Coverage Reports
Coverage reports are generated via Istanbul.

`$ npm run coverage`

### Technologies Used

* Node.js
* Express.js
* MongoDB (with Mongoose)
* Mocha (with Chai assertions)
* Istanbul
* Winston
* Passport.js
* Webpack
* Less





