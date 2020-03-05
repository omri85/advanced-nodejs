const router = require('express').Router();
const url = require('url')

const { getSegmentById, createSegment } = require('../../dbs/mongo').handlers;
const segmentController = require('../../controllers/segmentController')

router.get('/:id', segmentController.getSegment)

router.post('/', segmentController.createSegment)

module.exports = router