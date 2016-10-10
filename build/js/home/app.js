let swapClasses = require('../utils/swap.classes');

module.exports = () => {
  $(document).ready(() => {
    console.log('Hey there')

    $('.menu-icon').click(function() {
      let $this = $(this);

      swapClasses($this.children('i'), 'fa-times', 'fa-bars');
      $this.siblings('nav').toggleClass('collapsed');
    });
  });
};