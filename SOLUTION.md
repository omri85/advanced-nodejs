This is the **StoryTeller** web service.
It's an API based web service that allows creating a story in continuation and sharing it with others.

*Model:*
* Segment - a piece of a story.
* Story - an ordered collection of segments that belong to a user.
* Publication - a collection of stories. Stories and Publication have many to many relation.

*Deleting user details* - When a users asks to remove themselves all of their stories and segments are removed. This operation must be completed within 24 hours and a user can get the deletion status.

### Components: ###

*Databases*
1. `Postgres` for the users, stories and publications, used with `Sequelize` ORM.
2. `MongoDB` for the segments to support text search and high scale, used with `mongoose`.
3. `Redis` to save the status of the deletion operation.

*AMQP*
* `Rabbitmq` for the asynchronous user deletion operation.

*Tests* (for selected endpoints and models)
1. Integration tests using `chai-http`
2. Unit-tests using `mocha` and `mock-sequelize`

*Additional advanced course concepts*
* Middlewares - check-bad-words and global error handler
* Custom errors
* JS 'this'
* Views engine and rendering
* expressjs routing
* npm and package.json
* Classes (Error)

### How to setup the project ###
1. Install locally and run the databases servers: mongodb, postgres and redis
2. On postgres DB create a user `storyteller` with password `123` and a DB `storyteller`. Grant the user with admin permissions the for DB.
3. run `npm install`
4. run `npm start`