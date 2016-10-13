let Router = {};

Router.login = (request) => {
  return $.post({
    url: `${API_URL}user/login`,
    data: request,
    dataType: 'json'
  });

    
    // .done(() => {
    //   window.location = `${API_URL}dashboard`;
    // });
};

module.exports = Router;