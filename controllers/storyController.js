const url = require('url');
const { getStoryById, createStory } = require('../dbs/postgres').handlers
const { getSegmentsByStoryId } = require('../dbs/mongo').handlers

module.exports = {
    getStory: async (req, res) => {
        const { id } = req.params;
        const { format } = req.query
        const story = await getStoryById(parseInt(id));
        if (story) {
            const segments = await getSegmentsByStoryId(id);
            const fullstory = {
                name: story.name,
                createdAt: story.createdAt,
                segments
            }
            format == "html" ? res.render('story', fullstory) : res.json(fullstory)
        } else {
            res.sendStatus(404)
        }
    },
    creatStory: async (req, res) => {
        const { name } = req.body
        if (name) {
            storyId = await createStory(name)
            const resourceUrl = url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: `${req.originalUrl}/${storyId}`
            });
            res.status(201)
            res.send(resourceUrl)
        } else {
            res.status(400);
            res.send("Missing 'name' in body");
        }
    }
}

