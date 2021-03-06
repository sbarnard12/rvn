var mongoose = require('mongoose'),
  db1;

db1 = mongoose.createConnection('mongodb://db_admin:DBAdmin1@ds127190.mlab.com:27190/tasklists');

db1.on('error', function(err){
  if(err) throw err;
});

db1.once('open', function callback () {
  console.info('Mongo db tasklist connected successfully');
});

module.exports = db1;