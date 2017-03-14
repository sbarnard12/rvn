var mongoose = require('mongoose'),
  db;

db = mongoose.createConnection('mongodb://db_admin:DBAdmin1@ds129090.mlab.com:29090/messagesdb');

db.on('error', function(err){
  if(err) throw err;
});

db.once('open', function callback () {
  console.info('Mongo db messages connected successfully');
});

module.exports = db;