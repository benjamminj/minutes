# MINUTES
Node app for simple time management

### Overview

MINUTES is a Node.js app that allows you to start a timer and save the end result with a title and description. This is perfect for habit tracking, billable hours, or any activity in which you may need to monitor *how long* you're doing what you're doing.

### Installation
##### Clone the repository
`git clone https://github.com/benjaminj6/minutes-app.git`

##### Install Dependencies
`npm install`

##### Start the app
`npm start`

*Make sure that you are running MongodDB before you start

### Live Demo

To view MINUTES in action, you can try out the Live Demo here. [add link] To sign in, use the username 'testuser' and the password 'password123'.
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


### Run Tests
All of the tests for MINUTES are written in Mocha using the Chai assertion library.

`$ npm test`

### Coverage Reports
Coverage reports are generated via Istanbul.

`$ npm run coverage`

### Builds
##### Run a frontend build
`npm run build`

Alternatively, you can also set a watch command using `npm run watch` to start continuous builds.
To run a production build simply use the `npm run build:prod` command.

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





