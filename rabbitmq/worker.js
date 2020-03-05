#!/usr/bin/env node
const QUEUE = "delete"

var amqp = require('amqplib/callback_api');
const { deleteUserSegments } = require('../dbs/mongo').handlers
const { deleteUserStories } =  require('../dbs/postgres').handlers
const { setUserDeletionDone } = require('../dbs/redis')

function deleteUserDetails(msg, channel) {
    const userId = msg.content.toString();
    console.log(" Deleteing user: %s", userId);
    deleteUserStories(userId)
        .then(deleteUserSegments(userId))
        .then(setUserDeletionDone(userId))
        .then(() => {
            channel.ack(msg)
            console.log('Deleteion done.')
        })
}

amqp.connect('amqp://localhost', function(error, connection) {
    if (!connection) {
        throw Error('Failed to connect to RabbitMQ')
    }
    connection.createChannel(function(error, channel) {
        channel.assertQueue(QUEUE, {
            durable: true
        });
        console.log("Waiting for messages in %s.", QUEUE);
        channel.consume(QUEUE, function(msg) {
            // Setting timeout to simulate busy queue
            setTimeout(() => deleteUserDetails(msg, channel), 10000)
        }, {
            noAck: false
        });
    });
});