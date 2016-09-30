module.exports = {
	  timeInSeconds: 0,
	  isRunning: false,
	  reset() {
	    this.timeInSeconds = 0;
	    this.isRunning = false;
	  },
	  start(fn) {
	    if (!this.isRunning) {
	      this.isRunning = true;
	      this.intervalID = setInterval(function() {
	        this.timeInSeconds += 1;
	        fn(this.timeInSeconds);
	      }.bind(this), 1000);
	    }
	  },
	  pause() {
	    this.isRunning = false;
	    clearInterval(this.intervalID);
	  },
	  stop() {
	    this.pause();
	    let finalTime = this.timeInSeconds;

	    this.reset();
	    return finalTime;
	  }
};