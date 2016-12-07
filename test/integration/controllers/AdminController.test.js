var request = require('supertest');
var api = request('http://vm344e.se.rit.edu');

describe('AdminController', function() {
	it('Can call central API', function(done) {
		api.get('/api/User.php?action=get_all_users')
			.expect(200, done);
	});
});

describe('Central API Get All Users', function() {
	it('Can get all users from the central API', function(done) {
		api.get('/api/User.php?action=get_all_users')
			.expect(200, done);
	});
});

describe('Central API Get Users by ID', function() {
	it('Can get an existing user from the central API by ID', function(done) {
		api.get('/api/User.php?action=get_user_by_id&id=1')
			.expect(200, done);
	});
});

describe('Central API Get Users by email', function() {
	it('Can get an existing user from the central API by email', function(done) {
		api.get('/api/User.php?action=get_user_by_email&email=user@example.com')
			.expect(200, done);
	});
});

describe('Central API Get User by GoogleID', function() {
	it('Can get an existing user from the central API by GoogleID', function(done) {
		api.get('/api/User.php?action=get_user_by_googleid&googleid=115888752851898930000')
			.expect(200, done);
	});
});

// Post Tests
// describe('Cemtral API Update', function() {
// 	it('Can update an existing user on the central API', function(done) {
// 		var options = {action: update_user}
// 		var formData = { id: 1, Firstname: 'API TEST'}
// 		api.post('/api/User.php',)
// 	});
// });