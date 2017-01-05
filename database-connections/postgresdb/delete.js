function remove (id, callback) {

  var request = require('request');

  // DEBUG ONLY
  console.log('@@@ remove - start @@@');
  console.log('id: ' + id);
  var IDP_ENDPOINT = configuration.ENDPOINT_LOCAL + "/api/v1/remove/account/";

  request.del({
    url: IDP_ENDPOINT + id
  }, function (err, response, body) {
      console.log('remove: Response status code: ' + response.statusCode);
      if (err) {
        return callback(err);
      }
      console.log('@@@ remove - end @@@');
      callback(null);
  });
}
