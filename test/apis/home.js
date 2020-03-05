const chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../../app')

chai.use(chaiHttp);
chai.should();

describe("index", () => {
    describe("GET /", () => {
        it("should return 200", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                })
                done();
            })
    })
})