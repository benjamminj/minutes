module.exports = {
  timeInSeconds: 0,
  isRunning: false,
  reset() {
    this.timeInSeconds = 0;
    this.isRunning = false;
    this.end();
  },
  start(callback) {
    if (!this.isRunning) {
      this.isRunning = true;
      this.intervalID = setInterval(function() {
        this.timeInSeconds += 1;
        callback(this.timeInSeconds);
      }.bind(this), 1000);
    }
  },
  stop() {
    this.isRunning = false;
    clearInterval(this.intervalID);
  },
  end() {
    this.stop();
    return this.timeInSeconds;
  }
};