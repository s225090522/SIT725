const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {

  it('should return 200 for GET /api/projects', (done) => {
    request(app)
      .get('/api/projects')
      .expect(200)
      .end(done);
  });

  it('should fail with 404 on unknown route', (done) => {
    request(app)
      .get('/api/unknown')
      .expect(404)
      .end(done);
  });

  it('should fail when POST data is incomplete', (done) => {
    request(app)
      .post('/api/submitForm')
      .send({ first_name: 'John' }) // missing fields
      .expect(500)
      .end(done);
  });

  it('should return 200 for root URL /', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });

});
