const mongoose = require('mongoose')

const segmentSchema = mongoose.Schema({
    storyId: Number,
    userId: Number,
    createdAt: { type: Date, default: Date.now },
    content: String
})

const Segment = mongoose.model('Segment', segmentSchema)

module.exports = Segment;