function changePassword (email, newPassword, callback) {

  var request = require('request');

  // DEBUG ONLY
  console.log('@@@ changePassword - start @@@');
  console.log('email: ' + email);
  console.log('newPassword: ' + newPassword);

  var API_ENDPOINT = configuration.ENDPOINT_LOCAL + "/api/v1/change_password/account";


  request.post({
    url: API_ENDPOINT,
    json: {
      email: email,
      new_password: newPassword
    }
  }, function (err, response, body) {
    console.log('CHANGEPASSWORD: Response status code: ' + response.statusCode);
    if (err) {
      return callback(err);
    }
    if (response.statusCode != 200 && response.statusCode != 201) {
      return callback(new Error('Forbidden'));
    }
    console.log('@@@ CHANGEPASSWORD - end @@@');
    callback(null, true);
  });
}
