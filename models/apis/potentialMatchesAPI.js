var db = require('../dbs/potentialMatchesDB'),
    potentialMatchesModel = db.model('PotentialMatches');
var db2 = require('../dbs/usersDB'),
    usersModel = db2.model('User');


var getAllInterested = function(req, res, next){
    potentialMatchesModel.find({taskID: req.params.id})
        .then(function(potentialMatches){
            res.render('potentialMatchesView', {potentialMatches: potentialMatches});
        })
}


module.exports = {
    getAllInterested: getAllInterested,
}