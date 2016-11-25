var mongoose = require('mongoose'),
  db5;

db5 = mongoose.createConnection('mongodb://localhost/reviews');

db5.on('error', function(err){
  if(err) throw err;
});

db5.once('open', function callback () {
  console.info('Mongo db connected successfully');
});

module.exports = db5;