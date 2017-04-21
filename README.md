# Minutes
#### Time tracking and task management using Express.js

## Introduction

It's so easy to get lost in the moment or to lose track of time, and that's where _Minutes_ comes in. Maybe you're trying to start a new habit (like coding for an hour a day, brushing your teeth for 2 minutes instead of 20 seconds) or you're trying to test your speed at some task (how quickly can I run up and down the stairs 5x, how long does this Rubik's cube take), or you just simply need to know how long something takes (how long did I put the pie in the oven for _this_ time). Regardless of your use case, Minutes makes time management dead simple.

## Demo

You can view a live demo of _Minutes_ [on the demo site](https://bjohnson-minutes.herokuapp.com/). To Login, please use the username `demo` and the password `demo`.

## Usage

#### Run the stopwatch

![New timer](http://i.imgur.com/wcvlq7I.png)

Click 'New' to get a new zeroed-out timer. It's not gonna start right away, so click 'Start' and you're off! Go solve that Rubik's cube now (or at least google 'How to solve a Rubik's cube...').

#### Save your time

![Save time](http://i.imgur.com/r356Wkm.png)

Congratulations! You just finished whatever it was you were doing, you've stopped the timer, and you want to add a note about what you were doing before you forget. Click 'Save' and add a title/description to your time. It's really that easy.

#### View your times

![View Times 1](http://i.imgur.com/XK3y7xR.png)
![View Times 2](http://i.imgur.com/he7KEJQ.png)
![View Times 3](http://i.imgur.com/he7KEJQ.png)

You can view, edit, and delete any of your previous times in the 'My Times' dashboard. Each time is presented as its own card to allow for a fully responsive layout.

## Installation

1. Clone the repository

```bash
$ git clone https://github.com/benjaminj6/minutes.git
Cloning into 'minutes'...
remote: Counting objects: 1867, done.
remote: Compressing objects: 100% (70/70), done.
remote: Total 1867 (delta 31), reused 0 (delta 0), pack-reused 1797
Receiving objects: 100% (1867/1867), 5.51 MiB | 150.00 KiB/s, done.
Resolving deltas: 100% (996/996), done.
```

2. Install dependencies
```bash
$ npm install
```

3. Check your node version

_Minutes_ only runs on stable **LTS** versions of Node. Run `node --version` and make sure that you are running version `6.x.x` of Node. If you try to start the server in a later version your server _will_ crash!

4. Make sure you have a MongoDB instance running

_Minutes_ requires MongoDB for all of it's database calls. Make sure that you are running a MongoDB instance in another terminal. If you are currently running MongodDB, you can do so via the `mongod` command. To learn more about MongoDB, [please see their documentation](https://docs.mongodb.com/manual/).

5. Start the server!

```bash
$ npm run dev
```

This command will build the client side code and spin up a server, all in one command! Both the client and the server will be file-watching and restart/rebundle on any changes, so you don't even have to think about whether those changes you made got implemented!

## Technology Used

[Node.js](http://nodejs.org/)
[Express.js](http://expressjs.com)
[MongoDB](https://docs.mongodb.com/manual/)
[jQuery](https://api.jquery.com/)
[Webpack](https://webpack.github.io/docs/)
[Mocha](https://mochajs.org/)
