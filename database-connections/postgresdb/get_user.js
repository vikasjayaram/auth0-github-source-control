function getByEmail(email, callback) {

  var request = require('request');

  // DEBUG ONLY
  console.log('@@@ get_user - start @@@');
  console.log('email: ' + email);

  var IDP_ENDPOINT = configuration.ENDPOINT_LOCAL + "/api/v1/account";

  request.get({
    url: IDP_ENDPOINT + '?email=' + email
  }, function (err, response, body) {
      console.log('GETUSER: Response status code: ' + response.statusCode);
      if (err) {
        return callback(err);
      }
      if (response.statusCode != 200) {
        return callback(new Error('Forbidden'));
      }
      console.log(body);
      console.log('@@@ get_user - end @@@');
      callback(null, JSON.parse(body));
  });
}
