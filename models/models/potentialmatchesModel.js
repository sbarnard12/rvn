//Model for the Database potential matches

//initialize mongoose ODM
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var potentialMatchesSchema = new Schema ({
    taskID: {type: Schema.Types.ObjectId, required:true},
    ownerID: {type: Schema.Types.ObjectId, required:true},
    interestedUserID: {type: Schema.Types.ObjectId, required:true},
    description: {type: String},
});

var PotentialMatches = mongoose.model('PotentialMatches', potentialMatchesSchema);

module.exports = PotentialMatches;
