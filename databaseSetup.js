db.createCollection( "taskList",
	{
		validator: { $or:
			[
				{category: {$type: "int"}},
				{requesting:  {$type: "string"}},
				{offering:  {$type: "string"}},
				{description:  {$type: "string"}},
				{usePosterAddress:  {$type: "bool"}},
				{modeofContact:  {$type: "int"}},
				{pictureUrl:  {$type: "string"}},
				{posterID:  {$type: "objectId"}},
				{matchedUserID:  {$type: "objectId"}},			
			]
		}
	});

db.createCollection( "users",
	{
		validator: { $or:
			[
				{title: {$type: "int"}},
				{firstName: {$type: "string"}},
				{lastName: {$type: "string"}},
				{gender: {$type: "int"}},
				{birthDate: {$type: "date"}},
				{email: {$type: "string"}},
				{contactNumber: {$type: "int"}},
				{preferredContact: {$type: "int"}},
				{userLoginID: {$type: "objectId"}},
				{rating: {$type: "int"}}
			]
		}	
	});

db.createCollection("userLogin",
	{
		validator: { $or: 
			[
				{userName: {$type: "string"}},
				{password: {$type: "string"}}
			]
		}
	});

db.createCollection("interestedUserTask", 
	{
		validator: { $or:
			[
				{posterID: {$type: "objectId"}},
				{interestedUserID: {$type: "objectId"}}
			]
		}

	});

db.createCollection("userReviews", 
	{
		validator: { $or:
			[
				{reviewer: {$type: "objectId"}},
				{reviewee: {$type: "objectId"}},
				{rating: {$type: "int"}},
				{description: {$type: "string"}},
				{private: {$type: "bool"}}
			]
		}
	});

//Insert 2 new users

//Create task, match the two users using proper Object Ids

var latest_id = db.taskList.insert({
		category: 1,
requesting: "request",
offering: "offer",
description: "I want help with a task, and am willing to give back",
usePosterAddress: false,
modeofContact: 1,
pictureUrl: "www.google.com",
posterID: "537eed02ed345b2e039652d2",
matcheduserID: "",
});

db.test.insert({test: latest_id._id});

// get latest id
var latestItem = db.taskList.find({}, {_id: 1}).sort({_id:-1}).limit(1);
latestItem = latestItem.next();
var latest_id = latestItem._id;
