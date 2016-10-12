let swapIcons = require('../utils/swap.html');

module.exports = () => {
  $(document).ready(() => {

    $('.menu-icon').click(function() {
      let $this = $(this);
      swapIcons($this.children('i'), 'menu', 'close');
      // swapClasses($this.children('i'), 'fa-times', 'fa-bars');
      $this.siblings('nav').toggleClass('collapsed');
    });
  });
};
