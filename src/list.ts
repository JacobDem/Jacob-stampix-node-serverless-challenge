const sqlite3 = require('sqlite3');
const path = require('path');

const dbFile = path.join(__dirname, '../src/db.sqlite');

// Handler function
exports.handler = (event, context, callback) => {
	
	// Check for first_name parameter
	var first_name = null;
	if(event['queryStringParameters'] != null && event['queryStringParameters'].hasOwnProperty('first_name')){
		first_name = event['queryStringParameters']['first_name'];
	}
	
	const db = new sqlite3.Database(dbFile);
	var users;
	
	// If no first_name parameter, list all users
	if(first_name == null){
		db.all("SELECT first_name,last_name,email FROM user", (err, rows) => {
			if (err) {
				callback(err);
			}
			users = rows.map(row => row.first_name + ' ' + row.last_name + ' (' + row.email + ')');
			callback(null, JSON.stringify(users));
		});
	}
	
	// If first_name parameter, list users with first name = first_name
	else{
		db.all("SELECT first_name,last_name,email FROM user WHERE LOWER(first_name) = '" + String(first_name).toLowerCase() + "'", (err, rows) => {
			if (err) {
				callback(err);
			}
			users = rows.map(row => row.first_name + ' ' + row.last_name + ' (' + row.email + ')');
			callback(null, JSON.stringify(users));
		});
	}
	
	db.close();
}