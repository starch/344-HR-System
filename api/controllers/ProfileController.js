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
        res.view('profile', {
          // Assign variables here
          user: user
        });
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
          }
          
        } else {
          console.log(err);
          res.status(404);
        }
      });
  },

};

