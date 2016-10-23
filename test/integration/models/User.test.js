describe('User', function() {
  describe('#Create()', function() {
    it('should create without error', function(done) {
      User.create({userId:'0', firstName:'test',lastName:'user',}).exec(function (err, user){
        console.log('Created new testUser');
        done();
      });
    });
  });

  describe('#find()', function() {
    it('should find without error', function(done) {
      User.findOne({userId:'0'}).exec(function findOneUserCB(err, user){
        console.log('Found testUser');
        done();
      });
    });
  });

  describe('#save()', function() {
    it('should save without error', function(done) {
      User.findOne({userId:'0'}).exec(function findOneUserCB(err, user){
        user.position = "Professor";
        user.salary = 1;
        user.save(function(err){
          console.log('Updated testUser');
          done();
        });
      });
    });
  });

  describe('#delete()', function() {
    it('should delete without error', function(done) {
      User.destroy({userId:'0'}).exec(function deleteCB(err){
        console.log('Deleted testUser');
        done();
      });
    });
  });
});