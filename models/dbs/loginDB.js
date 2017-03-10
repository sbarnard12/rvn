var mongoose = require('mongoose'),
  db;

db = mongoose.createConnection('mongodb://db_admin:DBAdmin1@ds127260.mlab.com:27260/userlogins');

db.on('error', function(err){
  if(err) throw err;
});

db.once('open', function callback () {
  console.info('Mongo db connected successfully');
});

module.exports = db;