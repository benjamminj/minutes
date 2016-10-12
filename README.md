# MINUTES
Node app for simple time management

### Overview

MINUTES is a Node.js app that allows you to start a timer and record the end time as a task with a title and description. This can be very useful for habit tracking, billable hours, or any activity in which you may need to monitor *how long* you're doing what you're doing.

### Examples

#### Logging in 
To begin using MINUTES, you will first need to create an account. If you are just looking to demo the app, you can log in with the username "user" and the password "ilovewatches123". 

#### Using the Timer
Once you are logged into your account, you can instantly begin a new task by selecting  "New" in the header. This will queue the timer screen:

![Timer Screenshot](http://image.prntscr.com/image/2529f6b1d52041ee9cb28f1cef34c893.png "Timer")

After you are done with the task that you wanted to track, stop the clock and select "Save" to add a title and a description. You will then be able to view your new task by selecting "History" in the header.
*Note: if you do not specify a title when you save the task, it will default to "My Task". If you do not specify a description, it will simply remain blank.

#### Viewing Your Past Tasks
You can view anything that you have timed under the "History" tab. Each task is displayed in a card format containing the title, date, timer value, and description of the task.

![Task Screenshot](http://image.prntscr.com/image/b85bff82d2b44dddbf58209eece5ff2b.png "Task")

Didn't know what to name your timer when you saved it? Decided that you don't need to see this card anymore? No problem -- clicking the arrow in the corner will reveal a menu that allows you to either edit or delete any given task.

### API

#### Endpoints

| endpoint | purpose | type | parameters |
| --- | --- | --- | --- | 
| user/signup | Signs a user in | POST | <ul><li>username\*</li><li>password\*</li></ul> | 
| user/login | Logs a user into their account | POST | <ul><li>username\*</li><li>password\*</li></ul> |
| user/logout | Logs a user out of their account | GET | <ul><li>none</li></ul>  |
| tasks | Retrieves an array of all tasks assigned to a logged in user | GET | <ul><li>none</ul></li> |
| tasks/delete/:id | Removes a task with a given id from the database | DELETE | <ul><li>none</li></ul> | 
|tasks/create | Adds a new task to the database | POST | <ul><li>title</li><li>date</li><time\*><li>time\*</li><li>description</li></ul> |
|tasks/edit/:id | Edit the title or description of a specific task | PUT | <ul><li>title</li><li>description</li></ul>
\* indicates a required parameter

### Depencies

* bcrypt
* body-parser
* connect-flash
* cookie-parser
* express
* express-session
* mongoose
* nodemon
* passport
* passport-local
* winston

#### Dev Dependencies 

* babel-core
* babel-loader
* babel-preset-es2015
* chai
* chai-http
* css-loader
* extract-text-webpack-plugin
* intercept
* istanbul
* less
* less-loader
* mocha
* stdout
* style-loader
* uglify-js
* webpack




