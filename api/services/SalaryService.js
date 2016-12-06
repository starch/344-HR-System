var http = require('http');

function updateSalary(positionStr, callback) {
     var newSalary = -1;
     var options = {
               hostname: 'api.bls.gov',
               port: 80,
               path: '/publicAPI/v2/timeseries/data/' + positionStr,
               method: 'GET',
          };

          http.request(options, function(response) {
               var responseData = '';
               response.setEncoding('utf8');

               response.on('data', function(chunk){
                    responseData += chunk;
               });

               response.once('error', function(err){
                 // Some error handling here, e.g.:
                 res.serverError(err);
               });

               response.on('end', function(){
                    try {
                         var requestData = JSON.parse(responseData);
                         sails.log(requestData);
                         newSalary = requestData["Results"]["series"][0]["data"][0].value;
                         sails.log("API Call: " + newSalary);
                         callback(null, newSalary);
                    } catch (e) {
                         sails.log.warn('Could not parse response from options.hostname: ' + e);
                         callback(e, -1);
                    }
               });
          }).end();
}

module.exports = {

     getSalary: function(positionStr, callback) {
          updateSalary(positionStr, callback);
     },

}
