var mongoose = require('mongoose'),
  db4;

db4 = mongoose.createConnection('localhost', 'users');

db4.on('error', function(err){
  if(err) throw err;
});

db4.once('open', function callback () {
  console.info('Mongo db connected successfully');
});

module.exports = db4;