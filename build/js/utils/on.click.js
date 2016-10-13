module.exports = ($selector, child, callback) => {
  $selector.on('click', child, callback);
};