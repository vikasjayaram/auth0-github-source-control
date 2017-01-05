function login(username, password, callback) {

  var request = require('request');

  // DEBUG ONLY
  console.log('@@@ login - start @@@');
  console.log('username: ' + username);
  console.log('password: ' + password);

  username = username || '';

  var body, IDP_ENDPOINT;
  
  if (/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(username)) {

    IDP_ENDPOINT = configuration.ENDPOINT_LOCAL + "/api/v1/loginByEmail";


    body = {
      email: username,
      password: password
    };

  } else {

    IDP_ENDPOINT = configuration.ENDPOINT_LOCAL + "/api/v1/loginByEmployeeId";

    var params, employee_id, company_code;

    try {

      params = JSON.parse(username);
      employee_id = params.employee_id;
      company_code = params.company_code;

    } catch (e) {
      console.error(e);
      return callback('Unable to parse username: ' + username);
    }

    body = {
      employee_id: employee_id,
      company_code: company_code,
      password: password
    };

  }

  console.log(IDP_ENDPOINT);

  var options = {
    method: 'POST',
    url: IDP_ENDPOINT,
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
    body: body,
    json: true
  };

  request(options, function (error, response, body) {
    if (error) {
      throw new Error(error);
    }
     if (response.statusCode != 200 && response.statusCode != 201) {
      return callback(new Error('Wrong Username / Password'));
    }
    console.log(body);
    var user = body;
    // var user = JSON.parse(body);
    console.log('@@@ login - end @@@');

    callback(null, {
      user_id: user.id,
      nickname: user.nickname,
      email: user.email,
      //email_verified: user.email_verified == 'true' ? true : false,
      user_metadata: {
        employee_id: user.employee_id,
        company_code: user.company_code
      }
    });

  });
}
