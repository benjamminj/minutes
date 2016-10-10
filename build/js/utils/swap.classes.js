module.exports = ($selector, class1, class2) => {
  $selector.toggleClass(class1);
  $selector.toggleClass(class2);
};