const http = require('http')

// The specific first name that will be used in the listing test
var specific_first_name = 'cristina';

// The random generated ID that will be used in the retrieving test
var specific_id = String(Math.floor(Math.random() * 50));

// HTTP options for the listing test: all users should be listed
const options_get_all_users = {
  hostname: 'localhost',
  port: 3000,
  path: '/users',
  method: 'GET'
};

// HTTP options for the listing test with specified first name: the users with first name = specific_first_name should be listed
const options_get_specific_user = {
  hostname: 'localhost',
  port: 3000,
  path: '/users?first_name=' + specific_first_name,
  method: 'GET'
};

// HTTP options for the retrieving test: the user with row id = specific_id should be returned
const options_get_user_id = {
  hostname: 'localhost',
  port: 3000,
  path: '/user/' + specific_id,
  method: 'GET'
};

// HTTP options for the creation test: a random user should be added to the database
const options_post_user = {
  hostname: 'localhost',
  port: 3000,
  path: '/user',
  method: 'POST'
};

// HTTP request for the listing test
const req1 = http.request(options_get_all_users, res => {
  res.on('data', d => {
	console.log("\n");
	console.log("Testing GET /users:");
    process.stdout.write(d);
	console.log("\n");
  });
});
req1.on('error', error => {
  console.log("\n");
  console.log("ERROR while testing GET /users");
  console.error(error);
  console.log("\n");
});
req1.end();

// HTTP request for the listing test with specified first name
const req2 = http.request(options_get_specific_user, res => {
  res.on('data', d => {
	console.log("\n");
	console.log("Testing GET /users with first name " + specific_first_name);
    process.stdout.write(d);
    console.log("\n");
  });
});
req2.on('error', error => {
  console.log("\n");
  console.log("ERROR while testing GET /users with first name " + specific_first_name);
  console.error(error);
  console.log("\n");
});
req2.end();

// HTTP request for the retrieving test
const req3 = http.request(options_get_user_id, res => {
  res.on('data', d => {
	console.log("\n");
	console.log("Testing GET /user/id with id = " + specific_id);
    process.stdout.write(d);
    console.log("\n");
  });
});
req3.on('error', error => {
  console.log("\n");
  console.log("ERROR while testing GET /user/id with id = " + specific_id);
  console.error(error);
  console.log("\n");
});
req3.end();

// HTTP request for the creation test
const req4 = http.request(options_post_user, res => {
  console.log("\n");
  console.log("POST /user test finished: created random user");
  console.log("\n");
});
req4.on('error', error => {
  console.log("\n");
  console.log("ERROR while testing GET /user/id with id = " + specific_id);
  console.error(error);
  console.log("\n");
});
req4.end();