// test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('./server'); // Update path if your main app file has a different name

chai.use(chaiHttp);

describe('Project API Tests', () => {

  it('should GET all projects from /api/projects', (done) => {
    chai.request(app)
      .get('/api/projects')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.statusCode).to.equal(200);
        done();
      });
  });

});

