var mongoose = require('mongoose'),
  db4;

db4 = mongoose.createConnection('mongodb://db_admin:DBAdmin1@ds127190.mlab.com:27190/users');

db4.on('error', function(err){
  if(err) throw err;
});

db4.once('open', function callback () {
  console.info('Mongo db connected successfully');
});

module.exports = db4;