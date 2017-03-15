var db = require('../dbs/potentialMatchesDB'),
    potentialMatchesModel = db.model('PotentialMatches');
var db2 = require('../dbs/usersDB'),
    usersModel = db2.model('User');
var db3 = require('../dbs/taskListdb'),
    tasklistModel = db3.model('Tasklist');


var getAllInterested = function(req, res, next){
    potentialMatchesModel.find({taskID: req.params.id})
        .then(function(potentialMatches){
            //also get some info from the task details
            tasklistModel.findOne({_id: req.params.id})
                .then(function(task){
                    res.render('potentialMatchesView', {potentialMatches: potentialMatches, task: task});
                })
        })
};


module.exports = {
    getAllInterested: getAllInterested,
}