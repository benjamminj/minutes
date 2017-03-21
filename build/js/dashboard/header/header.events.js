module.exports = function() {
  $('.logout').click(function(ev) {
    ev.preventDefault();
    let url = `/user/logout`;

    $.get(url)
      .done(() => {
        window.location = '/';
      });
  });
};
