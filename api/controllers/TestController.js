module.exports = {

    getAllUsers: function(req, res) {
        CentralDatabaseService.getAllUsers(function(error, response) {
            if (error)
            {
                res.send('error');
                res.end();
            }
            else
            {
                var expectedData = [
                    { jsonName: 'UserID', displayName: 'ID' },
                    { jsonName: 'Firstname', displayName: 'First Name' },
                    { jsonName: 'Lastname', displayName: 'Last Name' },
                    { jsonName: 'Email', displayName: 'Email' },
                    { jsonName: 'Type', displayName: 'Type' },
                    { jsonName: 'AuthToken', displayName: 'Auth Token' }
                ];

                res.view('test/apiResponseTable', {
                    apiName: 'getAllUsers',
                    columns: expectedData,
                    rows: response
                });
            }
        });
    },

    getUserByIdForm: function(req, res) {
        res.view('test/apiRequestForm', {
            apiName: 'getUserById',
            fields: ['id'],
            submitTarget: req.path,
            submitMethod: 'post'
        });
    },

    getUserByIdSubmit: function(req, res) {
        var id = req.param('id');

        CentralDatabaseService.getUserById(id, function(error, response) {
            if (error)
            {
                res.send('error');
                res.end();
            }
            else
            {
                var expectedData = [
                    { jsonName: 'Firstname', displayName: 'First Name' },
                    { jsonName: 'Lastname', displayName: 'Last Name' },
                    { jsonName: 'Email', displayName: 'Email' },
                    { jsonName: 'Type', displayName: 'Type' },
                    { jsonName: 'AuthToken', displayName: 'Auth Token' }
                ];

                res.view('test/apiResponseTable', {
                    apiName: 'getUserById',
                    columns: expectedData,
                    rows: response
                });
            }
        });
    },

    getUserByEmailForm: function(req, res) {
        res.view('test/apiRequestForm', {
            apiName: 'getUserByEmail',
            fields: ['email'],
            submitTarget: req.path,
            submitMethod: 'post'
        });
    },

	getUserByEmailSubmit: function (req, res) {
        var email = req.param('email');

        CentralDatabaseService.getUserByEmail(email, function(error, response) {
            if (error)
            {
                res.send('error');
                res.end();
            }
            else
            {
                var expectedData = [
                    { jsonName: 'Firstname', displayName: 'First Name' },
                    { jsonName: 'Lastname', displayName: 'Last Name' },
                    { jsonName: 'Email', displayName: 'Email' },
                    { jsonName: 'Type', displayName: 'Type' },
                    { jsonName: 'AuthToken', displayName: 'Auth Token' }
                ];

                res.view('test/apiResponseTable', {
                    apiName: 'getUserByEmail',
                    columns: expectedData,
                    rows: response
                });
            }
        });
	},

    createUserForm: function(req, res) {
        res.view('test/apiRequestForm', {
            apiName: 'createUser',
            fields: ['firstname','lastname','type','email','authtoken'],
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

        CentralDatabaseService.createUser(email, type, firstname, lastname, authtoken, function(error, response) {
            if (error)
            {
                res.send('error');
                res.end();
            }
            else
            {
                res.view('test/apiResponseJson', {
                    apiName: 'createUser',
                    json: JSON.stringify(response)
                });
            }
        });
    },

    updateUserForm: function(req, res) {
        res.view('test/apiRequestForm', {
            apiName: 'updateUser',
            fields: ['id','firstname','lastname','type','email','authtoken'],
            submitTarget: req.path,
            submitMethod: 'post'
        });
    },

    updateUserSubmit: function(req, res) {
        var id = req.param('id');
        var firstname = req.param('firstname');
        var lastname = req.param('lastname');
        var type = req.param('type');
        var email = req.param('email');
        var authtoken = req.param('authtoken');

        var updateValues = new Object();
        if (firstname) updateValues.firstname = firstname;
        if (lastname) updateValues.lastname = lastname;
        if (email) updateValues.email = email;
        if (type) updateValues.type = type;
        if (authtoken) updateValues.authtoken = authtoken;

        CentralDatabaseService.updateUser(id, updateValues, function(error, response) {
            if (error)
            {
                res.send('error');
                res.end();
            }
            else
            {
                res.view('test/apiResponseJson', {
                    apiName: 'updateUser',
                    json: JSON.stringify(response)
                });
            }
        });
    },    

};