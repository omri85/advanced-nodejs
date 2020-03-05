const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('./middlewares/error-handler'),
    forbiddenTermsHandler = require('./middlewares/forbidden-terms-validator')

const port = 3000

// Connectin to the DBs
require('./dbs/postgres')
require('./dbs/mongo')

// Starting up the user deletion worker
require('./rabbitmq/worker')

app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(forbiddenTermsHandler);
app.use(require('./routes'));

// just to see the middleware in action
app.get('/error', (req, res) => {throw new Error('test')})

app.get('/', (req, res) => res.send("Welcome to StoryTeller!"))

app.use(errorHandler)

app.listen(port, () => console.log(`StoryTeller API is up and listening on port ${port}!`))

module.exports = app