var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    userId     : { type: 'integer',  unique: true, required: true },
    firstName : { type: 'string' },
    lastName  : { type: 'string' },
    gender  : { type: 'string' },
    address   : { type: 'string' },
    image     : { type: 'string' },
    passports : { collection: 'Passport', via: 'user' }
  }
};

module.exports = User;
