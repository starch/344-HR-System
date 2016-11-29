/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	makeAdmin: function (req, res) {
		User.findOne({id:req.session.passport.user})
      .exec(function findOneUserCB(err, user){
        if (!err) {
        	user.type = 'admin';
            //finish updating event
            user.save(function(err,updatedUser){
              if(err){
                console.log(err);
              } else {
                req.flash('success', 'Success.User.Update');
                res.redirect('/admin');
              }
            });
        } else {
          console.log(err);
          res.status(404);
        }
      });
	},

	index: function (req, res) {
		User.findOne({id:req.session.passport.user}).exec(function findOneUserCB(err, user){
      	if (!err) {
			res.view('admin', {
				user: user,
				errors: err,
			});
		} else {
			res.status(403);
		}
	});
	},

	students: function (req, res) {
		User.findOne({id:req.session.passport.user}).exec(function findOneUserCB(err, user){
			var http = require('http');

			var options = {
		      hostname: 'vm344e.se.rit.edu',
		      port: 80,
		      path: '/api/User.php?action=get_all_users',
		      method: 'GET',
		      //headers: {'Authorization': 'Basic ' + 'SuperSecretLoginAndPassword'}
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
		        // response available as `responseData` in `yourview`
		        res.locals.requestData = JSON.parse(responseData);
		      } catch (e) {
		        sails.log.warn('Could not parse response from options.hostname: ' + e);
		      }

		      res.view('students', {
		      	responseData: res.locals.requestData,
		      	user: user,
		      	errors: err,
		      });
		    });
		  }).end();
		});
	},

	employees: function (req, res) {
		User.findOne({id:req.session.passport.user}).exec(function findOneUserCB(err, user){
			// Get list of employees
			User.find({type: 'standard', isTerminated: false}).exec(function (err, employees) {
				res.view('employees', {
		      	employees: employees,
		      	user: user,
		      	errors: err,
		      });
			}); 
		});
	},

	terminate: function (req, res) {
		User.findOne({id:req.session.passport.user}).exec(function findOneUserCB(err, user){
			// Get user for termination request
			User.findOneById(req.param('id')).exec(function(err, user){
				sails.log(user);
				res.view('terminate',{ user: user });
			});
		});
	},

	terminateSave: function (req, res) {
		User.update({id:req.param('id')},{isTerminated: true}).exec(function(err, updatedUser){
			if (err) {
				console.log(err);
			} else {
				// Saved!
				req.flash('success', 'Employee was successfully terminated.');
				return res.redirect('/employees');
			}
		});
	},

	testGetUserById: function (req, res) {
		CentralDatabaseService.getUserById(1, function(error, response) {
			res.view('testGetUserById', {
		    userInfo: response,
				error: error
			});
		});
	},

	testGetUserByEmail: function (req, res) {
		CentralDatabaseService.getUserByEmail('brian@team2.com', function(error, response) {
			res.view('testGetUserByEmail', {
		    userInfo: response,
				error: error
			});
		});
	}
};

