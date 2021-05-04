# Stampix Node.js & Serverless challenge

## Setting
Cloud-based AWS Lambda functions with a Node.js 14 runtime written in TypeScript.

## Goal
This repository contains a populated SQLite database consisting of 50 users. The goal is to create 3 functions, corresponding to 4 operations on the database: creation, retrieving, listing & searching.

The following REST API is set up already for you (see Practical):

1. A list of users: `GET http://localhost:3000/users`
2. Get a specific user: `GET http://localhost:3000/user/{id}`
3. Create a user: `POST http://localhost:3000/user`

Endpoint one should both be able to:

1. List all users
2. Find all users with a specific first name

Endpoint two and three are straight-forward.

## Practical
1. Clone this repo and install the already existing development dependencies.
3. Write your functions according to AWS Lambda standards using the Node.js 14 runtime inside `/src/*.ts`
4. Start the compiler using `yarn watch`, this will pro-actively compile your changes .
5. In another terminal, run a local server using `yarn start`, this will make the local endpoints available.

## Requirements
1. The 3 functions should do what they are supposed to do according to the goals of this challenge.
2. You should add automatic testing and make sure that `yarn test` does what could be expected of it in a CI/CD context.
3. Document your code as you would in any collaborative project

## Food for thought
Think about the following questions and formulate an answer below. Think about the difficulties or edge-cases you would encounter. How would you tackle these?

The number of users suddenly increases to over 10,000. What comes to your mind with relationship to the functionality you just wrote?

Have a look at the datastructure of the database (i.e. have a look at `scripts/populate.js`). Now assume that we are not using SQLite, but MySQL 8. What would you do differently?

Suppose we want to set up a search function for the users where we can search with an arbitrary input value. How would you do this?

Overall, how much time did you spent (approximately) on this challenge?

### Your answers

The number of users suddenly increases to over 10,000. What comes to your mind with relationship to the functionality you just wrote?

	The creation method and retrieving by ID method would normally not really see a change in performance (as the retrieving method is based on row ID), but the listing method would see a clear decrease in speed, as the whole database is scanned every time.
	Also, if the database would increase by a lot, SQLite might not be the best database framework to use anymore, as it is designed for lightweight use.
	
Have a look at the datastructure of the database (i.e. have a look at `scripts/populate.js`). Now assume that we are not using SQLite, but MySQL 8. What would you do differently?

	I would declare the fields of the database with different, more specific datatypes.
	More specifically: gender and language could be a CHAR (because these fields could have fixed lengths), first_name, last_name, email and phone_number could be VARCHARs. date_of_birth would be a DATE and created_at and modified_at could be DATETIMEs.

Suppose we want to set up a search function for the users where we can search with an arbitrary input value. How would you do this?

	We would need to check the datatype of the given input value, and for that datatype we would need to search all columns with corresponding datatype for a match (like in list.ts, but instead of only the first_name column, we would need to check every matching column).

Overall, how much time did you spent (approximately) on this challenge?

	An afternoon and evening, most of the time went to getting everything installed and understanding all the concepts, as a lot of them were foreign to me. When that was clear, the actual code writing was more or less straight-forward.

## Delivery
- Anything that is not enforced in the base repository (tools, dependencies, architecture, frameworks, ...) is free of choice
- Push your solution to your Git platform of choice, as long as it's public.

**Note**: There's no need to actually use the AWS Cloud.
