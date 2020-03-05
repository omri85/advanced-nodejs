var amqp = require('amqplib');
const QUEUE = "delete"

const open = amqp.connect('amqp://localhost')

async function getChannel() {
    const conn = await open;
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE)
    return channel
}

const publish = async (msg) => {
    const channel = await getChannel();
    await channel.sendToQueue(QUEUE, Buffer.from(msg));
    console.log("Send message to queue")
}

module.exports = publish