var mongoose = require('mongoose'),
  db;

db = mongoose.createConnection('mongodb://localhost/test');

db.on('error', function(err){
  if(err) throw err;
});

db.once('open', function callback () {
  console.info('Mongo db test connected successfully');
});

module.exports = db;