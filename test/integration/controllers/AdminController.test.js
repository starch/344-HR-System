var request = require('supertest');
var api = request('http://vm344e.se.rit.edu');

describe('AdminController', function() {

	it('Can call central API', function(done) {
		api.get('/api/User.php?action=get_all_users')
			.expect(200, done);
	});
});