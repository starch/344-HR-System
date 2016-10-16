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
   * `ProfileController.view()`
   */
  view: function (req, res) {
    return res.json({
      todo: 'view() is not implemented yet!'
    });
  },


  /**
   * `ProfileController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  }
};

