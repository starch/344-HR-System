/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
  * 'ProfileController.index()'
  */
  myProfile: function (req, res) {
    User.findOne({id:req.session.passport.user}).exec(function findOneUserCB(err, user){
      if (!err) {
        // If the account is not linked redirect to the linking page
        if (!user.isLinked) {
          res.redirect('/profile/create');
        } else {
          res.view('profile', {
            // Assign variables here
            user: user
          });
        }
      } else {
        res.status(404);
      }
    });
  },

  /**
   * `ProfileController.edit()`
   */
  edit: function (req, res) {
    User.findOne({id:req.session.passport.user}).exec(function findOneUserCB(err, user){
      if (!err) {
        res.view('edit', {
          user: user,
          errors: err
        });
      } else {
        res.status(404);
      }
    });
  },

  /**
  * ProfileController.save()
  */
  save: function (req, res) {
      User.findOne({id:req.session.passport.user})
      .exec(function findOneUserCB(err, user){
        if (!err) {
          if (req.body.dateOfBirth) {
            var userValidationRes = UserValidationService.validateUserDateOfBirth(user, req.body.dateOfBirth);
            //throw any validation errors found
            if(!userValidationRes.isValid){
                
                //return view with error message
                req.flash('error', userValidationRes.err);
                console.log(userValidationRes.err);
                return res.view('edit',{
                    actionTitle: 'Edit',
                    action: 'edit',
                    user: user,
                    errors: req.flash('error')
                });
            } else {
              user.dateOfBirth = req.body.dateOfBirth;
            }
          }

          if (req.body.address) {
             user.address = req.param('address');
          }

          if (req.body.position) {
             user.position = req.param('position');
          }

          //finish updating user
          user.save(function(err,updatedUser){
            if(err){
              console.log(err);
            } else {
              req.flash('success', 'Success.User.Update');
              res.redirect('/profile');
            }
          });
          
        } else {
          console.log(err);
          res.status(404);
        }
      });
  },

  createUser: function(req, res) {
        res.view('createUser', {
            apiName: 'createUser',
            fields: ['email'],
            submitTarget: req.path,
            submitMethod: 'post'
        });
    },

    createUserSubmit: function(req, res) {
        var firstname = req.param('firstname');
        var lastname = req.param('lastname');
        var type = req.param('type');
        var email = req.param('email');
        var authtoken = req.param('authtoken');
        var id = req.param('id');

        CentralDatabaseService.createUser(email, type, firstname, lastname, authtoken, function(error, response) {
            if (error)
            {
                res.send('error');
                res.end();
            }
            else
            {
              User.findOne({id:req.session.passport.user}).exec(function findOneUserCB(err, user){
                user.isLinked = 1;
                user.type = req.param('type');
                if (user.type == 'Student') {
                  user.position = 'Student';
                  user.salary = 0;
                } else if (user.type == 'Employee') {
                  user.position = 'Adjunct Professor';
                  user.salary = 43990;
                } else if (user.type == 'admin') {
                  user.position = 'Administrator';
                  user.salary = 53990;
                } else if (user.type == 'Network Administrator') {
                  user.position = 'Network Administrator';
                  user.salary = 93460;
                }

                user.save(function(err,updatedUser){
                  if(err){
                    console.log(err);
                  } else {
                    // TODO: Call CentralDBService and create user
                    req.flash('success', 'Success.User.Update');
                    res.redirect('/profile');
                  }
                });
              });
            }
        });
    },

};

