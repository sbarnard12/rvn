var mongoose = require('mongoose'),
    db;

db = mongoose.createConnection('mongodb://db_admin:DBAdmin1@ds127300.mlab.com:27300/potentialmatches');

db.on('error', function(err){
    if(err) throw err;
});

db.once('open', function callback () {
    console.info('Mongo db matches connected successfully');
});


module.exports = db;