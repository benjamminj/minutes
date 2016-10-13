module.exports = function($element, firstHTML, secondHTML) {
  let html = $element.html();

  if (html === firstHTML) {
    $element.html(secondHTML);
  } else {
    $element.html(firstHTML);
  }
};