var mongoose = require('mongoose'),
  db5;

db5 = mongoose.createConnection('mongodb://db_admin:DBAdmin1@ds127190.mlab.com:27190/reviews');

db5.on('error', function(err){
  if(err) throw err;
});

db5.once('open', function callback () {
  console.info('Mongo db reviews connected successfully');
});

module.exports = db5;