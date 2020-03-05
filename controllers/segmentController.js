const url = require('url')

const { getSegmentById, createSegment } = require('../dbs/mongo').handlers;

module.exports = {
    getSegment: async (req, res) => {
        const { id } = req.params;
        const segment = await getSegmentById(id)
        if (!segment) {
            res.sendStatus(404);
        } else {
            res.json(segment);
        }
    },
    createSegment: async (req, res) => {
        const { content, storyId, userId } = req.body;
        if (!content || !storyId) {
            res.status(400)
            res.send("Missing params 'content' or 'storyId' in body")
        }
        else {
            const segmentId = await createSegment(content, storyId, userId)
            const resourceUrl = url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: `${req.originalUrl}/${segmentId}`
            });
            res.status(201)
            res.send(resourceUrl)
        }
    }
}