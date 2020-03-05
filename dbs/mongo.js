const mongoose = require('mongoose');
const Segment = require('../models/segment')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MondgoDB")
});

const handlers = {
  getSegmentById: async function(id) {
    try {
      const segmentId = mongoose.Types.ObjectId(id)
      const segment = await Segment.findById(segmentId)
      return segment;
    } catch (err){
      // any error in the segment ID pattern considered not-found
      console.log(err)
      return null
    }
  },
  getSegmentsByStoryId: async function(storyId) {
    const segments = await Segment.find({ storyId })
    return segments;
  },
  createSegment: async function (content, storyId, userId) {
    const doc = new Segment({content, storyId, userId})
    const segment = await doc.save();
    const { id } = segment;
    return id;
  },
  deleteUserSegments: async function(userId) {
    await Segment.deleteMany({ userId })
  }
}

module.exports = { db, handlers }