const sqlite3 = require('sqlite3');
const path = require('path');
const faker = require('faker');

const dbFile = path.join(__dirname, '../src/db.sqlite');

// Handler function
exports.handler = (event, context, callback) => {
	const db = new sqlite3.Database(dbFile);
	
	var valid_parameters = true;
	var parameters = [];
	
	// If the query parameters are not empty, try to match the needed parameters to the given parameters
	if(event['queryStringParameters'] != null){
		parameters.push(event['queryStringParameters']['gender']);
		parameters.push(event['queryStringParameters']['first_name']);
		parameters.push(event['queryStringParameters']['last_name']);
		parameters.push(event['queryStringParameters']['email']);
		parameters.push(event['queryStringParameters']['phone_number']);
		parameters.push(event['queryStringParameters']['date_of_birth']);
		parameters.push(event['queryStringParameters']['language']);
		
		// If the given parameters do not match, or if not all parameters are given, valid_parameters = false
		for(let i = 0; i < parameters.length; i++){
			if(parameters[i] == null){
				valid_parameters = false;
			}
		}
	}
	else{
		valid_parameters = false;
	}
	
	// If all needed parameters were given, add a users with these parameters
	if(valid_parameters){
		db.run(
			"INSERT INTO user (gender, first_name, last_name, email, phone_number, date_of_birth, language) VALUES ('" + 
			parameters[0] + "','" + 
			parameters[1] + "','" + 
			parameters[2] + "','" + 
			parameters[3] + "','" + 
			parameters[4] + "','" + 
			parameters[5] + "','" + 
			parameters[6] + "');"
		);
	}
	
	// If all needed parameters were given, add a random user (useful for testing)
	else {
		db.run(
			"INSERT INTO user (gender, first_name, last_name, email, phone_number, date_of_birth, language) VALUES ('" + 
			faker.random.arrayElement(['male', 'female', 'other']) + "','" + 
			faker.name.firstName() + "','" + 
			faker.name.lastName() + "','" + 
			faker.internet.email() + "','" + 
			faker.phone.phoneNumber() + "','" + 
			faker.date.past() + "','" + 
			faker.random.arrayElement(['en', 'nl', 'fr']) + "');"
		);
	}
	
	db.close();
	callback(null,null);
}