const supertest = require('supertest');

module.exports = {
  async request(opts, profileId) {
    const test = supertest(opts.app)[opts.method](opts.url)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('profile_id', profileId)
    
    if (opts.query) {
      test.query(opts.query);
    }
    if (opts.body) {
      test.send(opts.body);
    }
    return test;
  }
};