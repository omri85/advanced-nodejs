const chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../../app')

const BAD_WORDS = require('../../resources/bad-words')

chai.use(chaiHttp);
const expect = chai.should();

describe("Segment", function() {
    describe("POST /", function() {
        it("should return 400 because of a bad word", function() {
            const badWord = BAD_WORDS[0];
            const segment = {
                content: `Hello ${badWord}`,
                userId: 10,
                storyId: 10
            }
            chai.request(app)
                .post('/')
                .send(segment)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.text.should.contain("forbidden")
                    res.body.should.be.a('object')
                })
        })
    });
});