module.exports = function(apiURL) {
  $('.logout').click(function(ev) {
    ev.preventDefault();
    let url = `${apiURL}user/logout`;

    $.get(url)
      .done(() => {
        window.location = API_URL;
      });
  });
};
