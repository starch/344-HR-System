var request = require('request');

var apiRoot = 'http://vm344e.se.rit.edu/api/';

function callApi(method, relPath, action, parameters, callback) {
    var options = {
        method: method,
        baseUrl: apiRoot,
        url: relPath,
        qs: {
            action: action
        }
    };

    for (var paramName in parameters)
    {
        options.qs[paramName] = parameters[paramName];
    }

    // console.log(options.qs);

    request(options, function(error, response, body) {
        if (error)
            callback(error, null);
        else
            callback(null, JSON.parse(body));
    });
}

module.exports = {

    getUserById: function(id, callback) {
        callApi('GET', 'User.php', 'get_user_by_id', { id: id }, callback);
    },

    getUserByEmail: function(email, callback) {
        callApi('GET', 'User.php', 'get_user_by_email', { email: email }, callback );
    }
}