var mongoose = require('mongoose'),
  db1;

db1 = mongoose.createConnection('mongodb://localhost/tasklists');

db1.on('error', function(err){
  if(err) throw err;
});

db1.once('open', function callback () {
  console.info('Mongo db connected successfully');
});

module.exports = db1;