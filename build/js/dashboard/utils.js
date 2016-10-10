module.exports = function(rootURL) {
  return {
    getValue(selector) {
      return $(selector).val();
    },

    emptyForm(formElements) {
      formElements.forEach(function(element) {
        $(element).val('');
      });
    },

    redirectToLogin(location) {
      window.location = location || rootURL;
    },

    addLeadingZeroes(number) {
      return ('0' + number).slice(-2);
    },

    toggleNav($button) {
      if (!$button.hasClass('current')) {
        $button.toggleClass('current').siblings().toggleClass('current');
      }
    }
  };
};