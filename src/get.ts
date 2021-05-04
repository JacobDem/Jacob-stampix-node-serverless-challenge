const sqlite3 = require('sqlite3');
const path = require('path');

const dbFile = path.join(__dirname, '../src/db.sqlite');

// Handler function
exports.handler = (event, context, callback) => {
	
	// Retrieve user ID
	var user_id = event['pathParameters']['id'];
	const db = new sqlite3.Database(dbFile);
	
	var users;
	
	// Return user with row ID = user_id
    db.all("SELECT first_name,last_name,email FROM user WHERE rowid = " + String(user_id), (err, rows) => {
        if (err) {
            callback(err);
        }
			users = rows.map(row => row.first_name + ' ' + row.last_name + ' (' + row.email + ')');
		callback(null, JSON.stringify(users));
    });
	
	db.close();
}