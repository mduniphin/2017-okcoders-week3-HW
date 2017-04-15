var mongo = require('mongodb');
var mc = mongo.MongoClient;

var url = 'mongodb://localhost:27017/test';

mc.connect(url, function(err, db){

	if(err){
		console.log("unable to access database on " + url);
	};

	//email collection variable
	var emails = db.collection('enron');

	//prints total number of emails in enron collection
	emails.count(function(err, count){
		if (err) {
        console.log('Error:', err);
     	};
		console.log("\nNumber of emails in collection: " + count);
		db.close();
	});

	//prints earliest dated email in enron collection
	emails.find({}).sort([['date', 1]]).limit(1).toArray(function(err,early){
		if (err) {
        console.log('Error:', err);
     	};
		console.log("\n \nHere is the earliest dated email in the collection: \n");
		console.log(early)
		db.close();
	});

	//prints latest dated email in enron collection
	emails.find({}).sort([['date', -1]]).limit(1).toArray(function(err,late){
		if (err) {
        console.log('Error:', err);
     	};		
		console.log("\n \nHere is the latest dated email in the collection: \n");
		console.log(late)
		db.close();
	});

	//prints total number of emails in enron collection containing 'money' in text
	emails.find({text:/money/}).count(function(err, money) {
		if (err) {
        	console.log('Error:', err);
     	};
		console.log("\n \nNumber of emails that contain the word 'money' in their text: \n");
		console.log(money)
	});

	//prints highest occurring "sender" email address in enron collection and prints count of occurrances
	emails.aggregate([
		{$group:{"_id":"$sender","Emails sent":{$sum:1}}},
		{$sort:{"Emails sent":-1}},
		{$limit:1}
		], function(err, agg) {
			if (err) {
				console.log('Error:', err);
			};
			console.log("\n \nEmail address that sent the most emails in the collection: \n");
			console.log(agg);
	});
});
