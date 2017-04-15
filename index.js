var mongo = require('mongodb');
var mc = mongo.MongoClient;

var url = 'mongodb://localhost:27017/test';

mc.connect(url, function(err, db){

	if(err){
		console.log("unable to access database on " + url);
	}
	var emails = db.collection('enron');
	emails.count(function(err, count){
		console.log("Number of emails in collection: " + count);
		db.close();
	});
	// emails.find({})
	emails.find({}).sort([['date', 1]]).limit(1).toArray(function(err,docs){
		console.log("\n \nHere is the earliest dated email in the collection: \n");
		console.log(docs)
		db.close();
	});
});
