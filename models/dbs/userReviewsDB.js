var mongoose = require('mongoose'),
  db3;

db3 = mongoose.createConnection('mongodb://localhost/userreviews');

db3.on('error', function(err){
  if(err) throw err;
});

db3.once('open', function callback () {
  console.info('Mongo db connected successfully');
});

module.exports = db3;